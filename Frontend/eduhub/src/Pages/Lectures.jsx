import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Heading, VStack, HStack, Badge } from "@chakra-ui/react";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios
      .get("https://eduhub-d5dn.onrender.com/lectures")
      .then((response) => {
        setLectures(response.data.lectures);
      })
      .catch((error) => {
        console.error("Error fetching lectures:", error);
      });
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>
        Lectures
      </Heading>
      {lectures.map((lecture) => (
        <Box
          key={lecture._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          m={4}
          boxShadow="0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);"
          bg="white"
          w="100%"
        >
          <Box p={6}>
            <VStack spacing={4} align="start">
              <Text fontWeight="bold" fontSize="xl">
                {lecture.title}{" "}
                <span style={{ fontSize: "10px", color: "#4CAF50" }}>
                  LIVE SESSION
                </span>
              </Text>
              <Text fontSize="lg">{lecture.course}</Text>
              <Text fontSize="md" fontStyle="italic" color="gray.600">
                <Badge variant="outline" >
                  Topic
                </Badge>{" "}
                : &nbsp;
                {lecture.discussions}
              </Text>
              <HStack spacing={8} justify="space-between" w="100%">
                <Text fontSize="sm">
                  <strong>Start Time:</strong>{" "}
                  {new Date(lecture.startTime).toLocaleString()}
                </Text>
                <Text fontSize="sm">
                  <strong>End Time:</strong>{" "}
                  {new Date(lecture.endTime).toLocaleString()}
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Lectures;
