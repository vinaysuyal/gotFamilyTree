import { Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { getAuthToken } from "../utils/authUtils";
import { getBaseUrl, getRequestOptions } from "../utils/apiUtils";

const CharacterCard = ({
  name,
  house,
  actor,
  killers,
  partners,
  imageUrl,
  bookMarked,
  getBookMarks,
}) => {
  return (
    <Box
      display={"flex"}
      borderWidth="1px"
      borderRadius="md"
      position="relative"
      p={4}
      bg="gray.800"
      color="white"
    >
      <Button
        size="sm"
        position="absolute"
        top={0}
        right={7}
        transform="translate(50%, 50%)"
        onClick={() => {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", getAuthToken());

          fetch(
            `${getBaseUrl()}/api/characters/` +
              name +
              "/favourite?favourite=" +
              !bookMarked.find((element) => element.name === name),
            getRequestOptions(myHeaders, "PUT")
          )
            .then((response) => {
              if (response.status === 200) return response.json();
              else throw new Error("Error Occured");
            })
            .then((result) => getBookMarks())
            .catch((error) => console.log("error", error));
        }}
      >
        <StarIcon
          color={
            bookMarked.find((element) => element.name === name)
              ? "blue"
              : "null"
          }
        />
      </Button>
      <Image
        src={imageUrl}
        alt={name}
        maxHeight={200}
        borderRadius="md"
        mb={4}
        marginRight={5}
      />

      <Stack spacing={2}>
        <Text fontWeight="bold">{name}</Text>

        <Text>
          <strong>House(s):</strong> {house.join(", ")}
        </Text>

        <Text>
          <strong>Played by:</strong> {actor}
        </Text>

        <Text>
          <strong>Killed By:</strong> {killers.join(", ")}
        </Text>

        <Text>
          <strong>Partner(s):</strong> {partners.join(", ")}
        </Text>
      </Stack>
    </Box>
  );
};

export default CharacterCard;
