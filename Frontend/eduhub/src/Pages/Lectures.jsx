import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Badge,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [studentCourse, setStudentCourse] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const lecturesPerPage = 7;

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent) {
      setStudentCourse(storedStudent.course);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://eduhub-d5dn.onrender.com/lectures")
      .then((response) => {
        let filteredLectures = response.data.lectures;
        if (loggedIn) {
          filteredLectures = filteredLectures.filter(
            (lecture) => lecture.course === studentCourse
          );
        }
        if (searchTerm) {
          filteredLectures = filteredLectures.filter((lecture) =>
            lecture.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        if (selectedCourse !== "All") {
          filteredLectures = filteredLectures.filter(
            (lecture) => lecture.course === selectedCourse
          );
        }
        setLectures(filteredLectures);
      })
      .catch((error) => {
        console.error("Error fetching lectures:", error);
      });
  }, [loggedIn, studentCourse, searchTerm, selectedCourse]);

  // Pagination
  const indexOfLastLecture = currentPage * lecturesPerPage;
  const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
  const currentLectures = lectures.slice(
    indexOfFirstLecture,
    indexOfLastLecture
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>
        Lectures
      </Heading>
      <HStack spacing={4} mb={4} justify="center">
        <Input
          w={"30%"}
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          w={"30%"}
          placeholder="Filter by course"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Data Science">Data Science</option>
        </Select>
      </HStack>
      {currentLectures.map((lecture) => (
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
              {lecture.course === "Frontend" && (
                <Badge fontSize={"md"} colorScheme="green">
                  {lecture.course}
                </Badge>
              )}
              {lecture.course === "Backend" && (
                <Badge fontSize={"md"} colorScheme="red">
                  {lecture.course}
                </Badge>
              )}
              {lecture.course === "Data Science" && (
                <Badge fontSize={"md"} colorScheme="purple">
                  {lecture.course}
                </Badge>
              )}
              <Text fontSize="md" fontStyle="italic" color="gray.600">
                <Badge variant="outline">Topic</Badge> : &nbsp;
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
      {/* Pagination */}
      <Box mt={8} textAlign="center">
        {lectures.length > lecturesPerPage && (
          <HStack spacing={4} justify="center">
            {Array.from({
              length: Math.ceil(lectures.length / lecturesPerPage),
            }).map((_, index) => (
              <Button
                key={index}
                variant="outline"
                colorScheme="tomato"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default Lectures;
