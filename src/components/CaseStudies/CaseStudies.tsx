"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './CaseStudies.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';
import CountUp from '@/components/motion/CountUp';
import { onSpotlightMove } from '@/components/motion/spotlight';

export default function CaseStudies() {
  const { lang, dict } = useI18n();
  const t = dict.caseStudies;

  return (
    <section id="cases" className={`section section-dark ${styles.caseStudies}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div className={styles.grid} onPointerMove={onSpotlightMove}>
          {t.items.map((item, index) => (
            <motion.article
              key={item.title}
              data-spotlight
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.tag}>{item.tag}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>

              {/* Outcome first: the number is what a buyer scans for */}
              <div className={styles.metrics} aria-label={t.impact}>
                {item.metrics.map((m) => (
                  <div key={m.label} className={styles.metric}>
                    <CountUp value={m.val} className={styles.metricVal} />
                    <span className={styles.metricLabel}>{m.label}</span>
                  </div>
                ))}
              </div>

              <dl className={styles.story}>
                <div>
                  <dt>{t.challenge}</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>{t.solution}</dt>
                  <dd>{item.solution}</dd>
                </div>
              </dl>

              <Link
                href={`/${lang}#contact`}
                className={styles.ctaLink}
                onClick={() => prefillContact(`${t.similarPrefill} ${item.title}`)}
              >
                {t.similar}
                <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
