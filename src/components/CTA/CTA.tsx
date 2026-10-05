"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './CTA.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

export default function CTA() {
  const { lang, dict } = useI18n();
  const t = dict.cta;

  return (
    <section className={`section ${styles.cta}`}>
      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
          <Link href={`/${lang}#contact`} className="btn btn-primary">
            {t.button} <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
