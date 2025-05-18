import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMovies } from "../../redux/slices/moviesSlice";
import { Movie, OmdbMovieRatings } from "../../types/movie";
import { fetchOmdbMovie } from "../../redux/slices/omdbMovieSlice";
import Rating from "../Rating/Rating";

const MoviesWrapper: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sortedMovies, status, error } = useSelector(
    (state: RootState) => state.movies
  );
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [averageRatings, setAverageRatings] = useState<number>(0);
  const { field } = useSelector((state: RootState) => state.sort);
  const { Search, omdbStatus } = useSelector(
    (state: RootState) => state.omdbMovie
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [field]);

  if (status === "loading") return <p className="loading">Loading...</p>;
  if (status === "failed") return <p className="error">🚨🚨Error: {error}</p>;
  if (sortedMovies.length === 0)
    return <p className="error">🚨🚨Movie not found... {error}</p>;

  const ratings = Search?.Ratings ?? [];
  const totalScore = ratings.reduce((acc: number, cur: OmdbMovieRatings) => {
    const value = cur.Value;

    if (value.includes("/")) {
      const [num, denom] = value.split("/").map(Number);
      if (!isNaN(num) && !isNaN(denom) && denom !== 0) {
        acc += (num / denom) * 10;
      }
    } else if (value.includes("%")) {
      const percent = parseFloat(value.replace("%", ""));
      if (!isNaN(percent)) {
        acc += percent / 10;
      }
    }
    return acc;
  }, 0);

  const handleMovieDetails = (
    movieId: number,
    title: string,
    year: string
  ): void => {
    const movie = sortedMovies.filter((movie) => movie.episode_id === movieId);
    if (movie[0]) {
      setMovieDetails(movie[0]);
      dispatch(fetchOmdbMovie({ title, year }));
      const imdbRatings = ratings.length
        ? parseFloat((totalScore / ratings.length).toFixed(1))
        : 0;
      setAverageRatings(imdbRatings);
    }
  };

  return (
    <div className="movies-section">
      <div className="movies-list">
        {sortedMovies &&
          sortedMovies.map((movie) => {
            return (
              <div
                key={movie.episode_id}
                className="movie-item"
                onClick={() =>
                  handleMovieDetails(
                    movie.episode_id,
                    movie.title,
                    movie.release_date
                  )
                }
              >
                <span>{`Episode ${movie.episode_id}`}</span>
                <span>{`${movie.title}`}</span>
                <span>{`${movie.release_date}`}</span>
              </div>
            );
          })}
      </div>
      {movieDetails ? (
        <div className="movie-detail">
          <h3>{movieDetails.title}</h3>
          <div className="movie-content">
            {omdbStatus === "loading" ? (
              <p>Loading poster...</p>
            ) : (
              <img src={Search?.Poster} alt={Search?.Title} />
            )}
            <p>{movieDetails.opening_crawl}</p>
          </div>
          <div className="movie-director">
            Directed by: {movieDetails.director}
          </div>
          <div className="genre-wrapper">
            {Search?.Genre &&
              Search?.Genre.split(",").map((genre: string, index) => (
                <span className="genre" key={index}>
                  {genre}
                </span>
              ))}
          </div>
          {Search?.Ratings && <Rating averageRating={averageRatings} />}
          <div className="ratings">
            {Search?.Ratings.length &&
              Search?.Ratings.map((rating, index) => {
                return (
                  <span key={index}>
                    {rating.Source}: {rating.Value}
                  </span>
                );
              })}
          </div>
          <div className="imdb-info">
            View it on IMDB -{" "}
            <a
              href={`https://www.imdb.com/title/${Search?.imdbID}`}
              target="tab"
            >
              {Search?.Title}
            </a>
          </div>
        </div>
      ) : (
        <div className="movie-detail">
          <p className="details-message">Select a movie to see details</p>
        </div>
      )}
    </div>
  );
};

export default MoviesWrapper;
