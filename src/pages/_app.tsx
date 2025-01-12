import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UIProvider } from "@/contexts/UIContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UIProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden">
        <div className="max-w-[1920px] mx-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </UIProvider>
  );
}
