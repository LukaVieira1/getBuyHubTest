import { useMemo } from "react";

interface MoviePosterProps {
  title: string;
  posterPath: string | null;
  className?: string;
}

export default function MoviePoster({
  title,
  posterPath,
  className = "",
}: MoviePosterProps) {
  const initials = useMemo(() => {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  }, [title]);

  if (posterPath) {
    return (
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}
    >
      <span className="text-4xl font-bold text-gray-400">{initials}</span>
    </div>
  );
}
