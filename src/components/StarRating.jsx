import { FullStar, HalfStar, EmptyStar } from "./icons";
const StarRating = ({ rating, colour }) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FullStar key={i} colour={`${colour}`} />);
    } else if (i - roundedRating === 0.5) {
      stars.push(<HalfStar key={i} colour={`${colour}`} />);
    } else {
      stars.push(<EmptyStar key={i} colour={`${colour}`} />);
    }
  }
  return stars;
};

export default StarRating;
