import { motion } from "framer-motion";
import { useState } from "react";
import { IMovie } from "@/types/movie";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface MovieCarouselProps {
  title: string;
  movies: IMovie[];
}

export default function MovieCarousel({ title, movies }: MovieCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

  const nextSlide = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= movies.length ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(0, movies.length - itemsPerPage)
        : prev - itemsPerPage
    );
  };

  return (
    <div className="relative px-4 md:px-8 my-8">
      <motion.h2
        className="text-2xl font-bold mb-6 text-white pl-2 border-l-4 border-red-600"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h2>

      <div className="relative group">
        <motion.div
          className="flex gap-4 overflow-hidden"
          initial={false}
          animate={{ x: `${-startIndex * (100 / itemsPerPage)}%` }}
          transition={{ type: "tween", ease: "easeInOut" }}
        >
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              className="flex-none w-[calc(100%/3)] md:w-[calc(100%/6)]"
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
        </motion.div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
