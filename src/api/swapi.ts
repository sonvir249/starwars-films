import { Movie } from "../types/movie";

const OMDB_API_KEY = "b9a5e69d";
export const API_BASE_URL = "https://swapi.py4e.com/api/films";
export const OMDB_API_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

export const fetchAllMovies = async (): Promise<Movie[]> => {
  const res = await fetch(`${API_BASE_URL}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  const result = data.results;
  return result;
};

export const fetchSingleMovie = async (id: number): Promise<Movie> => {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  const data = await res.json();

  return data.results;
};

export const searchMovie = async (query: string): Promise<Movie> => {
  const res = await fetch(`${API_BASE_URL}/?search=${query}`);
  if (!res.ok) throw new Error("Failed to search movie");
  const data = await res.json();

  return data.results;
};

export const omdbSearchMovie = async (query: string): Promise<Movie> => {
  const res = await fetch(`${API_BASE_URL}/?search=${query}`);
  if (!res.ok) throw new Error("Failed to search movie");
  const data = await res.json();

  return data.results;
};
