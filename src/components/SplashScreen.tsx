import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
    { code: "en-US", name: "English", flag: "🇺🇸" },
  ];

  useEffect(() => {
    if (!selectedLanguage) return;

    const playAudio = async () => {
      if (!audioRef.current) return;

      try {
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
      } catch (error) {
        console.error("Erro ao reproduzir áudio:", error);
      }
    };

    playAudio();
  }, [selectedLanguage]);

  if (!selectedLanguage) {
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
            Selecione seu idioma
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
              onClick={() => setSelectedLanguage(lang.code)}
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
                  {lang.name}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 4 }}
      onAnimationComplete={onComplete}
    >
      <audio ref={audioRef} src="/splashJingle.mp3" preload="auto" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="text-5xl md:text-7xl font-bold text-red-600 mb-8"
      >
        WikiMovies
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
        }}
        className="absolute bottom-8 text-base md:text-lg"
      >
        <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent font-medium tracking-wider hover:from-gray-100 hover:to-gray-300 transition-all duration-300">
          lukavieira.tech
        </span>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 origin-left"
      />
    </motion.div>
  );
}
