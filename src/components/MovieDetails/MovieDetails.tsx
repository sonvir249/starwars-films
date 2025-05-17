import type React from "react";

const MovieDetails: React.FC = () => {
  return (
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
  );
};

export default MovieDetails;
