import { ICastMember } from "@/types/movie";

export const removeNonActors = (actors: ICastMember[]) => {
  return actors.filter((actor) => actor.known_for_department === "Acting");
};
