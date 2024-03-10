import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    course: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("student");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  // Listen for changes in localStorage and update UI
  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = localStorage.getItem("student");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save changes to API
  const saveChanges = async () => {
    try {
      const { email, name, contact, course } = userData;
      const response = await axios.patch(
        "https://eduhub-d5dn.onrender.com/students/profile",
        {
          email,
          name,
          contact,
          course,
        }
      );
      const updatedStudentData = response.data.student;
      // Update name in localStorage
      localStorage.setItem("student", JSON.stringify(updatedStudentData));
      // Update name in state
      setUserData(updatedStudentData);
      toast({
        title: "Changes Saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Failed to save changes",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsEditing(false);
  };

  // Handle logout
  const handleLogout = async () => {
    localStorage.removeItem("student");
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.href = "/";
  };

  return (
    <Box
      boxShadow="0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);"
      w={"50%"}
      m={"auto"}
      p={4}
    >
      <Heading mb={4}>Profile</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contact</FormLabel>
          <Input
            type="text"
            name="contact"
            value={userData.contact}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            Course
            <br />
            <Badge fontSize={"15px"} variant={"outline"} colorScheme="blue">
              {userData.course}
            </Badge>
          </FormLabel>
        </FormControl>
      </Stack>
      {isEditing ? (
        <Button mt={4} onClick={saveChanges} colorScheme="blue">
          Save Changes
        </Button>
      ) : (
        <Button mt={4} onClick={() => setIsEditing(true)} colorScheme="blue">
          Edit
        </Button>
      )}
      <Button mt={4} ml={2} onClick={handleLogout} colorScheme="red">
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
