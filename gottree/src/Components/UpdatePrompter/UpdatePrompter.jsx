import { Button } from "@chakra-ui/react";
import { getBaseUrl, getRequestOptions } from "../../utils/apiUtils";
import { getAuthToken } from "../../utils/authUtils";

function UpdatePrompter() {
  const requestResetFromServer = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", getAuthToken());

    var raw = JSON.stringify(data);
    fetch(getBaseUrl() + "/api/characters/save", {
      ...getRequestOptions(myHeaders),
      body: raw,
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleResetClick = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://raw.githubusercontent.com/jeffreylancaster/game-of-thrones/master/data/characters.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>
        data.characters.map((element) => {
          return {
            name: element.characterName,
            actor: element.actorName || "",
            children: element.parentOf || [],
            killers: element.killedBy || [],
            partners: element.marriedEngaged || [],
            house:
              (typeof element.houseName === "string"
                ? [element.houseName]
                : element.houseName) || [],
            imageUrl: element.characterImageFull || "",
            thumbnailUrl: element.characterImageThumb || "",
            royal: element.royal === undefined ? false : element.royal,
          };
        })
      )
      .then((result) => requestResetFromServer(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <Button
      colorScheme="blackAlpha"
      size="md"
      fontWeight="bold"
      textTransform="uppercase"
      onClick={handleResetClick}
      _hover={{ bgGradient: "linear(to bottom, #27263e, #1c1b29)" }}
      _focus={{ outline: "none" }}
      _active={{ transform: "scale(0.95)" }}
    >
      Reforge the Realm
    </Button>
  );
}

export default UpdatePrompter;
