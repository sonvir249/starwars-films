export type Movie = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  release_date: string;
  producer: string;
};

export type AsyncState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type Movies = {
  movies: Movie[];
  sortedMovies: Movie[];
};

export type MovieState = { movie: Movie | {} } & AsyncState;

export type MoviesState = Movies & AsyncState;

export type SortField = "defalut" | "episode_id" | "release_date" | "title";

export interface SortState {
  field: SortField;
  ascending: boolean;
}

export type ThemeState = "light" | "dark";
