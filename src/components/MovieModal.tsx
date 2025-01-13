import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getMovieTrailer } from "@/services/movie";
import { IMovie } from "@/types/movie";
import { Spinner } from "./Spinner";
import ReactPlayer from "react-player/youtube";
import { useUI } from "@/contexts/UIContext";
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

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
  const { setIsModalOpen } = useUI();

  const handleClose = () => {
    onClose();
  };

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
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isOpen, movie?.id, setIsModalOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-4xl my-auto"
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
                className="absolute right-2 top-2 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors md:right-4 md:top-4"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </motion.button>

              {isLoading ? (
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <Spinner />
                </div>
              ) : trailer ? (
                <motion.div
                  className="aspect-video relative overflow-hidden max-h-[70vh] md:max-h-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="absolute inset-0 pointer-events-none" />
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailer}`}
                    width="100%"
                    height="100%"
                    playing={true}
                    controls={false}
                    muted={false}
                    loop={true}
                    playsinline={true}
                    stopOnUnmount={false}
                    onPause={() => false}
                    style={{ pointerEvents: "none" }}
                    config={{
                      playerVars: {
                        modestbranding: 1,
                        showinfo: 0,
                        rel: 0,
                        iv_load_policy: 3,
                        controls: 0,
                        disablekb: 1,
                        fs: 0,
                        playsinline: 1,
                        autoplay: 1,
                      },
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="relative bg-gray-900 overflow-hidden min-h-[300px] md:min-h-[400px] max-h-[70vh]"
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
              className="p-4 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-xl md:text-2xl font-bold">{movie.title}</h2>
                <Link href={`/movie/${movie.id}`}>
                  <motion.button
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                  >
                    <InformationCircleIcon className="w-5 h-5" /> Saiba mais
                  </motion.button>
                </Link>
              </div>
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
