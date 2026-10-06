"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Contact.module.scss';
import { company, mapsUrl, mapEmbedUrl, mapQuery } from '@/data/company';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import { track } from '@/components/Analytics/Analytics';
import { useI18n } from '@/i18n/I18nProvider';

const PREFILL_EVENT = 'contact:prefill';

// Lets "Más información" buttons pre-fill the message with the chosen service.
export const prefillContact = (message: string) =>
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: message }));

const emptyForm = { name: '', company: '', email: '', phone: '', message: '' };

export default function Contact() {
  const { lang, dict } = useI18n();
  const t = dict.contact;

  const [formData, setFormData] = useState(emptyForm);
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState(''); // spam trap, real users never fill it
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      setFormData((f) => ({ ...f, message }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.errName;
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) newErrors.email = t.errEmail;
    if (!formData.message.trim()) newErrors.message = t.errMessage;
    if (!consent) newErrors.consent = t.errConsent;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    try {
      if (!honey) {
        const res = await fetch(`https://formsubmit.co/ajax/${company.formRecipient}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            Nombre: formData.name,
            Empresa: formData.company || '-',
            email: formData.email,
            Telefono: formData.phone || '-',
            Mensaje: formData.message,
            Idioma: lang,
            // Proof of authorization required by Ley 1581 de 2012
            'Autorizacion tratamiento de datos': `Sí - ${new Date().toISOString()}`,
            _subject: `${t.emailSubject}: ${formData.name}`,
            _template: 'table',
            _captcha: 'false',
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) !== 'true') throw new Error(data.message);
      }
      setStatus('success');
      track('generate_lead', { form: 'contact' });
      setFormData(emptyForm);
      setConsent(false);
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={`container ${styles.grid}`}>

        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t.infoTitle}</h2>

          <div className={styles.infoItem}>
            <Mail className={styles.icon} size={24} />
            <div className={styles.details}>
              <h4>{t.email}</h4>
              <p><a href={`mailto:${company.contact.email}`}>{company.contact.email}</a></p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <Phone className={styles.icon} size={24} />
            <div className={styles.details}>
              <h4>{t.phone}</h4>
              <p>
                <a href={`tel:${company.contact.phoneHref}`}>{company.contact.phone}</a>
                {' · '}
                <a
                  href={company.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('contact_whatsapp', { location: 'contact' })}
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <MapPin className={styles.icon} size={24} />
            <div className={styles.details}>
              <h4>{t.locations}</h4>
              {company.contact.addresses.map((address) => (
                <p key={address}>
                  <a href={mapsUrl(address)} target="_blank" rel="noopener noreferrer">{address}</a>
                </p>
              ))}
            </div>
          </div>

          <div className={styles.infoItem}>
            <Clock className={styles.icon} size={24} />
            <div className={styles.details}>
              <h4>{t.hours}</h4>
              <p>{t.hoursValue}</p>
            </div>
          </div>

          <div className={styles.follow}>
            <h4>{t.follow}</h4>
            <SocialLinks className={styles.social} />
          </div>

          {/* Mini map of the main office; loads only when scrolled near */}
          <div className={styles.map}>
            <iframe
              src={mapEmbedUrl(mapQuery)}
              title={t.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href={mapsUrl(company.contact.addresses[0])}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              <MapPin size={16} /> {t.directions}
            </a>
          </div>
        </motion.div>

        <motion.div
          className={styles.formCard}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className={styles.title}>{t.formTitle}</h3>
          {t.formSubtitle && <p className={styles.formSubtitle}>{t.formSubtitle}</p>}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="_honey"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: 'none' }}
            />

            <div className={styles.formGroup}>
              <label htmlFor="name">{t.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.namePh}
              />
              {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="company">{t.company}</label>
              <input
                type="text"
                id="company"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                placeholder={t.companyPh}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">{t.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.emailPh}
              />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">{t.phoneField}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phonePh}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">{t.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.messagePh}
              />
              {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors({ ...errors, consent: '' });
                  }}
                />
                <span>
                  {t.consentPre}{' '}
                  <Link href={`/${lang}/privacy`} target="_blank">{t.consentLink}</Link>.
                </span>
              </label>
              {errors.consent && <span className={styles.errorMsg}>{errors.consent}</span>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? t.sending : (
                <>{t.send} <Send size={18} /></>
              )}
            </button>

            {status === 'success' && (
              <div className={styles.submitSuccess} role="status">{t.success}</div>
            )}
            {status === 'error' && (
              <div className={styles.submitError} role="alert">{t.error}</div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
