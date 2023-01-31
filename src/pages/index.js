//Hooks
import React, { useEffect, useState } from "react";
//Services
import { getMoviesByKeywords, getPopularMovies } from "@/services/movie";
//Components
import MovieCard from "@/components/MovieCard";

//Chakra Ui
import { Flex, Input, Text } from "@chakra-ui/react";

export default function Home() {
  //Movies States
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieFilter, setMovieFilter] = React.useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleChange = (event) => setMovieFilter(event.target.value);

  useEffect(() => {
    const request = async () => {
      const data = await getPopularMovies();
      setPopularMovies(data.results);
    };
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (movieFilter.length > 2) {
      const lowerFilter = movieFilter.toLowerCase();
      const request = async () => {
        const data = await getMoviesByKeywords(lowerFilter);
        setFilteredMovies(data.results);
      };
      request();
    } else {
      setFilteredMovies([]);
    }
  }, [movieFilter]);

  return (
    <Flex flexDirection="column" p="30px 10px" gap="10">
      <Flex justifyContent="space-between" align="center">
        {!movieFilter && (
          <Text fontSize="4xl" as="b">
            Filmes populares:
          </Text>
        )}
        {movieFilter && (
          <Flex gap="1" align="center">
            <Text fontSize="4xl" as="b">
              Resultados com:
            </Text>
            <Text mt="1.5">{movieFilter}</Text>
          </Flex>
        )}
        <Input
          value={movieFilter}
          onChange={handleChange}
          placeholder="Você pode pesquisar por um filme aqui"
          size="sm"
          maxW="20%"
        />
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-evenly"
        flexWrap="wrap"
        gap="20px"
      >
        {popularMovies &&
          filteredMovies.length === 0 &&
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
      </Flex>
    </Flex>
  );
}
