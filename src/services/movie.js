import { client, apiKey } from "@/providers/client.js";

export const getPopularMovies = async () => {
  try {
    const response = await (
      await fetch(`${client}/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
    ).json();
    return response;
  } catch (error) {
    return error;
  }
};

export const getMovie = async (movieId) => {
  try {
    const response = await (
      await fetch(
        `${client}/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
      )
    ).json();
    return response;
  } catch (error) {
    return error;
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await (
      await fetch(
        `${client}/3/movie/${movieId}/similar?api_key=${apiKey}&language=pt-BR`
      )
    ).json();

    return response;
  } catch (error) {
    return error;
  }
};
