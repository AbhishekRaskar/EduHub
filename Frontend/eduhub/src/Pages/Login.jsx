import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
  };

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://eduhub-d5dn.onrender.com/students/login",
        userData
      );
      console.log("Login Response:", response.data);
      // localStorage.setItem("student", response.data.student);

      // Assuming response.data.success indicates successful login
      if (response.status === 200) {
        // Perform actions on successful login
        toast({
          position: "top",
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        // window.location.href = "/lectures";
      } else {
        // Handle login failure
        toast({
          position: "top",
          title: "Login failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle error from API
      toast({
        position: "top",
        title: "Login failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize={"4xl"} color={"#DC143C"}>
            Login
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box rounded={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel color={"black"}>Email address</FormLabel>
                <Input
                  type="email"
                  color={"#DC143C"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={"black"}>Password</FormLabel>
                <Input
                  type="password"
                  color={"#DC143C"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  size={"lg"}
                  bg={"#DC143C"}
                  color={"white"}
                  _hover={{
                    bg: "#DC143C",
                  }}
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
            <br />
            <Text align={"center"} color={"black"}>
              New here? Join us!
              <Link
                to="/signup"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#DC143C",
                  color: "#DC143C",
                }}
              >
                <br />
                SignUp
              </Link>
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          {/* You can add additional footer content here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;
