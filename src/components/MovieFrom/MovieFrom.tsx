import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setQuery, fetchSearchResults } from "../../redux/slices/searchSlice";

const MovieForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery) {
        dispatch(fetchSearchResults(debouncedQuery));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedQuery, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    setDebouncedQuery(value);
  };

  return (
    <div className="form">
      <select>
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
    </div>
  );
};

export default MovieForm;
