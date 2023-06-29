import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import UpdatePrompter from "../UpdatePrompter/UpdatePrompter";
import image from "./background.png";
import Dropdown from "../Dropdown";
import { GraphCanvas, darkTheme } from "reagraph";
import { useContext, useEffect, useState } from "react";
import CharacterCard from "../CharacterCard";
import { getAuthToken } from "../../utils/authUtils";
import { getBaseUrl, getRequestOptions } from "../../utils/apiUtils";
import { AuthContext } from "../../context/authContext";
import LogoutButton from "../LogoutButton";

function GameOfThronesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [characterCardVisible, setCharacterCardVisible] = useState(false);
  const [bookMarked, setBookMarked] = useState([]);
  const authContext = useContext(AuthContext);
  const onClose = () => {
    setIsOpen(false);
  };
  const [character, setSelectedCharacter] = useState({});
  useEffect(() => {
    getBookMarks();
  }, []);
  useEffect(() => {
    if (nodes.length) createNodesAndEdges(nodes);
  }, [bookMarked]);
  const loadNodesAndEdges = (nodes, edges) => {
    setNodes(nodes);
    setEdges(edges);
    setIsOpen(true);
  };
  function createNodesAndEdges(data) {
    const nodes = [];
    const edges = [];
    data.forEach((element) => {
      const newNode = {
        ...element,
        id: element.name,
        label: element.name,
        size: bookMarked.find(
          (bookMarkedElement) => bookMarkedElement.name === element.name
        )
          ? 40
          : 20,
        icon:
          element.thumbnailUrl ||
          element.imageUrl ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAANlBMVEWVu9////+Ot92JtNz3+vy80+qcv+Gvy+bv9PqmxeShwuLh6/Xp8Pi30On1+PzP3/DY5fLF2e2yVl3FAAADc0lEQVRoge2b0ZKrIAyGIYiIKMj7v+zRurXd1kpiE52z43e5Y/cXCElIUKmLi4sLLPDE0dIGXE6ha2JsupCyG/9wnHhtO/1CZ2tzjHg7VK/iE9VQHzEDaU17JklrQ918Vte6kZ0AcFviE05QH/qSuta9mH557KLjryNGvqpl1E3AqGsdZBwAYuFnegl1g5r6iSgxfJTdzTh+dUCu/EQQMH68utbs4mAp8pZ7+DBQ5Af22d8MNa803Ortaoz/RNUyy3uKutaeWZ6w6ye4dz7a484w+13avmPfeZBp8vlvyZ88+VTTY3Z7J2+8k93OyU735JADb2faLbo/Fu9PznZUS5FntzylCKZf8auTEm0BeULQYQ44N2q8vMQZ16AXv5I448FGTek3SaTAgI463PFmxiDdfiNUX0SmHCLVhQnU8Nmj3R2c3+f39wuI4YsNXqGMX8bsZ8p7X2bPL/qF8lYUrqkXwr5AoP/Fdl1Xsp79o79hfv6Adga0H9Y/trLqy39fzXqHt8d4xesh/lgW+LfMK9wnvo0CLSUw7qZ4n19TpycP2KR7Fw1uOyM4zrYegEv3VGexbQDlbU4pW6+WNuayL6rkeHqbo0p6trX0tLYvHVT41WSLyX9tBqDsa5hpPm1ucG+P2u9ewNi1/DK070sLpl07CFT2m9Tn07G2yeMbLK8Ao3b+FIu7/epbqXUcrPPtiHd22ApEu09c5SN9NVJ8aN/48Xl9iV05ALGYtMWODIhWTdlmR62FWMjbhlzmo9VySpBrPcCprjVVnljDLUE8ePHOPXn2gVRDLVMRZ59XndhWpXYPypAOntxLT118Rpc3Q4o7NbPlES+UEGp4WAjy1MYRBkJziS/UPyAEfUr5GAvhPgeQGjc4Grw87nYUjYi3PcY86wE+42LNdO6gMx5+jz+B9voS+46w8/gDzgQ66Bj2gDPRYQ+b+KtxFNDX6Eqly53yaL/DHm4n0Cdd/mh/k8e6PdpVAbQ8tt4r4nPxXpfUrMaDrnafa3oyXg+f7kjoD2XZBz6wLkAViPWVte8v9tLZHTVuMMoypJzBqt3lbTA+ffEKIflvK+vjz30O5NS3CdlzNTYAVOtyiChzrGLIrlXcnyqBgdr1KWxE4xhS72rJL5QAjFG+zzkNt2+ibl9FDSnn3itjjvo6C944Rvfi4uL/5x9Fwych99sNQwAAAABJRU5ErkJggg==",
      };
      nodes.push(newNode);
      element.children.forEach((child) => {
        edges.push({
          id: element.name + "->" + child,
          source: element.name,
          target: child,
        });
      });
    });
    loadNodesAndEdges(nodes, edges);
  }

  function getBookMarks() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", getAuthToken());

    fetch(
      getBaseUrl() + "/api/characters/getFavourites",
      getRequestOptions(myHeaders)
    )
      .then((response) => response.json())
      .then((result) => {
        setBookMarked(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  const onLogOut = () => {
    authContext.logout();
  };

  return (
    <Box
      bgImage={image}
      bgSize="cover"
      bgPosition="top"
      minHeight="100vh"
      minWidth="100vw"
      display="flex"
      flexFlow="column"
      alignItems="center"
      justifyContent="center"
    >
      <>
        {authContext.userAuth.includes("admin") && <UpdatePrompter />}
        <Dropdown
          bookMarked={bookMarked}
          createNodesAndEdges={createNodesAndEdges}
        />
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent bg="rgba(0, 0, 0, 0.8)">
            <ModalBody p={0} h="100vh">
              <div
                style={{
                  width: "100%",
                  height: "95vh",
                  position: "relative",
                  opacity: "0.7",
                }}
              >
                <Box position={"fixed"} bottom="2">
                  <Text color="white" fontWeight="bold" textAlign="center">
                    Press escape to close the Family Tree
                  </Text>
                </Box>
                <GraphCanvas
                  draggable
                  labelType="nodes"
                  edgeArrowPosition="mid"
                  layoutType="treeTd2d"
                  layoutOverrides={{
                    nodeStrength: 0,
                    linkDistance: 100,
                    clusterPadding: 20,
                    nodeLevelRatio: 1,
                  }}
                  onNodeClick={(node) => {
                    const requiredCharacter = nodes.find(
                      (character) => character.id === node.id
                    );
                    setSelectedCharacter({
                      ...requiredCharacter,
                    });
                    setCharacterCardVisible(true);
                  }}
                  theme={darkTheme}
                  nodes={nodes}
                  edges={edges}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        {characterCardVisible && (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setCharacterCardVisible(false);
            }}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent bg="gray.800" color="white">
              <ModalHeader>Character Information</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <CharacterCard
                  {...character}
                  bookMarked={bookMarked}
                  getBookMarks={getBookMarks}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        <LogoutButton onLogout={onLogOut} />
      </>
    </Box>
  );
}

export default GameOfThronesPage;
