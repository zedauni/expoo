import i18next, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./en.json";
import ar from "./ar.json";
import ch from "./ch.json";
import hi from "./hi.json";
import id from "./id.json";
import fr from "./fr.json";

const STORAGE_KEY = "@APP:languageCode";

const languageDetector: LanguageDetectorAsyncModule = {
  init: () => { },
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem(STORAGE_KEY).then((savedDataJSON) => {
      const lng = savedDataJSON || undefined;
      const selectLanguage = lng;
      callback(selectLanguage);
    });
  },
  cacheUserLanguage: () => { },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    // compatibilityJSON: "v3",
    fallbackLng: "fr",
    resources: { en, ar, ch, hi, id, fr },
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export const dir = (lng?: string) => {
  const language = lng || i18next.language;
  return ["ar", "he", "fa", "ur"].includes(language) ? "rtl" : "ltr";
};

export const isRtl = (lng?: string) => {
  const language = lng || i18next.language;
  return ["ar", "he", "fa", "ur"].includes(language);
};

export default i18next;
