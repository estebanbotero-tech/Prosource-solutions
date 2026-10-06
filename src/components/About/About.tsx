"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import styles from './About.module.scss';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';
import CountUp from '@/components/motion/CountUp';

export default function About() {
  const { lang, dict } = useI18n();
  const t = dict.about;

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h2 className={styles.title}>{t.title}</h2>
            <ul className={styles.offices} aria-label={dict.footer.offices}>
              {company.contact.addresses.map((address) => (
                <li key={address}>
                  <MapPin size={14} aria-hidden="true" />
                  {address.split('\n')[1]}
                </li>
              ))}
            </ul>
            <Link href={`/${lang}#process`} className={styles.processLink}>
              {t.howWeWork} <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.text}>
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>
        </motion.div>

        <div className={styles.purpose}>
          {[
            { title: t.missionTitle, text: t.mission },
            { title: t.visionTitle, text: t.vision },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.purposeItem}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>

        <dl className={styles.stats}>
          {company.stats.map((value, index) => (
            <div key={index} className={styles.stat}>
              <dt className={styles.statLabel}>{t.stats[index]}</dt>
              <dd><CountUp value={value} className={styles.statValue} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
