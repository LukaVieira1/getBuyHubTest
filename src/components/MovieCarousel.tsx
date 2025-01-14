import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { IMovie } from "@/types/movie";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getPopularMovies } from "@/services/movie";
import useEmblaCarousel from "embla-carousel-react";
import MovieModal from "./MovieModal";
import { useUI } from "@/contexts/UIContext";

interface MovieCarouselProps {
  title: string;
  initialMovies: IMovie[];
}

export default function MovieCarousel({
  title,
  initialMovies,
}: MovieCarouselProps) {
  const [movies, setMovies] = useState<IMovie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const maxPages = 2;
  const preloadThreshold = 0.8;
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const { setIsModalOpen } = useUI();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: isFullyLoaded,
    align: "start",
    containScroll: false,
    dragFree: true,
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, isFullyLoaded]);

  const checkAndLoadMore = useCallback(async () => {
    if (!emblaApi || loading || currentPage >= maxPages) return;

    const currentIndex = emblaApi.selectedScrollSnap();
    const totalSlides = emblaApi.scrollSnapList().length;
    const progress = (currentIndex + 1) / totalSlides;

    if (progress > preloadThreshold) {
      await loadMoreMovies();
    }
  }, [emblaApi, currentPage, loading, maxPages]);

  const loadMoreMovies = async () => {
    if (currentPage >= maxPages || loading) return;

    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const data = await getPopularMovies(nextPage);
      setMovies((prev) => [...prev, ...data.results]);
      setCurrentPage(nextPage);

      if (nextPage === maxPages) {
        setIsFullyLoaded(true);
      }
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollNext = useCallback(async () => {
    if (!emblaApi) return;

    await checkAndLoadMore();
    emblaApi.scrollNext();
  }, [emblaApi, checkAndLoadMore]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      checkAndLoadMore();
    };

    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, checkAndLoadMore]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(isFullyLoaded || emblaApi.selectedScrollSnap() > 0);
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, isFullyLoaded]);

  const handleSelectMovie = (movie: IMovie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div className="relative pl-4 md:pl-8 my-8">
      <motion.h2
        className="text-2xl font-bold mb-6 text-white pl-2 border-l-4 border-red-600"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <div className="relative group">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex gap-4">
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                className="flex-none w-[calc(100%/3)] md:w-[calc(100%/5)] relative"
                whileHover={{ scale: 1.05, zIndex: 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelectMovie(movie)}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover:z-10">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750"
                    }
                    alt={movie.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-4 w-full">
                      <h3 className="text-white text-sm font-semibold line-clamp-2">
                        {movie.title}
                      </h3>
                      <p className="text-gray-300 text-xs mt-1">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex-none w-[calc(100%/3)] md:w-[calc(100%/5)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 -translate-x-4 group-hover:translate-x-0 z-10 hidden lg:block ${
            canScrollPrev ? "opacity-0 group-hover:opacity-100" : "opacity-0"
          }`}
          disabled={!canScrollPrev}
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10 hidden lg:block"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>

        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900/80 to-transparent pointer-events-none" />
      </div>

      <MovieModal
        movie={selectedMovie!}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
