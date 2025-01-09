import { IMovieResponse, IMovieDetail } from "@/types/movie";
import { api, tmdbApiKey } from "@/providers/api";

export async function getPopularMovies(): Promise<IMovieResponse> {
  try {
    const { data } = await api.get<IMovieResponse>(`/movie/popular`, {
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
