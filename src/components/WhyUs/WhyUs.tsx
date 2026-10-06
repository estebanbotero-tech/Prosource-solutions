"use client";

import { motion } from 'framer-motion';
import { Lightbulb, Shield, HeartHandshake, Award } from 'lucide-react';
import styles from './WhyUs.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { onSpotlightMove } from '@/components/motion/spotlight';

// Same order as whyUs.items in src/i18n/*.ts
const icons = [Lightbulb, Award, HeartHandshake, Shield];

export default function WhyUs() {
  const { dict } = useI18n();
  const t = dict.whyUs;

  return (
    <section id="why-us" className={`section ${styles.whyus}`}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div className={styles.grid} onPointerMove={onSpotlightMove}>
          {t.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={feature.title}
                data-spotlight
                className={styles.feature}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.iconWrapper}><Icon size={22} /></span>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
