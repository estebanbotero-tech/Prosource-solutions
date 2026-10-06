"use client";

import { Truck, Landmark, ShoppingBag, HeartPulse, Cpu } from 'lucide-react';
import styles from './TrustBar.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

const icons = [Truck, Landmark, ShoppingBag, HeartPulse, Cpu];

export default function TrustBar() {
  const { dict } = useI18n();
  const t = dict.trustBar;

  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {t.items.map((item, index) => {
        const Icon = icons[index % icons.length];
        return (
          <li key={item.name} className={styles.item}>
            <span className={styles.iconCircle}><Icon size={18} /></span>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemTag}>{item.tag}</span>
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
