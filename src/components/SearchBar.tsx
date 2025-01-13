import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { IMovie } from "@/types/movie";
import { getMoviesByKeywords } from "@/services/movie";
import debounce from "lodash/debounce";

interface SearchBarProps {
  onSearchResults: (movies: IMovie[] | null) => void;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({
  onSearchResults,
  onSearchChange,
}: SearchBarProps) {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchMovies = useCallback(
    debounce(async (term: string) => {
      if (term.length >= 2) {
        setIsSearching(true);
        try {
          const data = await getMoviesByKeywords(term);
          onSearchResults(data.results);
        } catch (error) {
          console.error("Erro na busca:", error);
          onSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        onSearchResults(null);
      }
    }, 500),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
    searchMovies(e.target.value);
  };

  return (
    <div className="relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-50" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Buscar filmes..."
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
