"use client";

import { useEffect, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, TrendingUp, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.scss';
import Globe from './Globe';
import { useI18n } from '@/i18n/I18nProvider';
import { company } from '@/data/company';

// Pulls its child slightly toward the cursor; springs back on leave
function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  return (
    <motion.span
      className={styles.magnetic}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

// Real clocks: the visitor's time next to the team's time in Colombia.
// Empty until mounted so server and client HTML match.
function useClock(timeZone?: string) {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', timeZone });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export default function Hero() {
  const { lang, dict } = useI18n();
  const t = dict.hero;
  const yourTime = useClock();
  const teamTime = useClock('America/Bogota');
  const waUrl = `${company.social.whatsapp}?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola Prosource Solutions, deseo cotizar servicios operativos y tecnológicos para mi empresa.'
      : 'Hello Prosource Solutions, I would like to get a quote for operations and tech services.'
  )}`;

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.content}`}>
        {/* Text renders with the server HTML; the line reveal is pure CSS */}
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            <span className={styles.line}><span>{t.title}</span></span>
            <span className={styles.line}><span>{t.titleEnd}</span></span>
            <span className={styles.line}><span className={styles.highlight}>{t.highlight}</span></span>
          </h1>

          <p className={styles.description}>{t.description}</p>

          <div className={styles.actions}>
            <Magnetic>
              <Link href={`/${lang}#contact`} className={`btn btn-primary ${styles.primaryCta}`}>
                {t.primary} <ArrowRight size={18} />
              </Link>
            </Magnetic>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.btnWhatsapp}>
              <MessageCircle size={18} />
              {t.secondary}
            </a>
          </div>
          <p className={styles.reassurance}>{t.reassurance}</p>

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

        <div className={styles.visual}>
          <div className={styles.globeWrap} aria-hidden="true">
            <Globe />
          </div>

          <div className={styles.clockCard} aria-live="off">
            <div className={styles.clock}>
              <span className={styles.clockLabel}>{t.clocks.you}</span>
              <span className={styles.clockTime}>{yourTime || '--:--'}</span>
            </div>
            <span className={styles.clockDivider} aria-hidden="true" />
            <div className={styles.clock}>
              <span className={styles.clockLabel}>{t.clocks.team}</span>
              <span className={styles.clockTime}>{teamTime || '--:--'}</span>
            </div>
            <span className={styles.liveTag}>
              <span className={styles.liveDot} aria-hidden="true" />
              {t.clocks.live}
            </span>
          </div>
          <p className={styles.globeHint}>{t.globeHint}</p>
        </div>
      </div>
    </section>
  );
}
