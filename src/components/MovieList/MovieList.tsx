import type React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchMovies } from "../../redux/slices/moviesSlice";
import { useEffect } from "react";

const MovieList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movies, status, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      {movies &&
        movies.map((movie) => {
          return (
            <div key={movie.episode_id} className="movies-wrapper">
              <div>{`Episode ${movie.episode_id}`}</div>
              <div>{`Episode ${movie.title}`}</div>
              <div>{`Episode ${movie.release_date}`}</div>
            </div>
          );
        })}
    </div>
  );
};

export default MovieList;
