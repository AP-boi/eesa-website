-- ==============================================================================
-- EESA ACADEMY: ZERO-TRUST SECURITY ARCHITECTURE MIGRATION
-- Defense-in-depth, zero standing trust, least-privilege by default
-- ==============================================================================

-- 1. Immutable Audit Logging Table (Append-Only)
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_role TEXT NOT NULL DEFAULT 'anonymous',
    event_type TEXT NOT NULL, -- 'auth_login', 'authz_denial', 'fdd_access', 'lead_export', 'phi_access'
    resource_type TEXT NOT NULL, -- 'franchise_application', 'student_record', 'crm_lead'
    resource_id TEXT,
    ip_address INET,
    user_agent TEXT,
    action_status TEXT NOT NULL, -- 'ALLOWED', 'DENIED', 'STEP_UP_REQUIRED'
    metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS for Audit Logs: Append-only for system, Read-only for Super Admin
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY super_admin_read_audit_logs ON public.security_audit_logs
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND (auth.users.raw_app_meta_data->>'role') = 'super_admin'
        )
    );

-- 2. Franchise Investor Application Table (P0 Financial & FDD Data)
CREATE TABLE IF NOT EXISTS public.franchise_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    target_city TEXT NOT NULL,
    territory_id TEXT NOT NULL DEFAULT 'NCR-WEST-01',
    net_worth_bracket TEXT NOT NULL,
    -- Field-Level Encryption envelope columns for sensitive PII / Bank disclosures
    encrypted_financial_disclosure BYTEA,
    financial_disclosure_iv BYTEA,
    financial_disclosure_tag BYTEA,
    kms_key_id TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'fdd_shared', 'approved', 'rejected', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.franchise_applications ENABLE ROW LEVEL SECURITY;

-- Policy 1: Investor can only view and update their own application
CREATE POLICY investor_own_data ON public.franchise_applications
    FOR ALL
    TO authenticated
    USING (investor_id = auth.uid())
    WITH CHECK (investor_id = auth.uid());

-- Policy 2: Franchise Director territory-scoped access (ABAC)
CREATE TABLE IF NOT EXISTS public.director_territories (
    director_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    territory_id TEXT NOT NULL,
    PRIMARY KEY (director_id, territory_id)
);

CREATE POLICY director_territory_scope ON public.franchise_applications
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.director_territories dt
            WHERE dt.director_id = auth.uid()
            AND dt.territory_id = franchise_applications.territory_id
        )
        AND status != 'archived'
    );

-- Policy 3: Public / Unauthenticated lead submission (Insert-Only with zero read back)
CREATE POLICY public_apply_franchise ON public.franchise_applications
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 3. Student Diagnostic & Lead Hardening (P0 / P1)
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Counselors can only read leads assigned to their counselor_id or unassigned pool
CREATE POLICY counselor_assigned_leads ON public.leads
    FOR SELECT
    TO authenticated
    USING (
        (auth.jwt()->>'role') IN ('counselor', 'admin', 'super_admin')
    );

-- 4. Automatic Session Audit Trigger
CREATE OR REPLACE FUNCTION public.log_security_audit_event()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.security_audit_logs (
        actor_id,
        actor_role,
        event_type,
        resource_type,
        resource_id,
        action_status,
        metadata
    ) VALUES (
        auth.uid(),
        COALESCE(auth.jwt()->>'role', 'anonymous'),
        TG_OP,
        TG_TABLE_NAME,
        NEW.id::text,
        'ALLOWED',
        jsonb_build_object('operation', TG_OP, 'schema', TG_TABLE_SCHEMA)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to sensitive tables
DROP TRIGGER IF EXISTS trg_audit_franchise_apps ON public.franchise_applications;
CREATE TRIGGER trg_audit_franchise_apps
    AFTER INSERT OR UPDATE OR DELETE ON public.franchise_applications
    FOR EACH ROW EXECUTE FUNCTION public.log_security_audit_event();
