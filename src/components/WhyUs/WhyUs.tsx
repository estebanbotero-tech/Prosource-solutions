"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lightbulb, Shield, HeartHandshake, Award, ArrowRight } from 'lucide-react';
import styles from './WhyUs.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

// Same order as whyUs.items in src/i18n/*.ts
const icons = [Lightbulb, Award, HeartHandshake, Shield];

export default function WhyUs() {
  const { lang, dict } = useI18n();
  const t = dict.whyUs;

  return (
    <section id="why-us" className={`section ${styles.whyus}`}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
          <Link href={`/${lang}#contact`} className={styles.cta}>
            {dict.nav.cta} <ArrowRight size={18} />
          </Link>
        </div>

        {/* Editorial rows instead of a card grid: reads as a list of commitments */}
        <ol className={styles.list}>
          {t.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.li
                key={feature.title}
                className={styles.row}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.iconWrapper} aria-hidden="true"><Icon size={22} /></span>
                <div>
                  <h3 className={styles.title}>{feature.title}</h3>
                  <p className={styles.description}>{feature.description}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
