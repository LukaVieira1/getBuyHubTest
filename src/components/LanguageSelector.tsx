import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";

interface LanguageSelectorProps {
  onComplete: () => void;
}

export default function LanguageSelector({
  onComplete,
}: LanguageSelectorProps) {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();

  const languages = [
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
    { code: "en-US", name: "English", flag: "🇺🇸" },
  ];

  const handleSelectLanguage = (lang: string) => {
    changeLanguage(lang);
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-50 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mb-12 text-center"
      >
        <h1 className="text-xl md:text-2xl text-gray-400 font-light">
          {t("languageSelector.title")}
        </h1>
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            onClick={() => handleSelectLanguage(lang.code)}
            className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 min-w-[220px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.6 + index * 0.1 },
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <div className="flex items-center justify-between">
              <span className="text-2xl filter drop-shadow-lg">
                {lang.flag}
              </span>
              <span className="text-lg text-white font-medium tracking-wide">
                {t(`languageSelector.languages.${lang.code}`)}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
