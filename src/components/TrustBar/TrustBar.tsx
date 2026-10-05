"use client";

import { motion } from 'framer-motion';
import { Truck, Landmark, ShoppingBag, HeartPulse, Cpu } from 'lucide-react';
import styles from './TrustBar.module.scss';
import { useI18n } from '@/i18n/I18nProvider';

const icons = [Truck, Landmark, ShoppingBag, HeartPulse, Cpu];

export default function TrustBar() {
  const { dict } = useI18n();
  const t = dict.trustBar;

  return (
    <section className={styles.trustSection}>
      <div className="container">
        <p className={styles.headerTitle}>{t.title}</p>
        
        <div className={styles.grid}>
          {t.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div 
                key={item.name}
                className={styles.item}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className={styles.iconCircle}>
                  <Icon size={20} />
                </div>
                <div className={styles.meta}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemTag}>{item.tag}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
