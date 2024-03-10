import React from "react";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box p={4} textAlign="center">
      <Heading as="h1" fontSize="4xl" mb={6}>
        Welcome to EduHub
      </Heading>
      <Text color={"grey"} fontSize="lg" mb={6}>
        EduHub is your gateway to a world of knowledge and learning. Whether
        you're a student eager to expand your horizons or an instructor
        passionate about sharing your expertise, EduHub provides the tools and
        resources you need to succeed.
      </Text>
      <Image
        style={{ w: "100%", margin: "auto", borderRadius: "50%" }}
        src={
          "https://play-lh.googleusercontent.com/aeBbzHLukz6wF4L-uqOUWZrSTpiZOncHjJqu3_m9JV0no86LoA52T4_AEcKDqCtWoK86"
        }
        alt="Illustration"
        mb={6}
      />
      <br />
      <Text as="cite" color={"grey"} fontSize="md" mb={6}>
        Explore our diverse range of courses curated by industry experts. Engage
        in interactive lectures and discussions, collaborate with peers, and
        track your progress every step of the way.
      </Text>
      <br />
      <br />
      <Text as="i" color={"black"} fontSize="xl" mb={6}>
        Join EduHub today and embark on your journey towards personal and
        professional growth.
      </Text>
      <br />
      <br />
      <Button colorScheme="blue" size="lg">
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;
