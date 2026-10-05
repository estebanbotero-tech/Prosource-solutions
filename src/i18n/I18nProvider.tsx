"use client";

import { createContext, useContext } from 'react';
import type { Dict } from './es';
import type { Locale } from './config';

const I18nContext = createContext<{ lang: Locale; dict: Dict } | null>(null);

export function I18nProvider({ lang, dict, children }: { lang: Locale; dict: Dict; children: React.ReactNode }) {
  return <I18nContext value={{ lang, dict }}>{children}</I18nContext>;
}

export const useI18n = () => useContext(I18nContext)!;
