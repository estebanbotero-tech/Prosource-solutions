"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

export default function Hero() {
  const { lang, dict } = useI18n();
  const t = dict.hero;

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={styles.textContent}
        >
          <span className={styles.indicator}>{t.indicator}</span>
          <h1 className={styles.title}>
            {t.title}<br/>
            {t.titleEnd} <span className={styles.highlight}>{t.highlight}</span>
          </h1>
          <p className={styles.description}>
            {t.description}
          </p>
          <div className={styles.actions}>
            <Link href={`/${lang}#services`} className="btn btn-primary">
              {t.primary} <ArrowRight size={20} />
            </Link>
            <Link href={`/${lang}#about`} className="btn btn-outline">
              {t.secondary}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className={styles.blob}></div>
          <motion.div
            className={styles.dashboard}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <div className={styles.dashHeader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.dashBody}>
              <div className={styles.dashCard}>
                <div className={styles.dashCircle}></div>
                <div className={styles.dashLine}></div>
                <div className={styles.dashLine}></div>
              </div>
              <div className={styles.dashCard}>
                <div className={styles.dashCircle} style={{backgroundColor: 'rgba(0, 75, 135, 0.1)'}}></div>
                <div className={styles.dashLine}></div>
                <div className={styles.dashLine}></div>
              </div>
              <div className={styles.dashCard}>
                <div className={styles.dashLine} style={{width: '100%', marginBottom: '0.5rem'}}></div>
                <div className={styles.dashLine} style={{width: '80%', marginBottom: '0.5rem'}}></div>
                <div className={styles.dashLine} style={{width: '40%'}}></div>
              </div>
              <div className={styles.dashCard}>
                <div className={styles.dashLine} style={{width: '100%', marginBottom: '0.5rem'}}></div>
                <div className={styles.dashLine} style={{width: '90%', marginBottom: '0.5rem'}}></div>
                <div className={styles.dashLine} style={{width: '60%'}}></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
