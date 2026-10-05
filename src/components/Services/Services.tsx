"use client";

import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './Services.module.scss';
import { serviceIcons } from '@/data/services';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
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

export default function Services() {
  const { lang, dict } = useI18n();
  const t = dict.services;

  return (
    <section id="services" className={`section ${styles.services}`}>
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
          {t.items.map((service, i) => {
            const Icon = serviceIcons[i];
            return (
              <motion.div key={service.title} className={styles.card} variants={itemVariants}>
                <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.iconWrapper}>
                  <Icon size={28} />
                </div>
                {service.badge && (
                  <span className={styles.badgePill}>{service.badge}</span>
                )}
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <Link
                  href={`/${lang}#contact`}
                  className={styles.cardLink}
                  onClick={() => prefillContact(`${t.prefill} ${service.title}.`)}
                >
                  {t.more} <ArrowRight className={styles.arrow} size={16} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
