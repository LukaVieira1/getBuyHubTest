import { useEffect, useState } from "react";
import { getMoviesByKeywords, getPopularMovies } from "@/services/movie";
import MovieCard from "@/components/MovieCard";
import { IMovie } from "@/types/movie";

export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      const data = await getPopularMovies();
      setMovies(data.results);
      setLoading(false);
    };
    request();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      setLoading(true);
      const data = await getMoviesByKeywords(search);
      setMovies(data.results);
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar filme..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading ? (
        <div className="self-center mt-[20%]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              image={movie.poster_path}
              id={movie.id}
            />
          ))}
        </div>
      )}
    </main>
  );
}
