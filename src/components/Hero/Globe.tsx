"use client";

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import styles from './Hero.module.scss';

// Operations base (Antioquia + Manizales offices) and the markets we connect to.
// Edit freely: [lat, lng].
const BASES: [number, number][] = [
  [6.157, -75.643], // La Estrella, Antioquia
  [5.07, -75.517],  // Manizales
];
const MARKETS: [number, number][] = [
  [25.76, -80.19],  // Miami
  [33.75, -84.39],  // Atlanta
  [40.71, -74.0],   // New York
  [19.43, -99.13],  // Ciudad de México
  [40.42, -3.7],    // Madrid
];

const LIME: [number, number, number] = [0.71, 0.83, 0.11];

// cobe's own formula to turn a coordinate into globe rotation angles
const toAngles = (lat: number, lng: number) => [
  Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
  (lat * Math.PI) / 180,
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ startX: number; offset: number } | null>(null);
  const dragOffset = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [focusPhi, focusTheta] = toAngles(18, -68); // centered on the Americas, Madrid at the edge
    let width = canvas.offsetWidth;
    let visible = true;
    let raf = 0;
    const start = performance.now();

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
      phi: focusPhi,
      theta: focusTheta * 0.6,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.04,
      baseColor: [0.09, 0.2, 0.36],
      markerColor: LIME,
      glowColor: [0.12, 0.32, 0.58],
      markers: [
        ...BASES.map((location) => ({ location, size: 0.09 })),
        ...MARKETS.map((location) => ({ location, size: 0.05, color: [1, 1, 1] as [number, number, number] })),
      ],
      arcs: MARKETS.map((to) => ({ from: BASES[0], to })),
      arcColor: LIME,
      arcWidth: 0.6,
      arcHeight: 0.35,
      markerElevation: 0.02,
    });

    // Gentle sway around the Americas (never spins them out of view) + drag offset
    const tick = (now: number) => {
      if (visible) {
        const t = (now - start) / 1000;
        const sway = reduceMotion ? 0 : Math.sin(t * 0.18) * 0.35;
        globe.update({ phi: focusPhi + sway + dragOffset.current, width: width * 2, height: width * 2 });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => { width = canvas.offsetWidth; });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    // Fade in once the first frame is drawn (canvas is decorative, text never waits on it)
    requestAnimationFrame(() => canvas.classList.add(styles.globeReady));

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.globe}
      onPointerDown={(e) => {
        drag.current = { startX: e.clientX, offset: dragOffset.current };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (drag.current) dragOffset.current = drag.current.offset + (e.clientX - drag.current.startX) / 200;
      }}
      onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
    />
  );
}
