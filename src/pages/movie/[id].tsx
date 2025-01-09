import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMovie, getSimilarMovies } from "@/services/movie";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import { formatLongDate } from "@/utils/dateFormat";
import { IMovie, IMovieDetail } from "@/types/movie";

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
      };
      request();
      setLoading(false);
    }
  }, [movieId]);

  return (
    <div className="flex flex-col">
      {loading && (
        <div className="self-center mt-[20%]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}
      {!loading && (
        <div className="flex flex-col p-5 gap-16">
          <Link href={"/"}>
            <span className="underline">Voltar para página inicial</span>
          </Link>

          <div className="flex flex-col md:flex-row gap-3">
            <img
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`
                  : "https://picsum.photos/200"
              }
              alt={movie.title}
              className="w-full md:w-[278px] h-[278px] rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <div className="mt-6 space-y-3">
                <h2 className="text-xl font-bold">{movie.title}</h2>
                <p>
                  <strong>Lançamento: </strong>
                  {formatLongDate(movie.release_date)}
                </p>
                <p className="max-w-xl">
                  <strong>Sinopse: </strong>
                  {movie.overview ? movie.overview : "Não há sinopse."}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-4xl font-bold">Filmes relacionados:</span>
            <div className="flex flex-row justify-evenly flex-wrap gap-5 my-8">
              {similarMovies &&
                similarMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    image={movie.poster_path}
                    id={movie.id}
                  />
                ))}
              {similarMovies.length === 0 && (
                <span
                  className={`text-3xl md:text-4xl font-bold ${
                    loading ? "hidden" : ""
                  }`}
                >
                  Nenhum filme relacionado!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
