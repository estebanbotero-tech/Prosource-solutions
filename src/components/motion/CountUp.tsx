"use client";

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

// Counts the numeric part of values like "+15", "-68%", "99.2%", "< 60s", "+200.000", "200,000" up from 0
// when scrolled into view. Non-numeric values, ratios and years render as-is.
// Server HTML has the final value (SEO / no-JS). Writes to the DOM directly so the count doesn't
// re-render React every frame.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const el = ref.current;
    const match = /^([^\d]*)(\d[\d.,]*)(.*)$/.exec(value);
    // Ratios ("24/7") and years ("2014") stay static: counting them up reads as noise
    if (!el || !match || value.includes('/') || /^(19|20)\d{2}$/.test(value)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [, prefix, num, suffix] = match;
    // "200.000" / "45,000" = thousands groups; anything else with . is a decimal ("99.2")
    const thousandsSep = /^\d{1,3}([.,]\d{3})+$/.test(num) ? num[num.search(/[.,]/)] : '';
    const target = thousandsSep ? parseInt(num.replace(/[.,]/g, ''), 10) : parseFloat(num);
    const decimals = !thousandsSep && num.includes('.') ? num.split('.')[1].length : 0;
    const format = (v: number) =>
      thousandsSep
        ? Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep)
        : v.toFixed(decimals);
    const write = (v: number) => { el.textContent = `${prefix}${format(v)}${suffix}`; };

    if (!inView) {
      write(0);
      return;
    }
    const controls = animate(0, target, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: write });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref} className={className}>{value}</span>;
}
