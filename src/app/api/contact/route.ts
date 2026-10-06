import { contactLimits as LIMITS } from '@/data/company';
import { leadEmail, confirmationEmail, logoAttachment, type Lead } from './email';

// Contact form: validates on the server and sends branded emails through Resend (resend.com).
// Config lives only in env (.env.local in dev, the hosting in production):
//   RESEND_API_KEY  API key from resend.com
//   CONTACT_EMAIL   inbox that receives the leads
//   CONTACT_FROM    sender on your verified domain, e.g. "Prosource Solutions <web@yourdomain.com>".
//                   Until it's set, Resend's test sender is used and the client confirmation is skipped
//                   (the test sender can only deliver to the Resend account's own email).
const { RESEND_API_KEY, CONTACT_EMAIL, CONTACT_FROM } = process.env;
const FROM = CONTACT_FROM || 'Prosource Solutions <onboarding@resend.dev>';

// ponytail: in-memory per-instance rate limit; move to KV/Upstash if the host runs many instances
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

const rateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
};

// Trimmed string; single-line fields also lose line breaks (they end up in the email subject)
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const line = (v: unknown) => str(v).replace(/\s+/g, ' ');

const send = (email: { to: string; subject: string; html: string; replyTo?: string }) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM, to: [email.to], subject: email.subject, html: email.html, reply_to: email.replyTo,
      attachments: [logoAttachment],
    }),
  });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return Response.json({ ok: false }, { status: 400 });

  // Honeypot filled = bot: answer success so it doesn't retry
  if (str(body._honey)) return Response.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) return Response.json({ ok: false }, { status: 429 });

  const lead: Lead = {
    name: line(body.name),
    company: line(body.company),
    email: line(body.email),
    phone: line(body.phone),
    message: str(body.message),
    lang: body.lang === 'en' ? 'en' : 'es',
  };
  const tooLong = (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).some((k) => lead[k].length > LIMITS[k]);
  if (!lead.name || !lead.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || body.consent !== true || tooLong) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_EMAIL (.env.local or hosting env)');
    return Response.json({ ok: false }, { status: 500 });
  }

  // Reply-To = the client, so "Reply" in the inbox answers them directly
  const res = await send({ to: CONTACT_EMAIL, replyTo: lead.email, ...leadEmail(lead, new Date()) }).catch(() => null);
  if (!res?.ok) {
    console.error('[contact] Resend rejected the lead email:', res?.status ?? 'network error', await res?.text().catch(() => ''));
    return Response.json({ ok: false }, { status: 502 });
  }

  // Client confirmation only with a verified sender; a failure here doesn't fail the lead (already delivered)
  if (CONTACT_FROM) {
    const c = await send({ to: lead.email, replyTo: CONTACT_EMAIL, ...confirmationEmail(lead) }).catch(() => null);
    if (!c?.ok) console.error('[contact] Confirmation email failed:', c?.status ?? 'network error', await c?.text().catch(() => ''));
  }

  return Response.json({ ok: true });
}
