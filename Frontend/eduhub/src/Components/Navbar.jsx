import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("student");
    if (storedData) {
      setStudentData(JSON.parse(storedData));
    }
  }, []);

  const routes = [
    { path: "/lectures", name: "Lectures" },
    { path: "/assignments", name: "Assignments" },
    { path: "/quiz", name: "Quiz" },
    { path: "/practice", name: "Practice" },
  ];

  return (
    <Box
      h={20}
      padding={7}
      alignItems={"center"}
      m={"auto"}
      boxShadow="0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)}"
      bg="#ECEFF1"
      p={4}
    >
      <Flex alignItems="center">
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <Heading style={{ color: "crimson" }}>EduHub</Heading>
        </NavLink>
        <Spacer />
        <Flex gap={20}>
          {routes.map((route, index) => (
            <NavLink
              key={index}
              to={route.path}
              style={({ isActive }) => ({
                color: isActive ? "crimson" : "black",
                fontSize: "18px",
              })}
            >
              {route.name}
            </NavLink>
          ))}
          {studentData && (
            <VStack>
              <Text style={{ color: "#1E88E5", fontSize: "14px" }}>
                Hello :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {studentData.name}
                </span>
              </Text>
              <NavLink
                to={"/profile"}
                style={({ isActive }) => ({
                  color: isActive ? "crimson" : "black",
                  fontSize: "12px",
                  textDecoration: "none", // Remove underline
                  cursor: "pointer", // Show pointer on hover
                })}
              >
                View Profile
              </NavLink>
            </VStack>
          )}
          {!studentData && (
            <NavLink
              to={"/login"}
              style={({ isActive }) => ({
                color: isActive ? "crimson" : "black",
                fontSize: "18px",
              })}
            >
              <AiOutlineUser style={{ fontSize: "24px" }} />
            </NavLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
