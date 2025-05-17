import React from "react";

type RatingProps = {
  averageRating: number;
};

const Rating: React.FC<RatingProps> = ({ averageRating }: RatingProps) => {
  const outOf = 10;
  const starCount = 5;
  const normalized = (averageRating / outOf) * starCount;
  const fullStars = Math.floor(normalized);
  const hasHalfStar = normalized - fullStars >= 0.5;
  const emptyStars = starCount - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <span className="ratings-wrapper">
      <span>Average rating: </span>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span className="full-star" key={`full-${i}`}>
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span className="half-star" key="half">
          <span className="half-star-width">★</span>
          <span className="half-star-color">★</span>
        </span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span className="empty-star" key={`empty-${i}`}>
          ★
        </span>
      ))}
    </span>
  );
};

export default Rating;
