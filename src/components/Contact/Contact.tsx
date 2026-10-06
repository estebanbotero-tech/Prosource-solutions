"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Contact.module.scss';
import { company, contactLimits, mapsUrl, mapEmbedUrl, mapQuery } from '@/data/company';
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
    // Move focus to the first field with an error so keyboard and screen reader users land on it
    const first = Object.keys(newErrors)[0];
    if (first) document.getElementById(first)?.focus();
    return !first;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    try {
      // Server relay (src/app/api/contact) validates again and forwards to the inbox
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang, consent, _honey: honey }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      setStatus('success');
      track('generate_lead', { form: 'contact' });
      setFormData(emptyForm);
      setConsent(false);
    } catch {
      setStatus('error');
    }
  };

  // Length cap + error wiring shared by every field
  const fieldProps = (k: keyof typeof contactLimits) => ({
    maxLength: contactLimits[k],
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

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

          {/* Direct channels as tap targets */}
          <div className={styles.channels}>
            <a
              href={company.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.channel} ${styles.channelWa}`}
              onClick={() => track('contact_whatsapp', { location: 'contact' })}
            >
              <MessageCircle size={22} aria-hidden="true" />
              <span className={styles.channelLabel}>WhatsApp</span>
              <span className={styles.channelValue}>{company.contact.phone}</span>
            </a>
            <a href={`mailto:${company.contact.email}`} className={styles.channel}>
              <Mail size={22} aria-hidden="true" />
              <span className={styles.channelLabel}>{t.email}</span>
              <span className={styles.channelValue}>{company.contact.email}</span>
            </a>
            <a href={`tel:${company.contact.phoneHref}`} className={styles.channel}>
              <Phone size={22} aria-hidden="true" />
              <span className={styles.channelLabel}>{t.phone}</span>
              <span className={styles.channelValue}>{company.contact.phone}</span>
            </a>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt><MapPin size={16} aria-hidden="true" /> {t.locations}</dt>
              {company.contact.addresses.map((address) => (
                <dd key={address}>
                  <a href={mapsUrl(address)} target="_blank" rel="noopener noreferrer">{address}</a>
                </dd>
              ))}
            </div>
            <div>
              <dt><Clock size={16} aria-hidden="true" /> {t.hours}</dt>
              <dd>{t.hoursValue}</dd>
            </div>
          </dl>

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

            <div className={styles.fieldRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">{t.name}</label>
                <input
                  type="text"
                  id="name"
                  {...fieldProps('name')}
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.namePh}
                />
                {errors.name && <span id="name-error" className={styles.errorMsg}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="company">{t.company}</label>
                <input
                  type="text"
                  id="company"
                  {...fieldProps('company')}
                  name="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t.companyPh}
                />
              </div>

            </div>

            <div className={styles.fieldRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">{t.email}</label>
                <input
                  type="email"
                  id="email"
                  {...fieldProps('email')}
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.emailPh}
                />
                {errors.email && <span id="email-error" className={styles.errorMsg}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">{t.phoneField}</label>
                <input
                  type="tel"
                  id="phone"
                  {...fieldProps('phone')}
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.phonePh}
                />
              </div>

            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">{t.message}</label>
              <textarea
                id="message"
                  {...fieldProps('message')}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.messagePh}
              />
              {errors.message && <span id="message-error" className={styles.errorMsg}>{errors.message}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.consent}>
                <input
                  type="checkbox"
                  id="consent"
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
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
              {errors.consent && <span id="consent-error" className={styles.errorMsg}>{errors.consent}</span>}
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
