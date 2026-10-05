"use client";

import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './Solutions.module.scss';
import { solutionVisuals } from '@/data/solutions';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Solutions() {
  const { lang, dict } = useI18n();
  const t = dict.solutions;

  return (
    <section id="solutions" className={`section ${styles.solutions}`}>
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
          {t.items.map((solution, i) => {
            const { icon: Icon, image } = solutionVisuals[i];
            return (
              <motion.div key={solution.title} className={styles.card} variants={itemVariants}>
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={solution.title} loading="lazy" />
                </div>
                <div className={styles.content}>
                  <div className={styles.iconWrapper}>
                    <Icon size={24} />
                  </div>
                  <h3 className={styles.cardTitle}>{solution.title}</h3>
                  <p className={styles.cardDesc}>{solution.description}</p>
                  <Link
                    href={`/${lang}#contact`}
                    className={styles.cardLink}
                    onClick={() => prefillContact(`${dict.services.prefill} ${solution.title}.`)}
                  >
                    {t.more} <ArrowRight className={styles.arrow} size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
