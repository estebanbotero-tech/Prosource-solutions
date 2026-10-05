"use client";

import { motion, Variants } from 'framer-motion';
import styles from './Process.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Process() {
  const { dict } = useI18n();
  const t = dict.process;

  return (
    <section id="process" className={`section ${styles.process}`}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <motion.div
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t.steps.map((step, i) => (
            <motion.div key={step.title} className={styles.step} variants={itemVariants}>
              <div className={styles.numberWrapper}>{String(i + 1).padStart(2, '0')}</div>
              <div className={styles.content}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.description}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
