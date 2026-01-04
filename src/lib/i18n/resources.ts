import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import fr from '@/translations/fr.json';

export const resources = {
  fr: {
    translation: fr,
  },
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export type Language = keyof typeof resources;
