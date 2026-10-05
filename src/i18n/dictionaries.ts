import es from './es';
import en from './en';
import type { Locale } from './config';

export const getDictionary = (lang: Locale) => ({ es, en })[lang];
