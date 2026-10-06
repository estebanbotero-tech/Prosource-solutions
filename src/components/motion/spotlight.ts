import type { PointerEvent } from 'react';

// Put on a grid container: feeds the hovered card's pointer position into --spot-x / --spot-y,
// which the card's CSS turns into a radial highlight. One listener for the whole grid.
export const onSpotlightMove = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== 'mouse') return;
  const card = (e.target as HTMLElement).closest<HTMLElement>('[data-spotlight]');
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
  card.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
};
