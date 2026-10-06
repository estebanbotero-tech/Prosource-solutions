import { company } from '@/data/company';
import { LOGO_PNG_BASE64, LOGO_SIZE } from './logo';

// Branded HTML emails for the contact form. Table layout + inline styles: the only thing
// Gmail/Outlook render reliably. The logo travels inside the email (cid attachment), so it shows
// without depending on a public domain.

// Pass along with every email that uses frame()
export const logoAttachment = { filename: 'prosource-logo.png', content: LOGO_PNG_BASE64, content_id: 'prosource-logo', content_type: 'image/png' };

export type Lead = { name: string; company: string; email: string; phone: string; message: string; lang: 'es' | 'en' };

const NAVY = '#002d5a', BLUE = '#064b87', LIME = '#b5d31d', INK = '#1e293b', MUTED = '#64748b', LINE = '#e2e8f0', BG = '#f1f5f9';
const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// Every user-typed value goes through this before touching the HTML
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const multiline = (s: string) => esc(s).replace(/\r?\n/g, '<br>');

// "camila pérez" -> "Camila Pérez" (keeps the rest of each word as typed, e.g. "McKay")
const titleCase = (s: string) => s.replace(/(^|\s)(\p{Ll})/gu, (_, sp, c) => sp + c.toUpperCase());

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('');

// Colombian mobiles typed without country code (3xx xxx xxxx) get +57 for the WhatsApp link
const waNumber = (phone: string) => {
  const d = phone.replace(/\D/g, '');
  return d.length === 10 && d.startsWith('3') ? `57${d}` : d;
};

const button = (href: string, label: string, bg: string, color = '#ffffff') =>
  `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:${color};font-family:${FONT};font-size:14px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:999px;margin:0 6px 10px 0">${label}</a>`;

const social = [['LinkedIn', company.social.linkedin], ['Instagram', company.social.instagram], ['Facebook', company.social.facebook]]
  .filter(([, url]) => url)
  .map(([label, url]) => `<a href="${esc(url)}" style="color:${BLUE};text-decoration:none;font-weight:600">${label}</a>`)
  .join(' &nbsp;·&nbsp; ');

// Shared frame: navy header with logo + wordmark, white card, legal footer
const frame = (preheader: string, tag: string, body: string, footerNote: string) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"></head>
<body style="margin:0;padding:0;background:${BG}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG}"><tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
    <tr><td style="background:${NAVY};border-radius:16px 16px 0 0;padding:26px 32px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-family:${FONT};font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;white-space:nowrap">
          <img src="cid:prosource-logo" width="${LOGO_SIZE.width}" height="${LOGO_SIZE.height}" alt="" style="display:inline-block;vertical-align:middle;border:0;margin-right:10px">
          <span style="vertical-align:middle">Prosource <span style="color:${LIME}">Solutions</span></span>
        </td>
        <td align="right"><span style="display:inline-block;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${NAVY};background:${LIME};padding:6px 12px;border-radius:999px">${tag}</span></td>
      </tr></table>
    </td></tr>
    <tr><td style="height:4px;background:${LIME};line-height:4px;font-size:0">&nbsp;</td></tr>
    <tr><td style="background:#ffffff;padding:36px 32px 28px;border-radius:0 0 16px 16px">${body}</td></tr>
    <tr><td style="padding:24px 16px;font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED};text-align:center">
      <strong style="color:${INK}">${esc(company.legalName)}</strong> · NIT ${esc(company.nit)}<br>
      ${esc(company.contact.phone)} · <a href="mailto:${esc(company.contact.email)}" style="color:${BLUE};text-decoration:none">${esc(company.contact.email)}</a><br>
      ${social}<br>
      <span style="color:#94a3b8">${footerNote}</span>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;

const row = (label: string, value: string) => `<tr>
  <td style="padding:12px 0;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:13px;color:${MUTED};width:120px;vertical-align:top">${label}</td>
  <td style="padding:12px 0;border-bottom:1px solid ${LINE};font-family:${FONT};font-size:14px;color:${INK};font-weight:600">${value}</td>
</tr>`;

const messageBlock = (message: string) =>
  `<div style="background:#f8fafc;border-left:4px solid ${LIME};border-radius:8px;padding:18px 20px;font-family:${FONT};font-size:15px;line-height:1.65;color:${INK}">${multiline(message)}</div>`;

const bogotaDate = (d: Date, lang: 'es' | 'en') =>
  new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-US', { dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Bogota' }).format(d);

