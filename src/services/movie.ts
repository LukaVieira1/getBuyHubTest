"use client";

import {
  IMovieResponse,
  IMovieDetail,
  Genre,
  IMovieVideosResponse,
  IMovieVideo,
  ICastResponse,
  ICastMember,
} from "@/types/movie";
import { api } from "@/providers/api";
import { getGenderId } from "@/utils/moviesGenders";

export async function getPopularMovies(
  page: number = 1
): Promise<IMovieResponse> {
  try {
    const { data } = await api.get<IMovieResponse>(`/movie/popular`, {
      params: {
        language: "pt-BR",
        page,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMoviesByKeywords(
  query: string
): Promise<IMovieResponse> {
  try {
    const { data } = await api.get<IMovieResponse>("/search/movie", {
      params: {
        query,
        language: "pt-BR",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovie(id: string): Promise<IMovieDetail> {
  try {
    const { data } = await api.get<IMovieDetail>(`/movie/${id}`, {
      params: {
        language: "pt-BR",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSimilarMovies(id: string): Promise<IMovieResponse> {
  try {
    const { data } = await api.get<IMovieResponse>(`/movie/${id}/similar`, {
      params: {
        language: "pt-BR",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMoviesByGenre(
  genre: Genre,
  page: number = 1
): Promise<IMovieResponse> {
  const genreId = getGenderId(genre);
  try {
    const { data } = await api.get<IMovieResponse>(`/discover/movie`, {
      params: {
        with_genres: genreId,
        language: "pt-BR",
        page,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovieTrailer(id: number): Promise<IMovieVideo> {
  try {
    const { data } = await api.get<IMovieVideosResponse>(
      `/movie/${id}/videos`,
      {
        params: {
          language: "pt-BR",
        },
      }
    );
    return data.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovieCredits(id: string): Promise<ICastMember[]> {
  try {
    const { data } = await api.get<ICastResponse>(`/movie/${id}/credits`, {
      params: {
        language: "pt-BR",
      },
    });
    return data.cast;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
