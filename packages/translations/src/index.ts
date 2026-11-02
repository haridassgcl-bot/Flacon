import en from '../en.json';
import ta from '../ta.json';

export type TranslationKeys = keyof typeof en;
export type Language = 'en' | 'ta';

export const translations = { en, ta };

export function t(key: TranslationKeys, lang: Language = 'en'): string {
  return (translations[lang] as any)[key] || (translations.en as any)[key] || key;
}

export { en, ta };

