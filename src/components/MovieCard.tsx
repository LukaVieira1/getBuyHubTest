import Link from "next/link";
import { formatShortDate } from "@/utils/dateFormat";

interface MovieCardProps {
  title: string;
  releaseDate: string;
  image: string | null;
  id: number;
}

export default function MovieCard({
  title,
  releaseDate,
  image,
  id,
}: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`}>
      <div className="flex flex-col max-w-[200px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={
            image !== null
              ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2${image}`
              : "https://picsum.photos/200"
          }
          alt={title}
          className="w-full h-[278px] object-cover"
        />
        <div className="p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
          <p className="text-gray-600 text-sm">
            Lançamento: {formatShortDate(releaseDate)}
          </p>
        </div>
      </div>
    </Link>
  );
}
