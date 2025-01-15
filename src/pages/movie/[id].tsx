// Next.js
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

// Services
import { getMovie, getSimilarMovies, getMovieCredits } from "@/services/movie";

// Components
import useEmblaCarousel from "embla-carousel-react";
import MoviePoster from "@/components/MoviePoster";
import CastMember from "@/components/CastMember";
import { Spinner } from "@/components/Spinner";

// Utils
import { formatLongDate } from "@/utils/dateFormat";
import { removeNonActors } from "@/utils/moviesActors";

// Types
import { IMovie, IMovieDetail, ICastMember } from "@/types/movie";

// Framer Motion
import { motion } from "framer-motion";

// Icons
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// i18n
import { useTranslation } from "react-i18next";

export default function MoviePage() {
  const { t } = useTranslation();
  const [movie, setMovie] = useState<IMovieDetail>({} as IMovieDetail);
  const [similarMovies, setSimilarMovies] = useState<IMovie[]>([]);
  const [actors, setActors] = useState<ICastMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: false,
    dragFree: true,
    loop: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const router = useRouter();
  const movieId = router.query.id as string;

  const fetchMovieData = useCallback(async () => {
    setLoading(true);
    try {
      const [movieData, similarData, creditsData] = await Promise.all([
        getMovie(movieId, t("param.language")),
        getSimilarMovies(movieId, t("param.language")),
        getMovieCredits(movieId, t("param.language")),
      ]);
      setMovie(movieData);
      setSimilarMovies(similarData.results);
      setActors(removeNonActors(creditsData));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        <div className="absolute inset-0 h-[50vh]">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/original${movie.poster_path}`
            }
            alt={movie.title}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900" />
        </div>

        <div className="relative pt-8 px-4 md:px-8 max-w-7xl mx-auto">
          <Link href="/">
            <motion.button
              className="inline-flex items-center text-white/80 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              {t("moviePage.backToHome")}
            </motion.button>
          </Link>

          <div className="mt-8 md:mt-16 flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full md:w-1/3 lg:w-1/4"
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <MoviePoster
                  title={movie.title}
                  posterPath={movie.poster_path}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie.title}
              </h1>
              <div className="space-y-4">
                <p className="text-xl text-gray-400">
                  {formatLongDate(movie.release_date)} •{" "}
                  {movie.vote_average?.toFixed(1)} ⭐
                </p>
                <p className="text-lg leading-relaxed">{movie.overview}</p>
                {movie.genres && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {actors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 relative group"
            >
              <h2 className="text-xl font-semibold mb-4">
                {t("moviePage.cast")}
              </h2>
              <div className="relative">
                <div className="overflow-hidden -m-2" ref={emblaRef}>
                  <div className="flex gap-4 px-16">
                    {actors.map((actor) => (
                      <CastMember key={actor.id} member={actor} />
                    ))}
                  </div>
                </div>
                <div className="absolute -right-2 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
                <div className="absolute -left-2 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
              </div>
              <button
                onClick={scrollPrev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 -translate-x-4 group-hover:translate-x-0 z-10 hidden md:block ${
                  canScrollPrev
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-0"
                }`}
                disabled={!canScrollPrev}
              >
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </button>
              <button
                onClick={scrollNext}
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10 hidden md:block ${
                  canScrollNext
                    ? "opacity-0 group-hover:opacity-100"
                    : "opacity-0"
                }`}
                disabled={!canScrollNext}
              >
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </button>
            </motion.div>
          )}

          {similarMovies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 mb-8"
            >
              <h2 className="text-2xl font-bold mb-8">
                {t("moviePage.relatedMovies")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {similarMovies.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <motion.div
                      layoutId={`movie-${movie.id}`}
                      className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg hover:z-[1] cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoviePoster
                        title={movie.title}
                        posterPath={movie.poster_path}
                      />
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
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
