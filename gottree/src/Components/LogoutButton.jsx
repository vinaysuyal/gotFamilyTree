import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const LogoutButton = ({ onLogout }) => {
  const buttonHoverColor = useColorModeValue("gray.700", "gray.300");
  return (
    <Box position="fixed" top="2rem" right="2rem" p="1rem">
      <Button
        onClick={onLogout}
        color={"white"}
        _hover={{ bg: buttonHoverColor }}
        variant="ghost"
      >
        Logout
      </Button>
    </Box>
  );
};

export default LogoutButton;
