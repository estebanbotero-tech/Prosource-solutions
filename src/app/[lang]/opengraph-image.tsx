import { ImageResponse } from 'next/og';
import { hasLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

// Social preview (WhatsApp, LinkedIn, Facebook...) generated from the hero copy
export const alt = 'Prosource Solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : 'es').hero;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(120deg, #001630 0%, #00224a 55%, #002650 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#b5d31d' }} />
          Prosource Solutions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          <span>{`${t.title} ${t.titleEnd}`}</span>
          <span style={{ color: '#b5d31d' }}>{t.highlight}</span>
        </div>
        <div style={{ display: 'flex', gap: 32, fontSize: 26, color: 'rgba(255,255,255,0.75)' }}>
          <span>{t.badge2}</span>
          <span>·</span>
          <span>{t.badge1}</span>
        </div>
      </div>
    ),
    size
  );
}
