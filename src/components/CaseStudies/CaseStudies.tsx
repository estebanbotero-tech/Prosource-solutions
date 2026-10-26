"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Building2, Car, Laptop, Radio, Smartphone } from 'lucide-react';
import Link from 'next/link';
import styles from './CaseStudies.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { prefillContact } from '@/components/Contact/Contact';
import CountUp from '@/components/motion/CountUp';

type CategoryKey = 'companies' | 'software';
type SoftwareTabKey = 'driver' | 'radio' | 'passenger';

export default function CaseStudies() {
  const { lang, dict } = useI18n();
  const t = dict.caseStudies;

  const [category, setCategory] = useState<CategoryKey>('companies');
  const [softwareTab, setSoftwareTab] = useState<SoftwareTabKey>('driver');

  const currentCase = category === 'companies'
    ? t.featured
    : softwareTab === 'driver'
      ? t.driver
      : softwareTab === 'radio'
        ? t.radio
        : t.passenger;

  const isTaxiYellow = category === 'companies' || (category === 'software' && softwareTab === 'driver');
  const cardKey = category === 'companies' ? 'companies' : `software-${softwareTab}`;

  return (
    <section id="cases" className={`section section-dark ${styles.caseStudies}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        {/* Switchers (Level 1: Categories, Level 2: Software Apps) */}
        <div className={styles.switchersWrapper}>
          <div className={styles.categoryTabs} role="tablist" aria-label={t.title}>
            <button
              type="button"
              role="tab"
              aria-selected={category === 'companies'}
              className={`${styles.categoryBtn} ${category === 'companies' ? styles.activeCategory : ''}`}
              onClick={() => setCategory('companies')}
            >
              <Building2 size={17} aria-hidden="true" />
              <span>{t.categories.companies}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={category === 'software'}
              className={`${styles.categoryBtn} ${category === 'software' ? styles.activeCategory : ''}`}
              onClick={() => setCategory('software')}
            >
              <Laptop size={17} aria-hidden="true" />
              <span>{t.categories.software}</span>
            </button>
          </div>

          <AnimatePresence>
            {category === 'software' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className={styles.subTabs}
                role="tablist"
                aria-label={t.categories.software}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={softwareTab === 'driver'}
                  className={`${styles.subTabBtn} ${softwareTab === 'driver' ? styles.activeSubTab : ''}`}
                  onClick={() => setSoftwareTab('driver')}
                >
                  <Car size={15} aria-hidden="true" />
                  <span>{t.softwareTabs.driver}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={softwareTab === 'radio'}
                  className={`${styles.subTabBtn} ${softwareTab === 'radio' ? styles.activeSubTab : ''}`}
                  onClick={() => setSoftwareTab('radio')}
                >
                  <Radio size={15} aria-hidden="true" />
                  <span>{t.softwareTabs.radio}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={softwareTab === 'passenger'}
                  className={`${styles.subTabBtn} ${softwareTab === 'passenger' ? styles.activeSubTab : ''}`}
                  onClick={() => setSoftwareTab('passenger')}
                >
                  <Smartphone size={15} aria-hidden="true" />
                  <span>{t.softwareTabs.passenger}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Featured Card */}
        <AnimatePresence mode="wait">
          <motion.article
            key={cardKey}
            className={styles.featured}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.featuredBody}>
              <div className={styles.featuredTop}>
                <span className={styles.featuredLabel}>{currentCase.label}</span>
                <span className={`${styles.clientBadge} ${!isTaxiYellow ? styles.softwareBadge : ''}`}>
                  {currentCase.badge}
                </span>
              </div>
              <p className={styles.client}>
                {currentCase.client} <span>· {currentCase.location}</span>
              </p>
              <h3 className={styles.featuredTitle}>{currentCase.title}</h3>
              <p className={styles.featuredText}>{currentCase.description}</p>
              <ul className={styles.tags}>
                {currentCase.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <div className={styles.featuredActions}>
                <Link
                  href={`/${lang}#contact`}
                  className={styles.similarBtn}
                  onClick={() => prefillContact(`${t.similarPrefill} ${currentCase.client}`)}
                >
                  {category === 'companies' ? t.similar : currentCase.cta} <ArrowRight size={16} />
                </Link>
                {category === 'companies' ? (
                  <a href={currentCase.url} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                    {currentCase.cta} <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <Link
                    href={`/${lang}#contact`}
                    className={styles.ctaLink}
                    onClick={() => prefillContact(`${t.similarPrefill} ${currentCase.client}`)}
                  >
                    {t.similar} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>

            <dl className={styles.featuredMetrics}>
              {currentCase.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd><CountUp value={m.val} className={styles.featuredVal} /></dd>
                </div>
              ))}
            </dl>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
