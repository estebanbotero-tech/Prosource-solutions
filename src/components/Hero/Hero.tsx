"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, TrendingUp, MessageCircle, Activity, CheckCircle2, Zap, Star } from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.scss';
import { useI18n } from '@/i18n/I18nProvider';
import { company } from '@/data/company';

export default function Hero() {
  const { lang, dict } = useI18n();
  const t = dict.hero;
  const waUrl = `${company.social.whatsapp}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Prosource Solutions, deseo cotizar servicios operativos y tecnológicos para mi empresa.'
      : 'Hello Prosource Solutions, I would like to get a quote for operations and tech services.'
  )}`;

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>
        {/* No opacity entrance: headline + CTA must paint with the server HTML */}
        <div className={styles.textContent}>
          <div className={styles.indicatorBadge}>
            <span className={styles.livePulse}></span>
            <span>{t.indicator}</span>
          </div>

          <h1 className={styles.title}>
            {t.title} {t.titleEnd} <span className={styles.highlight}>{t.highlight}</span>
          </h1>

          <p className={styles.description}>
            {t.description}
          </p>

          <div className={styles.actions}>
            <Link href={`/${lang}#contact`} className="btn btn-primary">
              {t.primary} <ArrowRight size={18} />
            </Link>
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              <MessageCircle size={18} />
              {t.secondary}
            </a>
          </div>
          <p className={styles.reassurance}>{t.reassurance}</p>

          {/* Trust Value Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <ShieldCheck className={styles.trustIcon} size={18} />
              <span>{t.badge1}</span>
            </div>
            <div className={styles.trustItem}>
              <Clock className={styles.trustIcon} size={18} />
              <span>{t.badge2}</span>
            </div>
            <div className={styles.trustItem}>
              <TrendingUp className={styles.trustIcon} size={18} />
              <span>{t.badge3}</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Command Center */}
        <motion.div
          className={styles.visual}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className={styles.blob}></div>

          {/* Floating Pill Top Right */}
          <div className={`${styles.floatingPill} ${styles.pillTop}`}>
            <CheckCircle2 size={16} className={styles.pillIconGreen} />
            <span>{t.liveDashboard.pill1}</span>
          </div>

          {/* Floating Pill Bottom Left */}
          <div className={`${styles.floatingPill} ${styles.pillBottom}`}>
            <Zap size={16} className={styles.pillIconYellow} />
            <span>{t.liveDashboard.pill3}</span>
          </div>

          <div className={styles.dashboard}>
            <div className={styles.dashHeader}>
              <div className={styles.windowDots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
              <div className={styles.dashStatus}>
                <span className={styles.pulseDot}></span>
                <span>{t.liveDashboard.activeAgents}</span>
              </div>
              <span className={styles.uptimeBadge}>{t.liveDashboard.uptime}</span>
            </div>

            <div className={styles.dashBody}>
              <div className={styles.kpiCard}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>{t.liveDashboard.efficiencyLabel}</span>
                  <Activity size={16} className={styles.kpiIcon} />
                </div>
                <div className={styles.kpiValRow}>
                  <span className={styles.kpiValue}>{t.liveDashboard.efficiency}</span>
                  <span className={styles.kpiTrend}><TrendingUp size={12} /> {t.liveDashboard.roi}</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className={styles.kpiCard}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>{t.liveDashboard.resolutionLabel}</span>
                  <Clock size={16} className={styles.kpiIcon} />
                </div>
                <div className={styles.kpiValRow}>
                  <span className={styles.kpiValue}>{t.liveDashboard.resolution}</span>
                  <span className={styles.kpiTrend}><Zap size={12} /> {t.liveDashboard.record}</span>
                </div>
                <div className={styles.miniChart}>
                  <svg viewBox="0 0 100 24" className={styles.sparkline}>
                    <path
                      d="M0,20 Q20,12 40,16 T70,6 T100,2"
                      fill="none"
                      stroke="#b5d31d"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>

              <div className={`${styles.kpiCard} ${styles.kpiFull}`}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>{t.liveDashboard.csatLabel}</span>
                  <span className={styles.kpiScoreBadge}>{t.liveDashboard.topTier}</span>
                </div>
                <div className={styles.csatRow}>
                  <span className={styles.kpiValueLarge}>{t.liveDashboard.csat}</span>
                  <div className={styles.stars}>
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <span className={styles.csatSub}>{t.liveDashboard.csatSub}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
