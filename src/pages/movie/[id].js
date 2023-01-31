//Hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//Services
import { getMovie, getSimilarMovies } from "@/services/movie";

//chakra ui
import { Flex, Heading, Image, Spinner, Stack, Text } from "@chakra-ui/react";

//components
import MovieCard from "@/components/MovieCard";

export default function MoviePage() {
  //Movie State
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  //Loading State
  const [loading, setLoading] = useState(true);

  //Route
  const router = useRouter();
  const movieId = router.query.id;

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
    <Flex flexDirection="column">
      {loading && <Spinner alignSelf="center" size="xl" mt="20%" />}
      {!loading && (
        <Flex p="20px" flexDirection="column" gap="16">
          <Flex gap="3">
            <Image
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`}
              alt={movie.title}
              borderRadius="lg"
            />
            <Flex flexDirection="column">
              <Stack mt={6} spacing="3">
                <Heading size="md">{movie.title}</Heading>
                <Text>
                  <strong>Lançamento:</strong>
                  {movie.release_date}
                </Text>
                <Text maxW="xl">
                  <strong>Sinopse:</strong>
                  {movie.overview}
                </Text>
              </Stack>
            </Flex>
          </Flex>

          <Flex flexDirection="column">
            <Text fontSize="4xl" as="b">
              Filmes relacionados:
            </Text>
            <Flex
              flexDirection="row"
              justifyContent="space-evenly"
              flexWrap="wrap"
              gap="20px"
              m="30px 0"
            >
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
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
