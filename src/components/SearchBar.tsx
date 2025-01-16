import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IMovie } from "@/types/movie";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearchResults: (results: IMovie[] | null, term: string) => void;
  onSearchChange: (value: string) => void;
  value: string;
  onClearSearch?: () => void;
  isSearchDisabled?: boolean;
  isLoading?: boolean;
}

export default function SearchBar({
  onSearchResults,
  onSearchChange,
  value,
  onClearSearch,
  isSearchDisabled,
  isLoading = false,
}: SearchBarProps) {
  const { t } = useTranslation();
  const [previousValue, setPreviousValue] = useState(value);

  const performSearch = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm.trim() || isSearchDisabled) {
        if (onClearSearch) onClearSearch();
        return;
      }

      if (searchTerm === previousValue) return;

      onSearchResults([], searchTerm);
      setPreviousValue(searchTerm);
    },
    [onSearchResults, previousValue, isSearchDisabled, onClearSearch]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value, performSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={t("search.placeholder")}
        className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm"
      />
      <AnimatePresence>
        {isLoading && (
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
