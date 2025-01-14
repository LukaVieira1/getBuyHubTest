import { motion } from "framer-motion";
import { ICastMember } from "@/types/movie";

interface CastMemberProps {
  member: ICastMember;
}

export default function CastMember({ member }: CastMemberProps) {
  return (
    <motion.div
      className="flex-none w-[160px] p-2"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800">
        {member.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
            alt={member.name}
            className="w-full aspect-[2/3] object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-500">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{member.name}</h3>
          <p className="text-gray-400 text-xs line-clamp-1">
            {member.character}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
