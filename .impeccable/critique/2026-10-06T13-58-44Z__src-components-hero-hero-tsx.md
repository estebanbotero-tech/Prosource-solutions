---
target: hero + navbar /es
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\proso\\OneDrive\\Escritorio\\prosource solutions\\src\\components\\Hero\\Hero.tsx"
target_fingerprint: "sha256:6ef521c0600c98d83010f9a8a39f127206a3e6074121a6b29cc2a1b0efe6d137"
target_path: "C:\\Users\\proso\\OneDrive\\Escritorio\\prosource solutions\\src\\components\\Hero\\Hero.tsx"
timestamp: 2026-10-06T13-58-44Z
slug: src-components-hero-hero-tsx
closed: true
---
# Critique: hero + navbar (/es) — 19/32 Acceptable (n/a: 7, 10)

Heuristics: 1:2 2:2 3:3 4:1 5:2 6:3 7:n/a 8:2 9:2 10:n/a

Specificity: ~80% category-interchangeable SaaS hero; fake live dashboard with hardcoded metrics hurts B2B trust. Detector: gradient-text Hero.module.scss:98 (CLI); browser 20 patterns page-wide (~8 hero: radial glow, all-caps, thin border+wide shadow, pulsing dot glow, nested cards (FP), Inter-only).

Priority issues:
- [P1] Hero invisible until hydration (framer initial opacity:0 on text + visual). optimize.
- [P1] Inconsistent quote paths: "Solicitar cotización"->#estimator, "Cotizar en 24h"->#contact, "Cotizador ROI"; fake "1" FAB badge; no "sin compromiso / 24h" microline by hero CTA. clarify.
- [P1] Generic fake dashboard; pill overlaps Uptime badge at desktop. Replace with team/coverage/client proof. shape.
- [P2] Navbar 9 targets, no active state, lime hover invisible, no focus ring. distill.
- [P2] Mobile H1: forced <br/> orphan, inline-block highlight, "yreduce" textContent, squashed livePulse; mobileMenu 100vh. adapt.

Minor: gradient text, inline fontWeight on logo, dead .logo-icon, EN/hardcoded strings in ES dashboard, blob/pulse ignore reduced-motion, weak scrolled state.
