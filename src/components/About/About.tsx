"use client";

import { motion } from 'framer-motion';
import styles from './About.module.scss';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

export default function About() {
  const { dict } = useI18n();
  const t = dict.about;

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.textContent}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.description}>{t.p1}</p>
          <p className={styles.description}>{t.p2}</p>
        </motion.div>

        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {company.stats.map((value, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              whileHover={{ y: -5 }}
            >
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{t.stats[index]}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
