"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import styles from './CaseStudies.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';
import CountUp from '@/components/motion/CountUp';

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

        {/* Real client case */}
        <motion.article
          className={styles.featured}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.featuredBody}>
            <div className={styles.featuredTop}>
              <span className={styles.featuredLabel}>{t.featured.label}</span>
              <span className={styles.clientBadge}>OK TAXI</span>
            </div>
            <p className={styles.client}>
              {t.featured.client} <span>· {t.featured.location}</span>
            </p>
            <h3 className={styles.featuredTitle}>{t.featured.title}</h3>
            <p className={styles.featuredText}>{t.featured.description}</p>
            <ul className={styles.tags}>
              {t.featured.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className={styles.featuredActions}>
              <Link
                href={`/${lang}#contact`}
                className={styles.similarBtn}
                onClick={() => prefillContact(`${t.similarPrefill} ${t.featured.client}`)}
              >
                {t.similar} <ArrowRight size={16} />
              </Link>
              <a href={t.featured.url} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                {t.featured.cta} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <dl className={styles.featuredMetrics}>
            {t.featured.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd><CountUp value={m.val} className={styles.featuredVal} /></dd>
              </div>
            ))}
          </dl>
        </motion.article>
      </div>
    </section>
  );
}
