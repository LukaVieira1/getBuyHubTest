import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEN from "./locales/en-US/common.json";
import commonPT from "./locales/pt-BR/common.json";

const resources = {
  "en-US": {
    common: commonEN,
  },
  "pt-BR": {
    common: commonPT,
  },
};

export const defaultNS = "common";
export const fallbackLng = "en-US";

i18n.use(initReactI18next).init({
  resources,
  lng: undefined, // let detect the language on client side
  fallbackLng,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
