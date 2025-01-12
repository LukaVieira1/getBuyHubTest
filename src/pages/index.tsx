import { useEffect, useState } from "react";
import { getMoviesByGenre, getPopularMovies } from "@/services/movie";
import { IMovie } from "@/types/movie";
import MovieCarousel from "@/components/MovieCarousel";
import { motion } from "framer-motion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<IMovie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<IMovie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<IMovie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<IMovie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<IMovie[]>([]);
  const [documentaryMovies, setDocumentaryMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [
          popularData,
          fantasyData,
          comedyData,
          dramaData,
          horrorData,
          romanceData,
          documentaryData,
        ] = await Promise.all([
          getPopularMovies(1),
          getMoviesByGenre("Fantasy", 1),
          getMoviesByGenre("Comedy", 1),
          getMoviesByGenre("Drama", 1),
          getMoviesByGenre("Horror", 1),
          getMoviesByGenre("Romance", 1),
          getMoviesByGenre("Documentary", 1),
        ]);
        setPopularMovies(popularData.results);
        setFantasyMovies(fantasyData.results);
        setComedyMovies(comedyData.results);
        setDramaMovies(dramaData.results);
        setHorrorMovies(horrorData.results);
        setRomanceMovies(romanceData.results);
        setDocumentaryMovies(documentaryData.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white pb-16">
      {/* Header */}
      <header className="relative h-[70vh] mb-8">
        {popularMovies[0] && (
          <>
            <div className="absolute inset-0">
              <img
                src={`https://image.tmdb.org/t/p/original${popularMovies[0].backdrop_path}`}
                alt={popularMovies[0].title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
              <motion.h1
                className="text-4xl md:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {popularMovies[0].title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {popularMovies[0].overview}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href={`/movie/${popularMovies[0].id}`}>
                  <button className="mt-4 inline-flex items-center px-6 py-3 rounded-lg border-2 border-white/20 hover:border-white bg-black/30 hover:bg-black/50 backdrop-blur-sm transition-all duration-300 group">
                    <InformationCircleIcon className="w-5 h-5 mr-2 group-hover:text-red-500 transition-colors" />
                    <span className="font-medium">Mais informações</span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </>
        )}
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="text-2xl font-bold text-red-600"
              whileHover={{ scale: 1.05 }}
            >
              MovieDB
            </motion.div>
            <div className="flex space-x-4">
              <motion.button
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Início
              </motion.button>
              <motion.button
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Categorias
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-8">
        <MovieCarousel title="Populares" initialMovies={popularMovies} />
        <MovieCarousel title="Fantasia" initialMovies={fantasyMovies} />
        <MovieCarousel title="Comédia" initialMovies={comedyMovies} />
        <MovieCarousel title="Drama" initialMovies={dramaMovies} />
        <MovieCarousel title="Horror" initialMovies={horrorMovies} />
        <MovieCarousel title="Romance" initialMovies={romanceMovies} />
        <MovieCarousel title="Documentário" initialMovies={documentaryMovies} />
      </main>
    </div>
  );
}
