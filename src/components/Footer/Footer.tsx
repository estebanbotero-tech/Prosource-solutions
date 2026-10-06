"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.scss';
import { company, mapsUrl } from '@/data/company';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import Logo from '@/components/Logo/Logo';
import { useI18n } from '@/i18n/I18nProvider';
import { useClock } from '@/components/motion/useClock';

export default function Footer() {
  const { lang, dict } = useI18n();
  const t = dict.footer;
  const teamTime = useClock('America/Bogota');
  const currentYear = new Date().getFullYear();

  // Same sections as the navbar, plus About/Contact
  const navLinks = [
    { id: 'services', name: dict.nav.services },
    { id: 'solutions', name: dict.nav.solutions },
    { id: 'cases', name: dict.nav.cases },
    { id: 'estimator', name: dict.nav.estimator },
    { id: 'about', name: dict.nav.about },
    { id: 'contact', name: dict.nav.contact },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Closing call to action */}
        <div className={styles.cta}>
          <div>
            <span className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              {dict.hero.clocks.live}
              {teamTime && <span className={styles.statusTime}> · {teamTime} {t.inColombia}</span>}
            </span>
            <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
            <p className={styles.ctaText}>{t.ctaText}</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href={`/${lang}#contact`} className={styles.ctaButton}>
              {dict.nav.cta} <ArrowRight size={18} />
            </Link>
            <a href={`mailto:${company.contact.email}`} className={styles.ctaEmail}>
              {company.contact.email}
            </a>
          </div>
        </div>

        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href={`/${lang}`} className={styles.logo} aria-label={company.name}>
              <Logo />
            </Link>
            <p className={styles.description}>{t.description}</p>
            <SocialLinks className={styles.social} />
          </div>

          <nav className={styles.section} aria-label={t.navigation}>
            <h3>{t.navigation}</h3>
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}><Link href={`/${lang}#${l.id}`}>{l.name}</Link></li>
              ))}
            </ul>
          </nav>

          <div className={styles.section}>
            <h3>{t.services}</h3>
            <ul>
              {dict.services.items.map((s) => (
                <li key={s.title}><Link href={`/${lang}#services`}>{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h3>{t.contact}</h3>
            <ul className={styles.contactList}>
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${company.contact.email}`}>{company.contact.email}</a>
              </li>
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href={`tel:${company.contact.phoneHref}`}>{company.contact.phone}</a>
              </li>
              {company.contact.addresses.map((address) => (
                <li key={address}>
                  <MapPin size={16} aria-hidden="true" />
                  <a href={mapsUrl(address)} target="_blank" rel="noopener noreferrer">{address}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.bottom}>
          <p>&copy; {currentYear} {company.legalName} {t.rights}</p>
          <div className={styles.links}>
            <Link href={`/${lang}/privacy`}>{t.privacy}</Link>
            <Link href={`/${lang}/terms`}>{t.terms}</Link>
            <button
              type="button"
              className={styles.toTop}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t.backToTop} <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Edge-to-edge wordmark, rises into place when the footer is reached */}
      <div className={styles.wordmarkWrap} aria-hidden="true">
        <motion.span
          className={styles.wordmark}
          initial={{ y: '40%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          PROSOURCE
        </motion.span>
      </div>

    </footer>
  );
}
