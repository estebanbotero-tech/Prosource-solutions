"use client";

import { motion } from 'framer-motion';
import { Award, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import styles from './CaseStudies.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';

export default function CaseStudies() {
  const { lang, dict } = useI18n();
  const t = dict.caseStudies;

  return (
    <section id="cases" className={`section ${styles.caseStudies}`}>
      <div className="container">
        <div className="text-center">
          <div className={styles.badgeWrapper}>
            <Award size={16} />
            <span>{t.badge}</span>
          </div>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {t.items.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.tag}>{item.tag}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>

              <div className={styles.problemSolution}>
                <div className={styles.block}>
                  <span className={styles.blockLabel}>
                    <span className={styles.dotRed}></span> Desafío / Reto
                  </span>
                  <p className={styles.blockText}>{item.problem}</p>
                </div>

                <div className={styles.block}>
                  <span className={styles.blockLabel}>
                    <CheckCircle2 size={14} className={styles.iconGreen} /> Solución Prosource
                  </span>
                  <p className={styles.blockText}>{item.solution}</p>
                </div>
              </div>

              {/* Metrics Highlights */}
              <div className={styles.metricsBox}>
                <div className={styles.metricsHeader}>
                  <TrendingUp size={14} />
                  <span>Impacto Medible</span>
                </div>
                <div className={styles.metricsGrid}>
                  {item.metrics.map((m) => (
                    <div key={m.label} className={styles.metricItem}>
                      <span className={styles.metricVal}>{m.val}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Link
                  href={`/${lang}#contact`}
                  className={styles.ctaLink}
                  onClick={() => prefillContact(`Hola Prosource Solutions, me interesa un caso similar a: ${item.title}`)}
                >
                  {lang === 'es' ? 'Quiero un resultado similar' : 'I want a similar outcome'}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
