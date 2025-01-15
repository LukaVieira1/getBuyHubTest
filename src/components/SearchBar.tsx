import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IMovie } from "@/types/movie";
import { getMoviesByKeywords } from "@/services/movie";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onSearchResults: (results: IMovie[] | null) => void;
  onSearchChange: (search: string) => void;
  value?: string;
}

export default function SearchBar({
  onSearchResults,
  onSearchChange,
  value,
}: SearchBarProps) {
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();
  const { t } = useTranslation();

  const handleSearch = async (term: string) => {
    if (term.length === 0) {
      onSearchResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const data = await getMoviesByKeywords(term, t("param.language"));
      onSearchResults(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    onSearchChange(term);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      handleSearch(term);
    }, 500);
  };

  return (
    <div className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-50" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={t("search.placeholder")}
          className="w-full pl-10 pr-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg focus:outline-none focus:border-red-500 text-white placeholder-gray-400"
        />
      </div>
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
