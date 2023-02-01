//Hooks
import React, { useEffect, useState } from "react";
//Services
import { getMoviesByKeywords, getPopularMovies } from "@/services/movie";
//Components
import MovieCard from "@/components/MovieCard";

//Chakra Ui
import { Flex, Input, Spinner, Text } from "@chakra-ui/react";

export default function Home() {
  //Movies States
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieFilter, setMovieFilter] = React.useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  //Loading State
  const [loading, setLoading] = useState(true);

  // const handleChange = (event) => {(
  //   setMovieFilter(event.target.value),
  // )};

  const handleChange = (event) => {
    let regex = /^[a-zA-Z0-9À-ú ]*$/;
    //this validation is to avoid the white space at the beginning of the string and allow the user to remove all the characters, because
    //whitout else they can't remove the last character
    if (event.target.value === " ") {
      regex = /^[a-zA-Z0-9À-ú][a-zA-Z0-9À-ú ]*$/;
    } else {
      regex = /^[a-zA-Z0-9À-ú ]*$/;
    }
    if (regex.test(event.target.value)) {
      setMovieFilter(event.target.value);
    }
  };

  useEffect(() => {
    const request = async () => {
      const data = await getPopularMovies();
      setPopularMovies(data.results);
      setLoading(false);
    };
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (movieFilter?.length > 0) {
      setLoading(true);
      const lowerFilter = movieFilter.toLowerCase();
      const request = async () => {
        const data = await getMoviesByKeywords(lowerFilter);
        setFilteredMovies(data.results);
        setLoading(false);
      };

      request();
    } else {
      setFilteredMovies([]);
    }
  }, [movieFilter]);

  return (
    <Flex flexDirection="column" p="30px 10px" gap="10">
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        align="center"
        p="0 20px"
      >
        {!movieFilter && (
          <Text fontSize="4xl" as="b">
            Filmes populares:
          </Text>
        )}
        {movieFilter && (
          <Flex flexDirection="column" gap="1">
            <Text fontSize="4xl" as="b">
              Resultados com:
            </Text>
            <Text display={["none", "block"]} mt="1.5">
              {movieFilter}
            </Text>
          </Flex>
        )}
        <Input
          value={movieFilter}
          onChange={handleChange}
          placeholder="Pesquisar"
          size="lg"
          maxW={["100%", "20%"]}
          mt="2"
        />
      </Flex>
      {loading && <Spinner alignSelf="center" size="xl" />}
      {!loading && (
        <Flex
          flexDirection="row"
          justifyContent="space-evenly"
          flexWrap="wrap"
          gap="20px"
        >
          {popularMovies &&
            filteredMovies.length === 0 &&
            movieFilter.length === 0 &&
            popularMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                image={movie.poster_path}
                id={movie.id}
              />
            ))}
          {filteredMovies.length > 0 &&
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                image={movie.poster_path}
                id={movie.id}
              />
            ))}
          {filteredMovies.length === 0 && movieFilter && (
            <Text fontSize={["3xl", "4xl"]} as="b">
              Nenhum filme encontrado!
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
}
