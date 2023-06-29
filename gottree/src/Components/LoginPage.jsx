import React, { useContext, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { AuthContext } from "../context/authContext";
import { getBaseUrl } from "../utils/apiUtils";
import { performBasicLogin } from "../utils/authUtils";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const formBackground = useColorModeValue("gray.200", "gray.700");
  const authContext = useContext(AuthContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = await performBasicLogin(username, password);
    authContext.login(
      userInfo.headers,
      userInfo.userName,
      userInfo.authorities
    );

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };
    // let headers = null;
    // fetch(getBaseUrl() + "/auth/login", requestOptions)
    //   .then((response) => response)
    //   .then((result) => {
    //     headers = [...result.headers.entries()].filter((res) =>
    //       res.includes("authorization")
    //     )[0][1];
    //     return result.json();
    //   })
    //   .then((result) =>
    //     authContext.login(headers, result.userName, result.authorities)
    //   )
    //   .catch((error) => console.log("error", error));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.900"
    >
      <Box
        p={8}
        bg={formBackground}
        borderRadius="md"
        shadow="lg"
        maxW="md"
        w="full"
      >
        <Heading as="h1" mb={6} textAlign="center" color="Grey.400">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel color="gray.600">Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              focusBorderColor="yellow.400"
              color="gray.800"
              bg="white"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="gray.600">Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              focusBorderColor="yellow.400"
              color="gray.800"
              bg="white"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="yellow"
            size="lg"
            width="full"
            _hover={{ bg: "yellow.400" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
