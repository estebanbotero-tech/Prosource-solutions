"use client";

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import styles from './Hero.module.scss';

type RGB = [number, number, number];

// Operations base (Antioquia + Manizales offices). Edit freely: [lat, lng].
const BASES: [number, number][] = [
  [6.157, -75.643], // La Estrella, Antioquia
  [5.07, -75.517],  // Manizales
];
// Real client city, highlighted in lime (OK Taxi)
const CLIENTS: [number, number][] = [
  [33.75, -84.39], // Atlanta
];
// One point per continent (white dot + arc from Colombia): global reach, not specific clients
const REACH: [number, number][] = [
  [34.05, -118.24], // North America · Los Angeles
  [-23.55, -46.63], // South America · São Paulo
  [40.42, -3.7],    // Europe · Madrid
  [1.35, 103.82],   // Asia · Singapore
  [-33.87, 151.21], // Oceania · Sydney
  [-26.2, 28.05],   // Africa · Johannesburg
];

// Every country in the Americas (capital, or its main city): small dots without arcs.
// US, Brazil and Colombia also have the larger points (Atlanta/LA, São Paulo, bases).
const AMERICAS: [number, number][] = [
  // North America
  [40.71, -74.0],   // USA · New York
  [43.65, -79.38],  // Canada · Toronto
  [19.43, -99.13],  // México · Ciudad de México
  // Central America
  [14.63, -90.51],  // Guatemala
  [17.25, -88.77],  // Belice · Belmopán
  [13.69, -89.22],  // El Salvador · San Salvador
  [14.07, -87.19],  // Honduras · Tegucigalpa
  [12.11, -86.24],  // Nicaragua · Managua
  [9.93, -84.08],   // Costa Rica · San José
  [8.98, -79.52],   // Panamá
  // Caribbean
  [23.11, -82.37],  // Cuba · La Habana
  [17.97, -76.79],  // Jamaica · Kingston
  [18.59, -72.31],  // Haití · Puerto Príncipe
  [18.49, -69.93],  // República Dominicana · Santo Domingo
  [25.05, -77.35],  // Bahamas · Nassau
  [10.66, -61.51],  // Trinidad y Tobago · Puerto España
  [13.1, -59.61],   // Barbados · Bridgetown
  [14.01, -60.99],  // Santa Lucía · Castries
  [13.16, -61.22],  // San Vicente y las Granadinas · Kingstown
  [12.06, -61.75],  // Granada · Saint George's
  [17.12, -61.85],  // Antigua y Barbuda · Saint John's
  [15.3, -61.39],   // Dominica · Roseau
  [17.3, -62.72],   // San Cristóbal y Nieves · Basseterre
  // South America
  [10.48, -66.9],   // Venezuela · Caracas
  [-0.18, -78.47],  // Ecuador · Quito
  [-12.05, -77.04], // Perú · Lima
  [-16.5, -68.15],  // Bolivia · La Paz
  [-33.45, -70.67], // Chile · Santiago
  [-25.26, -57.58], // Paraguay · Asunción
  [-34.9, -56.16],  // Uruguay · Montevideo
  [-34.6, -58.38],  // Argentina · Buenos Aires
  [6.8, -58.16],    // Guyana · Georgetown
  [5.85, -55.2],    // Surinam · Paramaribo
];

// Major economies elsewhere: small dots without arcs (presence, not clutter)
const WORLD: [number, number][] = [
  [51.51, -0.13],   // London
  [48.86, 2.35],    // Paris
  [50.11, 8.68],    // Frankfurt
  [25.2, 55.27],    // Dubai
  [19.08, 72.88],   // Mumbai
  [31.23, 121.47],  // Shanghai
  [37.57, 126.98],  // Seoul
  [35.68, 139.69],  // Tokyo
];

// Key markets: thinner sky-blue arcs from Colombia (Atlanta keeps the lime arc as the real client)
const MARKETS: [number, number][] = [
  [40.71, -74.0],   // USA · New York
  [43.65, -79.38],  // Canada · Toronto
  [19.43, -99.13],  // México · Ciudad de México
  [-23.55, -46.63], // Brazil · São Paulo
  [40.42, -3.7],    // Spain · Madrid
  [51.51, -0.13],   // UK · London
  [25.2, 55.27],    // UAE · Dubai
  [35.68, 139.69],  // Japan · Tokyo
];

const LIME: RGB = [0.71, 0.83, 0.11];
const SKY: RGB = [0.55, 0.75, 1];
const WHITE: RGB = [1, 1, 1];

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
    const [focusPhi, focusTheta] = toAngles(18, -68); // starts centered on the Americas
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
        // Colombia and Atlanta are the protagonists: biggest, in lime
        ...BASES.map((location) => ({ location, size: 0.07 })),
        ...CLIENTS.map((location) => ({ location, size: 0.07 })),
        ...REACH.map((location) => ({ location, size: 0.035, color: WHITE })),
        ...[...AMERICAS, ...WORLD].map((location) => ({ location, size: 0.025, color: SKY })),
      ],
      // Colombia → Atlanta (the real client) in lime; Colombia → key markets and every continent in sky blue
      arcs: [
        ...[...MARKETS, ...REACH.filter((r) => !MARKETS.some((m) => m[0] === r[0] && m[1] === r[1]))]
          .map((to) => ({ from: BASES[0], to, color: SKY })),
        ...CLIENTS.map((to) => ({ from: BASES[0], to, color: LIME })),
      ],
      arcColor: LIME,
      arcWidth: 0.6,
      arcHeight: 0.35,
      markerElevation: 0.02,
    });

    // Slow full turn (~50s) so every continent comes around, plus drag offset.
    // Reduced motion: stays on the Americas.
    const tick = (now: number) => {
      if (visible) {
        const t = (now - start) / 1000;
        const spin = reduceMotion ? 0 : t * 0.12;
        globe.update({ phi: focusPhi + spin + dragOffset.current, width: width * 2, height: width * 2 });
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
