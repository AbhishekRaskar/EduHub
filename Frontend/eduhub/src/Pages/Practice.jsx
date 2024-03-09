import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Practice = () => {
  return (
    <Box
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      textAlign="center"
    >
      <Heading as="h1" size="xl">
        Practice
      </Heading>
    </Box>
  );
};

export default Practice;
