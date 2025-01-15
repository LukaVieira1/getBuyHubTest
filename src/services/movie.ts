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
  page: number = 1,
  language: string
): Promise<IMovieResponse> {
  try {
    const { data } = await api.get<IMovieResponse>(`/movie/popular`, {
      params: {
        language,
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
  query: string,
  language: string
): Promise<IMovieResponse> {
  try {
    const { data } = await api.get<IMovieResponse>("/search/movie", {
      params: {
        query,
        language,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovie(
  id: string,
  language: string
): Promise<IMovieDetail> {
  try {
    const { data } = await api.get<IMovieDetail>(`/movie/${id}`, {
      params: {
        language,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSimilarMovies(
  id: string,
  language: string
): Promise<IMovieResponse> {
  try {
    const { data } = await api.get<IMovieResponse>(`/movie/${id}/similar`, {
      params: {
        language,
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
  page: number = 1,
  language: string
): Promise<IMovieResponse> {
  const genreId = getGenderId(genre);
  try {
    const { data } = await api.get<IMovieResponse>(`/discover/movie`, {
      params: {
        with_genres: genreId,
        language,
        page,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovieTrailer(
  id: number,
  language: string
): Promise<IMovieVideo> {
  try {
    const { data } = await api.get<IMovieVideosResponse>(
      `/movie/${id}/videos`,
      {
        params: {
          language,
        },
      }
    );
    return data.results[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMovieCredits(
  id: string,
  language: string
): Promise<ICastMember[]> {
  try {
    const { data } = await api.get<ICastResponse>(`/movie/${id}/credits`, {
      params: {
        language,
      },
    });
    return data.cast;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
