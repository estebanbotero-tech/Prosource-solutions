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
  const [activeId, setActiveId] = useState('');

  const otherLang = lang === 'es' ? 'en' : 'es';
  const switchHref = pathname.replace(/^\/(es|en)/, `/${otherLang}`);
  // Home starts on the dark hero, so the transparent header uses light text there
  const isHome = /^\/(es|en)\/?$/.test(pathname);

  // Desktop keeps 4 links (logo = home, CTA = contact); About/Contact live in the mobile menu and footer
  const navLinks = [
    { id: 'services', name: dict.nav.services },
    { id: 'solutions', name: dict.nav.solutions },
    { id: 'cases', name: dict.nav.cases },
    { id: 'estimator', name: dict.nav.estimator },
  ];
  const mobileLinks = [
    ...navLinks,
    { id: 'about', name: dict.nav.about },
    { id: 'contact', name: dict.nav.contact },
  ];

  useEffect(() => {
    const ids = ['services', 'solutions', 'cases', 'estimator'];
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Scroll-spy: the nav section crossing 40% of the viewport height
      const line = window.innerHeight * 0.4;
      const current = ids.find((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect();
        return r && r.top <= line && r.bottom > line;
      });
      setActiveId(current ?? '');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isScrolled && isHome ? styles.onDark : ''} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
    >
      <div className={`container ${styles.nav}`}>
        <Link href={`/${lang}`} className={styles.logo}>
          <Logo variant="header" />
          <span>{company.name}</span>
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`/${lang}#${link.id}`}
              className={`${styles.navLink} ${activeId === link.id ? styles.active : ''}`}
              aria-current={activeId === link.id ? 'location' : undefined}
            >
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

        {/* Mobile: compact CTA always in reach + menu button */}
        <div className={styles.mobileBar}>
          <Link href={`/${lang}#contact`} className={`btn btn-primary ${styles.mobileCta}`}>
            {dict.nav.cta}
          </Link>
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={dict.nav.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={28} />
          </button>
        </div>

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
                <X size={32} />
              </button>

              <nav className={styles.mobileNavLinks}>
                {mobileLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`/${lang}#${link.id}`}
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
