import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import bn from './locales/bn/translation.json';
import en from './locales/en/translation.json';
import gu from './locales/gu/translation.json';
import hi from './locales/hi/translation.json';
import kn from './locales/kn/translation.json';
import ml from './locales/ml/translation.json';
import mr from './locales/mr/translation.json';
import ta from './locales/ta/translation.json';
import te from './locales/te/translation.json';

import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from './languages';

export { DEFAULT_LANGUAGE, LANGUAGE_CODES, SUPPORTED_LANGUAGES } from './languages';
export type { LanguageCode } from './languages';

const resources = {
  en: { translation: en },
  kn: { translation: kn },
  hi: { translation: hi },
  te: { translation: te },
  ta: { translation: ta },
  ml: { translation: ml },
  mr: { translation: mr },
  bn: { translation: bn },
  gu: { translation: gu },
} as const;

const i18n = createInstance();

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...LANGUAGE_CODES],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    returnNull: false,
  });
}

export default i18n;
