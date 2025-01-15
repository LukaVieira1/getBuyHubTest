import { motion } from "framer-motion";
import { IMovie } from "@/types/movie";
import MovieModal from "./MovieModal";
import { useState } from "react";
import MoviePoster from "./MoviePoster";
import { useTranslation } from "react-i18next";

interface SearchResultsProps {
  movies: IMovie[];
  searchTerm: string;
}

export default function SearchResults({
  movies,
  searchTerm,
}: SearchResultsProps) {
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const { t } = useTranslation();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`px-4 md:px-8 relative z-0 ${
          movies.length > 0
            ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
            : "flex flex-col items-center justify-center py-20"
        }`}
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <motion.div
              key={movie.id}
              layoutId={`movie-${movie.id}`}
              className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover:z-[1] cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedMovie(movie)}
            >
              <MoviePoster title={movie.title} posterPath={movie.poster_path} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-white text-sm font-semibold line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-1">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              {t("search.noResults")} "{searchTerm}"
            </h2>
            <p className="text-gray-400">{t("search.tryAgain")}</p>
          </motion.div>
        )}
      </motion.div>

      <MovieModal
        movie={selectedMovie!}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
