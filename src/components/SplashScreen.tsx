import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
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
  }, []);

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
