"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.scss';
import { company } from '@/data/company';
import Logo from '@/components/Logo/Logo';
import { useI18n } from '@/i18n/I18nProvider';

export default function Navbar() {
  const { lang, dict } = useI18n();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const otherLang = lang === 'es' ? 'en' : 'es';
  const switchHref = pathname.replace(/^\/(es|en)/, `/${otherLang}`);

  const navLinks = [
    { name: dict.nav.home, href: `/${lang}` },
    { name: dict.nav.services, href: `/${lang}#services` },
    { name: dict.nav.cases, href: `/${lang}#cases` },
    { name: dict.nav.estimator, href: `/${lang}#estimator` },
    { name: dict.nav.solutions, href: `/${lang}#solutions` },
    { name: dict.nav.about, href: `/${lang}#about` },
    { name: dict.nav.contact, href: `/${lang}#contact` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll and allow closing with Escape while the mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  const langSwitch = (
    <Link
      href={switchHref}
      className={styles.langSelector}
      hrefLang={otherLang}
      aria-label={dict.nav.switchLang}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Globe size={18} /> {otherLang.toUpperCase()}
    </Link>
  );

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.nav}`}>
        <Link href={`/${lang}`} className={styles.logo}>
          <Logo className={styles.logoIcon} variant="header" />
          <span style={{ fontWeight: 700 }}>{company.name}</span>
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className={styles.desktopActions}>
          {langSwitch}
          <Link href={`/${lang}#contact`} className="btn btn-primary">
            {dict.nav.cta}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label={dict.nav.openMenu}
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={28} />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              role="dialog"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={dict.nav.closeMenu}
              >
                <X size={32} color="#002d5a" />
              </button>

              <nav className={styles.mobileNavLinks}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className={styles.mobileActions}>
                {langSwitch}
                <Link
                  href={`/${lang}#contact`}
                  className="btn btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {dict.nav.cta}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
