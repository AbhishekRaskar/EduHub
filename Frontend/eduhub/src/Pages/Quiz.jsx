import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const Quiz = () => {
  // Array of hardcoded questions
  const questions = [
    {
      question: "What does MERN stack stand for?",
      options: [
        "MongoDB, Express.js, React, Node.js",
        "MySQL, Express.js, React, Node.js",
        "MongoDB, Ember.js, React, Node.js",
      ],
      correctAnswer: "MongoDB, Express.js, React, Node.js",
    },
    {
      question: "Which database is commonly used in the MERN stack?",
      options: ["MongoDB", "MySQL", "SQLite"],
      correctAnswer: "MongoDB",
    },
    {
      question: "What does React.js do in the MERN stack?",
      options: ["Frontend framework", "Backend framework", "Database"],
      correctAnswer: "Frontend framework",
    },
    {
      question:
        "Which framework is used for building RESTful APIs in the MERN stack?",
      options: ["Express.js", "Django", "Flask"],
      correctAnswer: "Express.js",
    },
    {
      question: "Which tool can be used to manage MongoDB databases?",
      options: [
        "MongoDB Compass",
        "MySQL Workbench",
        "SQL Server Management Studio",
      ],
      correctAnswer: "MongoDB Compass",
    },
    {
      question: "What is the purpose of Node.js in the MERN stack?",
      options: [
        "Backend runtime environment",
        "Frontend framework",
        "Database management",
      ],
      correctAnswer: "Backend runtime environment",
    },
    {
      question: "Which language is used for server-side scripting in Node.js?",
      options: ["JavaScript", "Python", "Java"],
      correctAnswer: "JavaScript",
    },
    {
      question: "What role does Express.js play in the MERN stack?",
      options: ["Web application framework", "Database", "Frontend library"],
      correctAnswer: "Web application framework",
    },
    {
      question: "What is React.js primarily used for in the MERN stack?",
      options: [
        "Building user interfaces",
        "Backend development",
        "Database management",
      ],
      correctAnswer: "Building user interfaces",
    },
    {
      question:
        "Which component library is commonly used with React.js in the MERN stack?",
      options: ["Material-UI", "Bootstrap", "Foundation"],
      correctAnswer: "Material-UI",
    },
  ];

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md">
      <Heading as="h1" size="xl" mb={4}>
        MERN Stack Quiz
      </Heading>
      <Text mb={4}>
        Welcome to the MERN Stack Quiz! Answer the following questions to test
        your knowledge.
      </Text>
      <VStack align="stretch" spacing={6}>
        {questions.map((q, index) => (
          <Box
            boxShadow={
              " 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);"
            }
            key={index}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Text fontWeight="bold" mb={4}>
              Question {index + 1}: {q.question}
            </Text>
            <VStack align="stretch" spacing={4}>
              {q.options.map((option, optionIndex) => (
                <Button
                  w={"20%"}
                  m={"auto"}
                  key={optionIndex}
                  textColor={"black"}
                  colorScheme="teal"
                  variant="outline"
                >
                  {option}
                </Button>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Quiz;
