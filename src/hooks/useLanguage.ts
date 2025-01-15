import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useLanguage() {
  const { i18n } = useTranslation();
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const detectLanguage = () => {
      const stored = localStorage.getItem("language");
      if (stored) {
        return stored;
      }

      const browserLang = navigator.language;
      const supported = ["pt-BR", "en-US"];

      return supported.includes(browserLang) ? browserLang : "en-US";
    };

    const detected = detectLanguage();
    setDetectedLanguage(detected);
    i18n.changeLanguage(detected);
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setDetectedLanguage(lang);
  };

  return {
    currentLanguage: detectedLanguage,
    changeLanguage,
    isLoading: !detectedLanguage,
  };
}
