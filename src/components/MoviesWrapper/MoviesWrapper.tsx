import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMovies } from "../../redux/slices/moviesSlice";
import { Movie } from "../../types/movie";

const MoviesWrapper: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sortedMovies, status, error } = useSelector(
    (state: RootState) => state.movies
  );
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  const { field } = useSelector((state: RootState) => state.sort);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [field]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p className="error">🚨🚨Error: {error}</p>;
  if (sortedMovies.length === 0)
    return <p className="error">🚨🚨Movie not found... {error}</p>;

  const getMovieDetails = (movieId: number): void => {
    const movie = sortedMovies.filter((movie) => movie.episode_id === movieId);
    if (movie[0]) {
      setMovieDetails(movie[0]);
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
                onClick={() => getMovieDetails(movie.episode_id)}
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
            {/* <img src="poster.jpg" alt="Movie Poster" /> */}
            <p>{movieDetails.opening_crawl}</p>
          </div>
          <p>Directed by: {movieDetails.director}</p>
          <p>Average rating: ⭐️⭐️⭐️⭐️⭐️⭐️⭐️☆☆</p>
          <div className="ratings">
            <span>IMDB: 78%</span>
            <span>Rotten Tomatoes: 79%</span>
            <span>Metacritic: 68%</span>
          </div>
        </div>
      ) : (
        <div className="movie-detail">Select a movie to see details</div>
      )}
    </div>
  );
};

export default MoviesWrapper;
