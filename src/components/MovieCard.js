//Chakra Ui
import { Card, CardBody, Image, Stack, Heading, Text } from "@chakra-ui/react";

//Utils
import { formatLongDate } from "@/utils/dateFormat";

//Components
import Link from "next/link";

const MovieCard = (props) => {
  const { title, releaseDate, image, id } = props;
  return (
    <>
      <Link href={`/movie/${id}`}>
        <Card variant="filled" borderColor="blue" maxW="sm">
          <CardBody>
            <Image
              src={
                image !== null
                  ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2${image}`
                  : "https://picsum.photos/200"
              }
              width="278px"
              height="278px"
              alt={title}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading maxW="278px" size="md">
                {title}
              </Heading>
              <Text>Data de lançamento: {formatLongDate(releaseDate)}</Text>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};

export default MovieCard;
