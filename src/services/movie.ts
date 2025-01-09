import { IMovieResponse, IMovieDetail } from "@/types/movie";

import { client, apiKey } from "@/providers/client";

export async function getPopularMovies(): Promise<IMovieResponse> {
  const response = await fetch(
    `${client}/3/movie/popular?api_key=${apiKey}&language=pt-BR`
  );
  return response.json();
}

export async function getMoviesByKeywords(
  query: string
): Promise<IMovieResponse> {
  const response = await fetch(
    `${client}/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${query}`
  );
  return response.json();
}

export async function getMovie(id: string): Promise<IMovieDetail> {
  const response = await fetch(
    `${client}/3/movie/${id}?api_key=${apiKey}&language=pt-BR`
  );
  return response.json();
}

export async function getSimilarMovies(id: string): Promise<IMovieResponse> {
  const response = await fetch(
    `${client}/3/movie/${id}/similar?api_key=${apiKey}&language=pt-BR`
  );
  return response.json();
}
