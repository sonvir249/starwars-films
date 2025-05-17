export type Movie = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  release_date: string;
  producer: string;
};

type AsyncState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type Movies = {
  movies: Movie[];
};

export type MovieState = { movie: Movie | {} } & AsyncState;

export type MoviesState = Movies & AsyncState;
