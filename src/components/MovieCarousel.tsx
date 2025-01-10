import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { IMovie } from "@/types/movie";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getPopularMovies } from "@/services/movie";

const DESKTOP_BREAKPOINT = 1024;

interface MovieCarouselProps {
  title: string;
  initialMovies: IMovie[];
}

interface DragConstraints {
  left: number;
  right: number;
}

export default function MovieCarousel({
  title,
  initialMovies,
}: MovieCarouselProps) {
  const [movies, setMovies] = useState<IMovie[]>(initialMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const itemsPerPage = 5;
  const maxPages = 4;

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDraggable = () => {
      setIsDraggable(window.innerWidth < DESKTOP_BREAKPOINT);
    };

    checkDraggable();

    window.addEventListener("resize", checkDraggable);

    return () => window.removeEventListener("resize", checkDraggable);
  }, []);

  const getDragConstraints = (): DragConstraints => {
    if (!containerRef.current || !carouselRef.current) {
      return { left: 0, right: 0 };
    }

    const containerWidth = containerRef.current.clientWidth;
    const carouselWidth = carouselRef.current.scrollWidth;

    return {
      left: -(carouselWidth - containerWidth),
      right: 0,
    };
  };

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

  const getOverlappingIndex = (index: number) => {
    if (index === 0) return 0;
    return index - Math.floor(index / itemsPerPage);
  };

  const nextSlide = async () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const nextIndex = currentIndex + itemsPerPage;

    if (!isFullyLoaded) {
      if (nextIndex + (itemsPerPage - 1) >= movies.length) {
        await loadMoreMovies();
      }
    }

    if (nextIndex >= movies.length) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(nextIndex - 1);
  };

  const calculateOffset = (index: number) => {
    if (isDraggable) return 0;
    const itemWidth = 100 / itemsPerPage;
    const offset = getOverlappingIndex(index) * itemWidth;

    if (index === 0) return 0;

    const gapPercentage =
      ((16 * itemsPerPage) / (containerRef.current?.clientWidth || 1)) * 100;
    const adjustedOffset =
      offset + gapPercentage * (getOverlappingIndex(index) / itemsPerPage);

    return `${-adjustedOffset}%`;
  };

  const prevSlide = () => {
    if (!isFullyLoaded && currentIndex === 0) {
      return;
    }

    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(0, movies.length - (itemsPerPage - 1))
        : prev - (itemsPerPage - 1)
    );
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
        <div ref={containerRef} className="overflow-hidden pr-0">
          <motion.div
            ref={carouselRef}
            initial={false}
            animate={{
              x: calculateOffset(currentIndex),
            }}
            drag={isDraggable ? "x" : false}
            dragConstraints={getDragConstraints()}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            transition={{ type: "tween", ease: "easeInOut" }}
            className={`flex gap-4 ${
              isDraggable ? "cursor-grab active:cursor-grabbing" : ""
            }`}
            onDragEnd={(_, info) => {
              if (isDraggable) {
                const threshold = 50;
                if (Math.abs(info.offset.x) > threshold) {
                  if (info.offset.x > 0) {
                    prevSlide();
                  } else {
                    nextSlide();
                  }
                }
              }
            }}
          >
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                className="flex-none w-[calc(100%/3)] md:w-[calc(100%/5)]"
                whileHover={{ scale: 1.05, zIndex: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
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
              <div className="flex-none w-[calc(100%/3)] md:w-[calc(100%/6)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
              </div>
            )}
          </motion.div>
        </div>

        <button
          onClick={prevSlide}
          disabled={!isFullyLoaded && currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 -translate-x-4 group-hover:translate-x-0 z-10 hidden lg:block ${
            !isFullyLoaded && currentIndex === 0
              ? "opacity-0"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10 hidden lg:block"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>

        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
