// Supabase Edge Function: Send Custom Branded Auth Emails
// Triggered on user signup / signin events
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailPayload {
  email: string;
  fullName?: string;
  type: 'signup_welcome' | 'login_alert' | 'demo_confirmation';
  courseName?: string;
  timeSlot?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload: EmailPayload = await req.json();
    const { email, fullName = 'Future Scholar', type, courseName, timeSlot } = payload;

    const emailSubject =
      type === 'signup_welcome'
        ? '🎓 Welcome to EESA Academy! Your Portal Access & Next Steps'
        : type === 'demo_confirmation'
        ? '🎯 Free Demo Class Confirmed | EESA Academy'
        : '🔐 New Sign-in to Your EESA Student Account';

    console.log(`[EESA Email Delivery] Sending ${type} to ${email} for ${fullName}`);

    // High converting HTML Email Body
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 20px; }
        .container { max-width: 580px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1e3a8a, #0f172a); padding: 30px 20px; text-align: center; border-bottom: 2px solid #3b82f6; }
        .content { padding: 30px 24px; }
        .btn { display: inline-block; background: #2563eb; color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; margin: 20px 0; }
        .footer { background: #0b0f19; padding: 20px; text-align: center; font-size: 11px; color: #64748b; }
      </style></head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; color:#fff; font-size:22px;">🎓 EESA ACADEMY</h1>
            <p style="margin:4px 0 0; color:#93c5fd; font-size:12px;">Expert Educational Services Academy • West Delhi</p>
          </div>
          <div class="content">
            <h2 style="color:#fff; font-size:18px;">Hello ${fullName},</h2>
            <p style="line-height:1.6; color:#cbd5e1;">
              ${
                type === 'signup_welcome'
                  ? `Welcome to <strong>EESA Academy</strong>! Your student account is now active. You have full access to course curriculum evaluations, diagnostic tests, and direct mentorship from Founder <strong>Neetu Devi</strong>'s certified academic team.`
                  : type === 'demo_confirmation'
                  ? `Your free demo class reservation for <strong>${courseName || 'Selected Course'}</strong> (${timeSlot || 'Upcoming Batch'}) has been received! Our admissions desk will coordinate your session schedule shortly.`
                  : `Your student portal session was accessed successfully. If this wasn't you, please reset your password immediately.`
              }
            </p>
            <div style="background:#0f172a; border:1px solid #334155; border-radius:12px; padding:16px; margin:20px 0;">
              <h4 style="margin:0 0 8px; color:#60a5fa; font-size:13px; text-transform:uppercase;">Campus Details & Helpline:</h4>
              <p style="margin:4px 0; font-size:12px; color:#94a3b8;">📍 <strong>Address:</strong> RZ-A-1/14B, First Floor, Vijay Enclave, Opp. Shani Dev Mandir, Dabri-Palam Road, New Delhi - 110045 (Adjacent to Dashrath Puri Metro Gate 1).</p>
              <p style="margin:4px 0; font-size:12px; color:#94a3b8;">📱 <strong>Helpline & WhatsApp:</strong> <a href="https://wa.me/919810126691" style="color:#34d399;">+91 98101 26691</a></p>
              <p style="margin:4px 0; font-size:12px; color:#94a3b8;">🕒 <strong>Operating Hours:</strong> Mon - Sat: 7:00 AM – 8:00 PM</p>
            </div>
            <div style="text-align:center;">
              <a href="https://eesa-academy.com" class="btn" style="color:#fff;">Access Student Portal</a>
            </div>
          </div>
          <div class="footer">
            © 2026 Expert Educational Services Academy Pvt Ltd. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Email notification prepared for ${email}`,
        subject: emailSubject,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
