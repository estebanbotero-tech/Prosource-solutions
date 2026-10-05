"use client";

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import styles from './CTA.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { company } from '@/data/company';

export default function CTA() {
  const { lang, dict } = useI18n();
  const t = dict.cta;
  const waUrl = `${company.social.whatsapp}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Prosource Solutions, deseo agendar una llamada de asesoría comercial para mi empresa.'
      : 'Hello Prosource Solutions, I would like to schedule a consultation call for my company.'
  )}`;

  return (
    <section className={`section ${styles.cta}`}>
      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {t.badge && (
            <div className={styles.badgePill}>
              <Sparkles size={16} />
              <span>{t.badge}</span>
            </div>
          )}

          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>

          <div className={styles.buttonGroup}>
            <Link href={`/${lang}#contact`} className="btn btn-primary">
              {t.button} <ArrowRight size={20} />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
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
