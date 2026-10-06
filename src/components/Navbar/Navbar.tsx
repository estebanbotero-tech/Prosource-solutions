"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import styles from './Navbar.module.scss';
import Logo from '@/components/Logo/Logo';
import { useI18n } from '@/i18n/I18nProvider';
import { useModal } from '@/components/useModal';

export default function Navbar() {
  const { lang, dict } = useI18n();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [hoverId, setHoverId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Site-wide fix for in-page links ("/es#contact" etc.): once the URL already has that hash,
  // Next's Link sees no navigation and the page doesn't move. Handle every same-page anchor
  // click here (capture phase, before Link) and always scroll to the section.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      const href = a?.getAttribute('href');
      if (!a || !href || a.target === '_blank') return;
      const url = new URL(href, window.location.href);
      if (!url.hash || url.pathname !== window.location.pathname) return;
      const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!section) return;
      // preventDefault only: Link skips navigation when defaultPrevented, while the link's own
      // onClick (prefillContact, closing the mobile menu) still runs
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.location.hash !== url.hash) history.pushState(null, '', url.hash);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useModal(menuRef, isMobileMenuOpen, () => setIsMobileMenuOpen(false));

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

  // Flip whatever is showing now (saved choice or OS preference) and remember it
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  };

  // Both icons render; CSS shows the one for the current theme, so server and client HTML match
  const themeToggle = (
    <button type="button" className={styles.langSelector} onClick={toggleTheme} aria-label={dict.nav.toggleTheme}>
      <Moon size={18} className="onlyLight" />
      <Sun size={18} className="onlyDark" />
    </button>
  );

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isScrolled && isHome ? styles.onDark : ''} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
    >
      <div className={`container ${styles.nav}`}>
        <Link href={`/${lang}`} className={styles.logo}>
          <Logo variant="header" />
          <span>Prosource <span className={styles.logoAccent}>Solutions</span></span>
        </Link>

        {/* Desktop Menu */}
        {/* Rolling text on hover; the lime dot follows hover, then settles back on the current section */}
        <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 500, damping: 38 }}>
          <nav className={styles.desktopMenu} onMouseLeave={() => setHoverId(null)}>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/${lang}#${link.id}`}
                className={`${styles.navLink} ${activeId === link.id ? styles.active : ''}`}
                aria-current={activeId === link.id ? 'location' : undefined}
                aria-label={link.name}
                onMouseEnter={() => setHoverId(link.id)}
                onFocus={() => setHoverId(link.id)}
                onBlur={() => setHoverId(null)}
              >
                {/* Two copies split into letters; aria-label keeps screen readers from spelling it out */}
                <span className={styles.roll} aria-hidden="true">
                  {[0, 1].map((row) => (
                    <span key={row} className={styles.rollRow}>
                      {[...link.name].map((ch, i) => (
                        <span key={i} style={{ ['--i' as string]: i }}>{ch}</span>
                      ))}
                    </span>
                  ))}
                </span>
                {(hoverId ?? activeId) === link.id && <motion.span layoutId="nav-dot" className={styles.dot} />}
              </Link>
            ))}
          </nav>
        </MotionConfig>

        {/* Desktop Actions */}
        <div className={styles.desktopActions}>
          {themeToggle}
          {langSwitch}
          <Link href={`/${lang}#contact`} className="btn btn-primary">
            {dict.nav.cta}
          </Link>
        </div>

        {/* Mobile: compact CTA always in reach + menu button */}
        <div className={styles.mobileBar}>
          {themeToggle}
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
              ref={menuRef}
              className={styles.mobileMenu}
              role="dialog"
              aria-modal="true"
              aria-label={dict.nav.menu}
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
