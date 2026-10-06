"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './Team.module.scss';
import { team } from '@/data/team';
import { useI18n } from '@/i18n/I18nProvider';

const ROTATE_MS = 6000;

// Desktop: expanding panels (active one shows photo + bio), auto-rotating while in view.
// Mobile: swipeable scroll-snap carousel. Same markup, layout switches in CSS at $bp-lg.
export default function Team() {
  const { dict } = useI18n();
  const t = dict.team;
  const n = team.length;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: '-30% 0px -30% 0px' });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setIsDesktop(mq.matches); setReduceMotion(rm.matches); };
    update();
    mq.addEventListener('change', update);
    rm.addEventListener('change', update);
    return () => { mq.removeEventListener('change', update); rm.removeEventListener('change', update); };
  }, []);

  const autoplay = isDesktop && inView && !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % n), ROTATE_MS);
    return () => clearTimeout(id);
  }, [autoplay, active, n]);

  const go = (i: number) => {
    const next = (i + n) % n;
    setActive(next);
    // Mobile: bring the card into view inside the horizontal track (never scrolls the page vertically)
    const track = trackRef.current;
    const card = track?.children[next] as HTMLElement | undefined;
    if (track && card && !isDesktop) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  // Mobile: keep the counter in sync while swiping
  const onScroll = () => {
    const track = trackRef.current;
    if (!track || isDesktop) return;
    const card = track.children[0] as HTMLElement;
    const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
    setActive(Math.min(n - 1, Math.round(track.scrollLeft / step)));
  };

  return (
    <section id="team" ref={sectionRef} className={`section ${styles.team}`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2>{t.title}</h2>
            <p>{t.subtitle}</p>
          </div>
          <div className={styles.controls}>
            <span className={styles.counter} aria-hidden="true">
              <strong>{String(active + 1).padStart(2, '0')}</strong> / {String(n).padStart(2, '0')}
            </span>
            <button type="button" className={styles.arrow} onClick={() => go(active - 1)} aria-label={t.prev}>
              <ArrowLeft size={20} />
            </button>
            <button type="button" className={styles.arrow} onClick={() => go(active + 1)} aria-label={t.next}>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onScroll={onScroll}
        >
          {team.map((member, i) => {
            const isActive = i === active;
            return (
              <article
                key={member.name}
                className={`${styles.panel} ${isActive ? styles.active : ''}`}
                onMouseEnter={() => isDesktop && setActive(i)}
              >
                <div className={styles.photo}>
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 760px, 80vw"
                  />
                </div>

                {/* Collapsed desktop panels: clickable to expand */}
                {isDesktop && !isActive && (
                  <button
                    type="button"
                    className={styles.hit}
                    onClick={() => setActive(i)}
                    aria-label={`${t.show} ${member.name}`}
                  />
                )}
                <span className={styles.index} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>

                <div className={styles.info}>
                  <p className={styles.role}>{t.members[i].role}</p>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.bio}>{t.members[i].bio}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Autoplay progress (desktop): restarts on every change, freezes while paused */}
        <div className={styles.progress} aria-hidden="true">
          <span
            key={active}
            className={`${styles.progressFill} ${autoplay ? '' : styles.progressPaused}`}
            style={{ animationDuration: `${ROTATE_MS}ms` }}
          />
        </div>
      </div>
    </section>
  );
}
