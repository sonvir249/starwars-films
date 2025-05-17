import MovieForm from "./MovieFrom/MovieFrom";
import MoviesWrapper from "./MoviesWrapper/MoviesWrapper";

function App() {
  return (
    <>
      <section className="form-section">
        <MovieForm />
      </section>
      <section>
        <MoviesWrapper />
      </section>
    </>
  );
}

export default App;
