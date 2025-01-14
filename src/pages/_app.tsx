import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UIProvider } from "@/contexts/UIContext";
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import { motion } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem("hasShownSplash");
    if (hasShownSplash) {
      setShowSplash(false);
      setIsFirstLoad(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasShownSplash", "true");
    setTimeout(() => {
      setIsFirstLoad(false);
    }, 500);
  };

  return (
    <UIProvider>
      {isFirstLoad && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showSplash ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-40"
        />
      )}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
          <div className="max-w-[1920px] mx-auto">
            <Component {...pageProps} />
          </div>
        </div>
      )}
    </UIProvider>
  );
}
