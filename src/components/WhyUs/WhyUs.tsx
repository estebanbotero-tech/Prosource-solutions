"use client";

import { motion, Variants } from 'framer-motion';
import { Lightbulb, Shield, HeartHandshake, Award } from 'lucide-react';
import styles from './WhyUs.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

// Same order as whyUs.items in src/i18n/*.ts
const icons = [Lightbulb, Award, HeartHandshake, Shield];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function WhyUs() {
  const { dict } = useI18n();
  const t = dict.whyUs;

  return (
    <section id="why-us" className={`section ${styles.whyus}`}>
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {t.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.div key={feature.title} className={styles.feature} variants={itemVariants}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} />
                </div>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
