import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setQuery, fetchSearchResults } from "../../redux/slices/searchSlice";
import { fetchMovies } from "../../redux/slices/moviesSlice";
import { setSortField } from "../../redux/slices/sortSlice";
import { SortField } from "../../types/movie";
import { toggleTheme } from "../../redux/slices/themeSlice";

const MovieForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, loading, error } = useSelector(
    (state: RootState) => state.search
  );
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const theme = useSelector((state: RootState) => state.theme);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery.trimEnd() === "") {
        dispatch(fetchMovies());
      } else {
        dispatch(fetchSearchResults(debouncedQuery));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    setDebouncedQuery(value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = (e.target.value || "defalut") as SortField;
    dispatch(setSortField(value));
  };

  return (
    <div className="form">
      <select onChange={handleSort}>
        <option value="">Sort By</option>
        <option value="episode_id">Episode</option>
        <option value="release_date">Release Date</option>
        <option value="title">Title</option>
      </select>
      <input
        value={query}
        onChange={handleChange}
        type="text"
        placeholder="Type to filter by title...."
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <label className="theme-switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => dispatch(toggleTheme())}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default MovieForm;
