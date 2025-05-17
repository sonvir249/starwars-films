import { useState } from "react";
import MovieForm from "./components/MovieFrom/MovieFrom";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="form-section">
        <MovieForm />
      </section>
      <section>
        <div className="movies-section">
          <MovieList />
          <MovieDetails />
        </div>
      </section>
    </>
  );
}

export default App;
