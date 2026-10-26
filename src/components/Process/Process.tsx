"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import styles from './Process.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

export default function Process() {
  const { dict } = useI18n();
  const t = dict.process;
  const n = t.steps.length;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Desktop (pinned): progress through the pin. Mobile (normal flow): the list passing mid-screen.
  const { scrollYProgress: pinProgress } = useScroll({ target: scrollerRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: listProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] });
  const isDesktop = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)'); // $bp-lg, where the pin kicks in
    const update = () => { isDesktop.current = mq.matches; };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Read both on every run: the function form only subscribes to values it actually reads
  const progress = useTransform(() => {
    const pin = pinProgress.get();
    const list = listProgress.get();
    return isDesktop.current ? pin : list;
  });
  const fill = useSpring(progress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, 'change', (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
  });

  const goToStep = (index: number) => {
    setActive(index);

    if (isDesktop.current && scrollerRef.current) {
      const scroller = scrollerRef.current;
      const rect = scroller.getBoundingClientRect();
      const scrollerTop = rect.top + window.scrollY;
      const scrollableDistance = scroller.offsetHeight - window.innerHeight;

      if (scrollableDistance > 0) {
        const targetProgress = (index + 0.5) / n;
        const targetY = scrollerTop + targetProgress * scrollableDistance;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });
        return;
      }
    }

    const stepEl = stepRefs.current[index];
    if (stepEl) {
      stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="process" className={styles.process}>
      <div
        ref={scrollerRef}
        className={styles.scroller}
        style={{ ['--steps' as string]: n }}
      >
        <div className={`container ${styles.pinned}`}>
          <div className={styles.intro}>
            <h2 className={styles.heading}>{t.title}</h2>
            <p className={styles.subtitle}>{t.subtitle}</p>
            <div className={styles.counter} aria-hidden="true">
              <span className={styles.counterCurrent}>{String(active + 1).padStart(2, '0')}</span>
              <span className={styles.counterTotal}>/ {String(n).padStart(2, '0')}</span>
            </div>
          </div>

          <ol ref={listRef} className={styles.steps}>
            <span className={styles.track} aria-hidden="true">
              <motion.span className={styles.trackFill} style={{ scaleY: fill }} />
            </span>
            {t.steps.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`${styles.step} ${i === active ? styles.active : ''} ${i < active ? styles.done : ''}`}
                aria-current={i === active ? 'step' : undefined}
              >
                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={() => goToStep(i)}
                  aria-label={`${step.title} (${i + 1} / ${n})`}
                >
                  <span className={styles.node} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.title}>{step.title}</h3>
                    <p className={styles.description}>{step.desc}</p>
                  </div>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
