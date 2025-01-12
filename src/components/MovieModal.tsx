import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getMovieTrailer } from "@/services/movie";
import { IMovie } from "@/types/movie";
import { Spinner } from "./Spinner";

interface MovieModalProps {
  movie: IMovie;
  isOpen: boolean;
  onClose: () => void;
}

export default function MovieModal({
  movie,
  isOpen,
  onClose,
}: MovieModalProps) {
  const [trailer, setTrailer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTrailer(null);
    const fetchTrailer = async () => {
      setIsLoading(true);
      try {
        const trailer = await getMovieTrailer(movie.id);
        if (trailer) {
          setTrailer(trailer.key);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchTrailer();
    }
  }, [isOpen, movie?.id]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-4xl"
            layoutId={`movie-${movie.id}`}
          >
            <div className="relative">
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.3,
                  ease: "backOut",
                }}
                className="absolute right-2 top-2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </motion.button>

              {isLoading ? (
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <Spinner />
                </div>
              ) : trailer ? (
                <motion.div
                  className="aspect-video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer}`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="relative bg-gray-900 overflow-hidden min-h-[400px] md:min-h-[500px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <img
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                        : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    }
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transform scale-110 blur-sm brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent" />
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    }
                    alt={movie.title}
                    className="relative mx-auto h-[400px] md:h-[500px] w-auto object-contain rounded-lg shadow-2xl"
                  />
                </motion.div>
              )}
            </div>

            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-400 mb-4">
                {new Date(movie.release_date).getFullYear()} •{" "}
                {movie.vote_average.toFixed(1)} ⭐
              </p>
              <p className="text-gray-300 line-clamp-3">{movie.overview}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
