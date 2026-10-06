"use client";

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

// Counts the numeric part of values like "+15", "-68%", "99.2%", "< 60s" up from 0 when scrolled into view.
// Non-numeric values ("24/7") render as-is. Server HTML has the final value (SEO / no-JS).
// Writes to the DOM directly so the count doesn't re-render React every frame.
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    const el = ref.current;
    const match = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
    if (!el || !match || value.includes('/')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [, prefix, num, suffix] = match;
    const decimals = num.includes('.') ? num.split('.')[1].length : 0;
    const write = (v: number) => { el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`; };

    if (!inView) {
      write(0);
      return;
    }
    const controls = animate(0, parseFloat(num), { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: write });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref} className={className}>{value}</span>;
}
