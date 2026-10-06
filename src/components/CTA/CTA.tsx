"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './CTA.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { company } from '@/data/company';
import { track } from '@/components/Analytics/Analytics';

export default function CTA() {
  const { lang, dict } = useI18n();
  const t = dict.cta;
  const waUrl = `${company.social.whatsapp}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Prosource Solutions, deseo agendar una llamada de asesoría comercial para mi empresa.'
      : "Hi Prosource Solutions, I'd like to schedule a consultation call for my company."
  )}`;

  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>

          <div className={styles.buttonGroup}>
            <Link href={`/${lang}#contact`} className={styles.primaryBtn}>
              {t.button} <ArrowRight size={20} />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
              onClick={() => track('contact_whatsapp', { location: 'cta' })}
            >
              <MessageCircle size={20} />
              <span>{t.whatsappBtn}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
