"use client";

import { motion } from 'framer-motion';
import styles from './About.module.scss';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';
import CountUp from '@/components/motion/CountUp';

export default function About() {
  const { dict } = useI18n();
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
          <h2 className={styles.title}>{t.title}</h2>
          <div className={styles.text}>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>
        </motion.div>

        <dl className={styles.stats}>
          {company.stats.map((value, index) => (
            <div key={index} className={styles.stat}>
              <dt className={styles.statLabel}>{t.stats[index]}</dt>
              <dd><CountUp value={value} className={styles.statValue} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
