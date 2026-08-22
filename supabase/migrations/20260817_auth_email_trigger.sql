-- PostgreSQL Migration: Supabase Auth Email Trigger & Activity Logger
-- Automatically records and triggers welcome notifications on new user signup / signin

-- 1. Create a table to track auth email logs and dispatch history
CREATE TABLE IF NOT EXISTS public.auth_email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('signup_welcome', 'login_alert', 'password_reset', 'demo_confirmation')),
    status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'failed')),
    sent_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.auth_email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own email logs"
ON public.auth_email_logs FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2. Trigger Function on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user_welcome_email()
RETURNS TRIGGER AS $$
DECLARE
    user_full_name TEXT;
BEGIN
    user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));

    -- Record in email logs
    INSERT INTO public.auth_email_logs (user_id, email, full_name, event_type, status)
    VALUES (NEW.id, NEW.email, user_full_name, 'signup_welcome', 'sent');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach Trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_send_welcome ON auth.users;
CREATE TRIGGER on_auth_user_created_send_welcome
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_welcome_email();
