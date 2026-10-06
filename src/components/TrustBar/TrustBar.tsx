"use client";

import {
  Truck, Landmark, ShoppingBag, HeartPulse, Cpu, RadioTower, GraduationCap,
  Plane, ShieldCheck, Building2, Factory, Zap, Scale, Wheat,
} from 'lucide-react';
import styles from './TrustBar.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

// Same order as trustBar.items in src/i18n/*.ts
const icons = [
  Truck, Landmark, ShoppingBag, HeartPulse, Cpu, RadioTower, GraduationCap,
  Plane, ShieldCheck, Building2, Factory, Zap, Scale, Wheat,
];

export default function TrustBar() {
  const { dict } = useI18n();
  const t = dict.trustBar;

  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {t.items.map((name, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li key={name} className={styles.item}>
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
