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

export type OmdbMovieRatings = {
  Source: "Internet Movie Database" | "Rotten Tomatoes" | "Metacritic";
  Value: string;
};

export type OmdbMovieSearch = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Hope: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OmdbMovieRatings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export type OmdbSearchResult = {
  Search: OmdbMovieSearch | null;
};

export type OmdbSearchResultState = OmdbSearchResult & {
  omdbStatus: "idle" | "loading" | "succeeded" | "failed";
  omdbError: string | null;
};

export type OmdbSearchParams = {
  title: string;
  year: string;
};
