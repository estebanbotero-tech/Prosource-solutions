"use client";

import { Truck, ShoppingBag, Cpu, RadioTower, Plane, Briefcase } from 'lucide-react';
import styles from './TrustBar.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

// Same order as trustBar.items in src/i18n/*.ts
const icons = [Truck, ShoppingBag, Cpu, RadioTower, Plane, Briefcase];

// The list is short, so each row repeats it to stay wider than large screens
const REPEAT = 2;

export default function TrustBar() {
  const { dict } = useI18n();
  const t = dict.trustBar;

  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEAT }, () => t.items).flat().map((name, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li
            key={`${name}-${index}`}
            className={index >= t.items.length ? `${styles.item} ${styles.repeat}` : styles.item}
            aria-hidden={index >= t.items.length || undefined}
          >
            <span className={styles.iconCircle}><Icon size={16} /></span>
            <span className={styles.itemName}>{name}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className={styles.trustSection}>
      <p className={styles.headerTitle}>{t.title}</p>
      {/* Two identical rows slide by 50% for a seamless loop; the copy is hidden from screen readers */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
