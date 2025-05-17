import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMovies } from "../../redux/slices/moviesSlice";

const MovieList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movies, status, error } = useSelector(
    (state: RootState) => state.movies
  );

  const { field } = useSelector((state: RootState) => state.sort);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [field]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="movies-list">
      {movies &&
        movies.map((movie) => {
          return (
            <div key={movie.episode_id} className="movie-item">
              <span>{`Episode ${movie.episode_id}`}</span>
              <span>{`${movie.title}`}</span>
              <span>{`${movie.release_date}`}</span>
            </div>
          );
        })}
    </div>
  );
};

export default MovieList;
