export interface IMovieResponse {
  results: IMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetail extends IMovie {
  belongs_to_collection: ICollection | null;
  budget: number;
  genres: IGenre[];
  homepage: string | null;
  imdb_id: string | null;
  origin_country: string[];
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string | null;
}

interface ICollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface IGenre {
  id: number;
  name: string;
}

interface IProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface ISpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type Genre =
  | "Action"
  | "Adventure"
  | "Animation"
  | "Comedy"
  | "Crime"
  | "Documentary"
  | "Drama"
  | "Family"
  | "Fantasy"
  | "History"
  | "Horror"
  | "Music"
  | "Mystery"
  | "Romance"
  | "Science Fiction"
  | "TV Movie"
  | "Thriller"
  | "War"
  | "Western";
