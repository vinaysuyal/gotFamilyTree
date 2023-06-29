import { Box, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getBaseUrl, getRequestOptions } from "../utils/apiUtils";
import { getAuthToken } from "../utils/authUtils";

function Dropdown({ createNodesAndEdges, bookMarked }) {
  const [selectedHouse, setSelectedHouse] = useState("");
  const [houseOptions, setHouseOptions] = useState([]);
  useEffect(() => {
    if (houseOptions.length) return;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getAuthToken());
    fetch(getBaseUrl() + "/api/characters/houses", getRequestOptions(myHeaders))
      .then((response) => response.json())
      .then((result) => setHouseOptions(result))
      .catch((error) => console.log("error", error));
  }, [houseOptions]);

  useEffect(() => {
    if (!selectedHouse) return;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getAuthToken());
    fetch(
      getBaseUrl() + "/api/characters/familyTree/" + selectedHouse,
      getRequestOptions(myHeaders)
    )
      .then((response) => response.json())
      .then((result) => {
        createNodesAndEdges(result);
      })
      .catch((error) => console.log("error", error));
  }, [selectedHouse]);

  const handleHouseChange = (event) => {
    setSelectedHouse(event.target.value);
  };

  return (
    <Box p={4} bg="#1c1b29">
      <Select
        placeholder="Select a house"
        color="grey"
        fontWeight="bold"
        bg="#27263e"
        borderColor="#1c1b29"
        _focus={{ borderColor: "#1c1b29", boxShadow: "none" }}
        value={selectedHouse}
        onChange={handleHouseChange}
      >
        {houseOptions.map((house) => (
          <option key={house} value={house}>
            {house}
          </option>
        ))}
      </Select>
    </Box>
  );
}

export default Dropdown;
