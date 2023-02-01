//Hooks
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//Services
import { getMovie, getSimilarMovies } from "@/services/movie";

//chakra ui
import { Flex, Heading, Image, Spinner, Stack, Text } from "@chakra-ui/react";

//components
import MovieCard from "@/components/MovieCard";
import Link from "next/link";

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
          <Link href={"/"}>
            <Text as="u">Voltar para página inicial</Text>
          </Link>
          <Flex flexDirection={["column", "row"]} gap="3">
            <Image
              src={
                movie.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`
                  : "https://picsum.photos/200"
              }
              alt={movie.title}
              width={["100%", "278px"]}
              height="278px"
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
                  {movie.overview ? movie.overview : "Não há sinopse."}
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
              {similarMovies.length === 0 && (
                <Text
                  hidden={loading ? "true" : "false"}
                  fontSize={["3xl", "4xl"]}
                  as="b"
                >
                  Nenhum filme relacionado!
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
