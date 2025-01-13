import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMovie, getSimilarMovies } from "@/services/movie";
import MoviePoster from "@/components/MoviePoster";
import Link from "next/link";
import { formatLongDate } from "@/utils/dateFormat";
import { IMovie, IMovieDetail } from "@/types/movie";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function MoviePage() {
  const [movie, setMovie] = useState<IMovieDetail>({} as IMovieDetail);
  const [similarMovies, setSimilarMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const movieId = router.query.id as string;

  useEffect(() => {
    if (movieId) {
      const request = async () => {
        setLoading(true);
        const movieData = await getMovie(movieId);
        setMovie(movieData);
        const similarData = await getSimilarMovies(movieId);
        setSimilarMovies(similarData.results);
        setLoading(false);
      };
      request();
    }
  }, [movieId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        {/* Background Image */}
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

        {/* Content */}
        <div className="relative pt-8 px-4 md:px-8 max-w-7xl mx-auto">
          <Link href="/">
            <motion.button
              className="inline-flex items-center text-white/80 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Voltar
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

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 mb-8"
            >
              <h2 className="text-2xl font-bold mb-8">Filmes Relacionados</h2>
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
