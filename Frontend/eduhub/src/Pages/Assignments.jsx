import React from "react";
import {
  Box,
  Button,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";

const Assignments = () => {
  // Array of hardcoded assignments
  const assignments = [
    {
      title: "MongoDB Assignment",
      description:
        "Create a MongoDB database and design a schema for a blog application.",
    },
    {
      title: "Express.js Assignment",
      description:
        "Build a simple RESTful API using Express.js for a todo list application.",
    },
    {
      title: "React.js Assignment",
      description:
        "Develop a frontend interface using React.js for the todo list application.",
    },
    {
      title: "Node.js Assignment",
      description:
        "Implement server-side logic using Node.js to handle CRUD operations for the todo list.",
    },
    {
      title: "JWT Authentication with Node.js",
      description:
        "Implement JWT-based authentication for a MERN stack application.",
    },
    {
      title: "React Router Assignment",
      description:
        "Implement client-side routing using React Router for a multi-page React application.",
    },
    {
      title: "Redux Assignment",
      description:
        "Integrate Redux for state management in a React application.",
    },
    {
      title: "Mongoose Assignment",
      description:
        "Use Mongoose to define schemas and interact with MongoDB in a Node.js application.",
    },
    {
      title: "File Upload with Node.js",
      description:
        "Implement file upload functionality using Node.js and Multer middleware.",
    },
    {
      title: "Authentication with Passport.js",
      description:
        "Integrate Passport.js for authentication in a Node.js application.",
    },
    {
      title: "Form Validation with React Hook Form",
      description:
        "Implement form validation using React Hook Form in a React application.",
    },
    {
      title: "Socket.io Assignment",
      description:
        "Implement real-time communication using Socket.io in a MERN stack application.",
    },
    {
      title: "Deploying a MERN Stack Application to Heroku",
      description: "Deploy a MERN stack application to Heroku cloud platform.",
    },
    {
      title: "React Native Assignment",
      description:
        "Build a mobile application using React Native for the MERN stack project.",
    },
    {
      title: "Unit Testing with Jest and Enzyme",
      description:
        "Write unit tests for React components and Node.js backend using Jest and Enzyme.",
    },
    {
      title: "Database Seeding with Faker.js",
      description:
        "Seed MongoDB database with dummy data using Faker.js library.",
    },
    {
      title: "GraphQL Assignment",
      description:
        "Implement a GraphQL API layer for a MERN stack application.",
    },
    {
      title: "CORS Configuration with Express.js",
      description:
        "Configure CORS (Cross-Origin Resource Sharing) in Express.js application.",
    },
    {
      title: "Pagination with Mongoose and React",
      description:
        "Implement pagination for large data sets in a MERN stack application.",
    },
    {
      title: "Deploying a MongoDB Cluster on MongoDB Atlas",
      description: "Deploy a MongoDB cluster on MongoDB Atlas cloud service.",
    },
  ];
  // Function to generate random start and conclude time
  const generateRandomTime = () => {
    const startHour = Math.floor(Math.random() * 24);
    const startMinute = Math.floor(Math.random() * 60);
    const concludeHour =
      startHour + Math.floor(Math.random() * (24 - startHour));
    const concludeMinute = Math.floor(Math.random() * 60);
    return {
      start: `${startHour}:${
        startMinute < 10 ? "0" + startMinute : startMinute
      }`,
      conclude: `${concludeHour}:${
        concludeMinute < 10 ? "0" + concludeMinute : concludeMinute
      }`,
    };
  };

  return (
    <VStack
      align="stretch"
      spacing={6}
      p={6}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Heading as="h1" size="xl">
        Assignments
      </Heading>
      {assignments.map((assignment, index) => (
        <Box
          key={index}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.2);"
          _hover={{
            shadow:
              "0 -20px 10px -20px rgba(0,0,0,0.45) inset, -20px 0 10px -20px rgba(0,0,0,0.45) inset;",
          }}
          textAlign="left" // Align text to the left
        >
          <Heading as="h2" size="lg" mb={2}>
            {assignment.title}
            <span
              style={{
                fontSize: "12px",
                color: "#1E88E5",
                marginLeft: "10px",
                marginBottom: "15px",
              }}
            >
              ASSIGNMENT
            </span>
          </Heading>
          <Text color="gray.600" mb={4}>
            {assignment.description}
          </Text>
          <Text fontSize="sm" color="gray.500">
            <strong>Start Time:</strong> {generateRandomTime().start} |{" "}
            <strong>Conclude Time:</strong> {generateRandomTime().conclude}
          </Text>

          <Button
            w={"10%"}
            colorScheme="whatsapp"
            variant="outline"
            size="md"
            mt={4}
          >
            View
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default Assignments;
