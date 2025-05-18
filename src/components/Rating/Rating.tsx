import React, { useMemo } from "react";

type RatingProps = {
  averageRating: number;
};

const Rating: React.FC<RatingProps> = ({ averageRating }: RatingProps) => {
  // Memoize calculated star counts
  const { fullStars, hasHalfStar, emptyStars } = useMemo(() => {
    const outOf = 10;
    const starCount = 5;
    const normalized = (averageRating / outOf) * starCount;

    const full = Math.floor(normalized);
    const half = normalized - full >= 0.5;
    const empty = starCount - full - (half ? 1 : 0);

    return {
      fullStars: full,
      hasHalfStar: half,
      emptyStars: empty,
    };
  }, [averageRating]);

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
