"use client";

import { useSyncExternalStore } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import styles from './Analytics.module.scss';
import { company } from '@/data/company';
import { useI18n } from '@/i18n/I18nProvider';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Conversion events (lead sent, WhatsApp click). No-op until GA is configured and accepted.
export const track = (event: string, params: Record<string, string> = {}) => {
  window.gtag?.('event', event, params);
};

// Cookie consent (Ley 1581): "granted" | "denied" | null (not asked yet). Blocked storage counts as denied.
const KEY = 'analytics-consent';
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
const readConsent = () => { try { return localStorage.getItem(KEY); } catch { return 'denied'; } };
const choose = (value: 'granted' | 'denied') => {
  try { localStorage.setItem(KEY, value); } catch {}
  listeners.forEach((l) => l());
};

// Google Analytics 4; renders nothing unless NEXT_PUBLIC_GA_ID is set, and loads only after consent
export default function Analytics() {
  const { lang, dict } = useI18n();
  const consent = useSyncExternalStore(subscribe, readConsent, () => 'ssr');
  if (!company.gaId) return null;

  if (consent === 'granted') {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${company.gaId}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${company.gaId}');`}
        </Script>
      </>
    );
  }
  if (consent !== null) return null;

  const t = dict.cookies;
  return (
    <div className={styles.banner} role="region" aria-label={t.label}>
      <p>
        {t.text} <Link href={`/${lang}/privacy`}>{t.more}</Link>
      </p>
      <div className={styles.actions}>
        <button type="button" className="btn btn-outline" onClick={() => choose('denied')}>{t.reject}</button>
        <button type="button" className="btn btn-primary" onClick={() => choose('granted')}>{t.accept}</button>
      </div>
    </div>
  );
}
