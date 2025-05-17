import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMovies } from "../../redux/slices/moviesSlice";

const MoviesWrapper: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { sortedMovies, status, error } = useSelector(
    (state: RootState) => state.movies
  );

  const { field } = useSelector((state: RootState) => state.sort);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [field]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p className="error">🚨🚨Error: {error}</p>;
  if (sortedMovies.length === 0)
    return <p className="error">🚨🚨Movie not found... {error}</p>;

  return (
    <div className="movies-section">
      <div className="movies-list">
        {sortedMovies &&
          sortedMovies.map((movie) => {
            return (
              <div key={movie.episode_id} className="movie-item">
                <span>{`Episode ${movie.episode_id}`}</span>
                <span>{`${movie.title}`}</span>
                <span>{`${movie.release_date}`}</span>
              </div>
            );
          })}
      </div>
      <div className="movie-detail">
        <h3>Episode III - Revenge of the Sith</h3>
        <div className="movie-content">
          <img src="poster.jpg" alt="Movie Poster" />
          <p>War! The Republic is crumbling...</p>
        </div>
        <p>Directed by: Rick McCallum</p>
        <p>Average rating: ⭐️⭐️⭐️⭐️⭐️⭐️⭐️☆☆</p>
        <div className="ratings">
          <span>IMDB: 78%</span>
          <span>Rotten Tomatoes: 79%</span>
          <span>Metacritic: 68%</span>
        </div>
      </div>
    </div>
  );
};

export default MoviesWrapper;
