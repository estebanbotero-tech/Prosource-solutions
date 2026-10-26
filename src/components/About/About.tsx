"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './About.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

export default function About() {
  const { lang, dict } = useI18n();
  const t = dict.about;

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h2 className={styles.title}>{t.title}</h2>
            <Link href={`/${lang}#process`} className={styles.processLink}>
              {t.howWeWork} <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.text}>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
