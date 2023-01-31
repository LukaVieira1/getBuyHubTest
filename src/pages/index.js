//Hooks
import { useEffect, useState } from "react";
//Services
import { getPopularMovies } from "@/services/movie";
//Components
import MovieCard from "@/components/MovieCard";

//Chakra Ui
import { Flex } from "@chakra-ui/react";

export default function Home() {
  //Movies States
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const request = async () => {
      const data = await getPopularMovies();
      setPopularMovies(data.results);
    };
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex
        flexDirection="row"
        justifyContent="space-evenly"
        flexWrap="wrap"
        gap="20px"
        m="30px 0"
      >
        {popularMovies &&
          popularMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              image={movie.poster_path}
              id={movie.id}
            />
          ))}
      </Flex>
    </>
  );
}
