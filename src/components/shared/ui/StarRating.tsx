import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i + 1 <= Math.round(rating)
              ? "fill-primary text-primary"
              : "text-text/20"
          }`}
        />
      ))}
    </div>
  );
}