// Internal notification: what the sales team receives
export function leadEmail(input: Lead, at: Date) {
  const lead = { ...input, name: titleCase(input.name) };
  const link = (href: string, text: string) => `<a href="${esc(href)}" style="color:${BLUE};text-decoration:none">${esc(text)}</a>`;
  const replySubject = `Prosource Solutions · ${lead.lang === 'es' ? 'Tu solicitud comercial' : 'Your inquiry'}`;
  const wa = lead.phone && waNumber(lead.phone);

  const body = `
    <p style="margin:0 0 6px;font-family:${FONT};font-size:13px;color:${MUTED}">${esc(bogotaDate(at, 'es'))} (hora Colombia)</p>
    <h1 style="margin:0 0 14px;font-family:${FONT};font-size:26px;line-height:1.25;color:${NAVY};letter-spacing:-0.5px">Nueva solicitud comercial</h1>
    <p style="margin:0 0 28px"><span style="display:inline-block;font-family:${FONT};font-size:12px;font-weight:700;color:${NAVY};background:#f4f9dd;border:1px solid #dfeca0;padding:7px 12px;border-radius:8px">&#9201;&nbsp; Prometimos responder en menos de 2 horas hábiles</span></p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:24px"><tr>
      <td style="width:52px;height:52px;border-radius:50%;background:${NAVY};color:${LIME};font-family:${FONT};font-size:18px;font-weight:800;text-align:center;vertical-align:middle">${esc(initials(lead.name))}</td>
      <td style="padding-left:14px;font-family:${FONT}">
        <div style="font-size:18px;font-weight:700;color:${INK}">${esc(lead.name)}</div>
        <div style="font-size:14px;color:${MUTED}">${lead.company ? esc(lead.company) : 'Empresa no indicada'}</div>
      </td>
    </tr></table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
      ${row('Correo', link(`mailto:${lead.email}`, lead.email))}
      ${row('Teléfono', lead.phone ? link(`tel:${lead.phone.replace(/[^\d+]/g, '')}`, lead.phone) : '<span style="color:#94a3b8;font-weight:400">No indicado</span>')}
      ${row('Idioma', lead.lang === 'es' ? 'Español' : 'Inglés')}
    </table>

    <p style="margin:0 0 10px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${MUTED}">Requerimiento</p>
    ${messageBlock(lead.message)}

    <div style="margin-top:28px">
      ${button(`mailto:${lead.email}?subject=${encodeURIComponent(replySubject)}`, 'Responder al cliente', NAVY)}
      ${wa ? button(`https://wa.me/${wa}`, 'Escribir por WhatsApp', '#25d366') : ''}
    </div>

    <p style="margin:20px 0 0;padding-top:18px;border-top:1px solid ${LINE};font-family:${FONT};font-size:12px;line-height:1.6;color:${MUTED}">
      <span style="color:#16a34a;font-weight:700">&#10003;</span> El cliente autorizó el tratamiento de sus datos personales (Ley 1581 de 2012) el ${esc(bogotaDate(at, "es"))}, hora Colombia.
    </p>`;

  return {
    subject: `Nueva solicitud: ${lead.name}${lead.company ? ` · ${lead.company}` : ''}`,
    html: frame(`${lead.name} escribió: ${lead.message.slice(0, 90)}`, 'Nuevo lead', body, 'Generado automáticamente desde el formulario de contacto del sitio web.'),
  };
}

// Confirmation for the person who wrote in, in their language
export function confirmationEmail(input: Lead) {
  const lead = { ...input, name: titleCase(input.name) };
  const es = lead.lang === 'es';
  const first = lead.name.split(/\s+/)[0];
  const body = `
    <h1 style="margin:0 0 16px;font-family:${FONT};font-size:26px;line-height:1.25;color:${NAVY};letter-spacing:-0.5px">${es ? `Hola ${esc(first)}, recibimos tu solicitud` : `Hi ${esc(first)}, we got your request`}</h1>
    <p style="margin:0 0 24px;font-family:${FONT};font-size:15px;line-height:1.65;color:${INK}">${es
      ? 'Gracias por escribirnos. Un especialista senior revisará tu requerimiento y se comunicará contigo en <strong>menos de 2 horas hábiles</strong>.'
      : 'Thanks for reaching out. A senior specialist will review your request and get back to you within <strong>2 business hours</strong>.'}</p>
    <p style="margin:0 0 10px;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${MUTED}">${es ? 'Tu mensaje' : 'Your message'}</p>
    ${messageBlock(lead.message)}
    <p style="margin:28px 0 14px;font-family:${FONT};font-size:15px;line-height:1.65;color:${INK}">${es ? '¿Es urgente? Escríbenos y te atendemos de inmediato:' : 'Urgent? Message us and we’ll help right away:'}</p>
    ${button(company.social.whatsapp, es ? 'Hablar por WhatsApp' : 'Chat on WhatsApp', '#25d366')}`;

  return {
    subject: es ? 'Recibimos tu solicitud · Prosource Solutions' : 'We received your request · Prosource Solutions',
    html: frame(es ? 'Un especialista te contactará muy pronto.' : 'A specialist will contact you shortly.', es ? 'Solicitud recibida' : 'Request received', body,
      es ? 'Recibiste este correo porque enviaste el formulario de contacto de nuestro sitio web.' : 'You received this email because you submitted the contact form on our website.'),
  };
}
