import Script from 'next/script';
import { company } from '@/data/company';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Conversion events (lead sent, WhatsApp click). No-op until GA is configured.
export const track = (event: string, params: Record<string, string> = {}) => {
  window.gtag?.('event', event, params);
};

// Google Analytics 4; renders nothing unless NEXT_PUBLIC_GA_ID is set
export default function Analytics() {
  if (!company.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${company.gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${company.gaId}');`}
      </Script>
    </>
  );
}
