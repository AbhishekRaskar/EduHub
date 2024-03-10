import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  Flex,
  Button,
  Badge,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";

const AdminList = () => {
  const toast = useToast();
  const [adminsData, setAdminsData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCourse, setEditedCourse] = useState("");
  const [editedStartTime, setEditedStartTime] = useState("");
  const [editedEndTime, setEditedEndTime] = useState("");
  const [editedDiscussions, setEditedDiscussions] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // State to control displaying the add lecture form
  const [newLecture, setNewLecture] = useState({
    title: "",
    course: "",
    startTime: "",
    endTime: "",
    discussions: "",
  });
  const [selectedCourse, setSelectedCourse] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://eduhub-d5dn.onrender.com/lectures/"
      );
      setAdminsData(response.data.lectures);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    const lecture = adminsData.find((lecture) => lecture._id === id);
    if (lecture) {
      setEditingId(id);
      setEditedTitle(lecture.title);
      setEditedCourse(lecture.course);
      setEditedStartTime(lecture.startTime);
      setEditedEndTime(lecture.endTime);
      setEditedDiscussions(lecture.discussions);
    }
  };

  const handleSaveChanges = async () => {
    console.log(editedCourse);
    console.log(editedTitle);
    console.log(editedDiscussions);
    console.log(editedEndTime);
    console.log(editedStartTime);
    try {
      await axios.patch(
        `https://eduhub-d5dn.onrender.com/lectures/update/${editingId}`,
        {
          title: editedTitle,
          course: editedCourse,
          startTime: editedStartTime,
          endTime: editedEndTime,
          discussions: editedDiscussions,
        }
      );
      setEditingId(null);
      fetchData();
      toast({
        title: "Success",
        description: "Lecture updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Error",
        description: "Failed to update lecture",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://eduhub-d5dn.onrender.com/lectures/delete/${id}`
      );
      fetchData();
      toast({
        title: "Success",
        description: "Lecture Deleted Successfully",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast({
        title: "Error",
        description: "Failed to update lecture",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleAdd = () => {
    setShowAddForm(true); // Show add lecture form when clicked
  };

  const handleAddLecture = async () => {
    try {
      await axios.post(
        "https://eduhub-d5dn.onrender.com/lectures/add",
        newLecture
      );
      setShowAddForm(false);
      setNewLecture({
        // Reset form fields
        title: "",
        course: "",
        startTime: "",
        endTime: "",
        discussions: "",
      });
      fetchData();
      toast({
        title: "Success",
        description: "Lecture added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error adding new lecture:", error);
      toast({
        title: "Error",
        description: "Failed to add new lecture",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleLogout = () => {
    window.location.href = "/"; // Redirect to the home page
    toast({
      title: "Logged out",
      description: "You have been logged out",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <Box bg="gray.100">
      <Flex justify="flex-end">
        <Button onClick={handleLogout} colorScheme="red" size="md">
          Logout
        </Button>
      </Flex>
      <Container maxW="7xl" py={16} px={[4, 8, 12]} as={Stack} spacing={12}>
        <Stack spacing={[8, 8, 12]} align="center">
          <Heading>All Lectures</Heading>
          <Text color={"grey.500"} as={"i"}>
            We have been working together as Team collaboration is the
            cornerstone of building team synergy, because collaborative teams
            work together to brainstorm new ideas, share knowledge, and complete
            ambitious projects.
          </Text>
        </Stack>
        <Button
          w={"30%"}
          margin={"auto"}
          onClick={handleAdd}
          colorScheme="blue"
          size="lg"
        >
          Add New Lecture
        </Button>

        {showAddForm && ( // Render the form only when showAddForm is true
          <Box
            width={{ lg: "90%", md: "30%" }}
            boxShadow="lg"
            bg="white"
            rounded="lg"
            p={6}
            margin={"auto"}
          >
            <Input
              value={newLecture.title}
              onChange={(e) =>
                setNewLecture({ ...newLecture, title: e.target.value })
              }
              placeholder="Title"
              mb={2}
            />
            <Select
              value={newLecture.course}
              onChange={(e) =>
                setNewLecture({ ...newLecture, course: e.target.value })
              }
              placeholder="Course"
              mb={2}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Data Science">Data Science</option>
            </Select>
            <Input
              type="datetime-local"
              value={newLecture.startTime}
              onChange={(e) =>
                setNewLecture({ ...newLecture, startTime: e.target.value })
              }
              placeholder="Start Time"
              mb={2}
            />
            <Input
              type="datetime-local"
              value={newLecture.endTime}
              onChange={(e) =>
                setNewLecture({ ...newLecture, endTime: e.target.value })
              }
              placeholder="End Time"
              mb={2}
            />
            <Input
              value={newLecture.discussions}
              onChange={(e) =>
                setNewLecture({ ...newLecture, discussions: e.target.value })
              }
              placeholder="Discussions"
              mb={2}
            />
            <Flex justify="center">
              <Button
                onClick={handleAddLecture}
                mr={2}
                colorScheme="teal"
                size="sm"
              >
                Add Lecture
              </Button>
            </Flex>
          </Box>
        )}

        <Stack
          direction="row"
          spacing={[8, 8, 12]}
          justify="space-between"
          flexWrap="wrap"
        >
          {adminsData.map((lecture) => (
            <Box
              key={lecture._id}
              width={{ base: "100%", md: "30%" }}
              boxShadow="lg"
              bg="white"
              rounded="lg"
              mb={8} // Added margin bottom for spacing between rows
            >
              {editingId === lecture._id ? (
                <Stack p={6}>
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Title"
                    mb={2}
                  />
                  <Select
                    value={editedCourse}
                    onChange={(e) => setEditedCourse(e.target.value)}
                    placeholder="Course"
                    mb={2}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Data Science">Data Science</option>
                  </Select>
                  <Input
                    type="datetime-local"
                    value={editedStartTime}
                    onChange={(e) => setEditedStartTime(e.target.value)}
                    placeholder="Start Time"
                    mb={2}
                  />
                  <Input
                    type="datetime-local"
                    value={editedEndTime}
                    onChange={(e) => setEditedEndTime(e.target.value)}
                    placeholder="End Time"
                    mb={2}
                  />
                  <Input
                    value={editedDiscussions}
                    onChange={(e) => setEditedDiscussions(e.target.value)}
                    placeholder="Discussions"
                    mb={2}
                  />
                  <Flex justify="center">
                    <Button
                      onClick={handleSaveChanges}
                      mr={2}
                      colorScheme="teal"
                      size="sm"
                    >
                      Save Changes
                    </Button>
                  </Flex>
                </Stack>
              ) : (
                <Stack p={6}>
                  <Heading fontSize="xl" mb={4}>
                    {lecture.title}
                  </Heading>
                  {lecture.course === "Frontend" && (
                    <Badge
                      w={"70%"}
                      m={"auto"}
                      fontSize={"md"}
                      colorScheme="green"
                    >
                      {lecture.course}
                    </Badge>
                  )}
                  {lecture.course === "Backend" && (
                    <Badge
                      w={"70%"}
                      m={"auto"}
                      fontSize={"md"}
                      colorScheme="red"
                    >
                      {lecture.course}
                    </Badge>
                  )}
                  {lecture.course === "Data Science" && (
                    <Badge
                      w={"70%"}
                      m={"auto"}
                      fontSize={"md"}
                      colorScheme="purple"
                    >
                      {lecture.course}
                    </Badge>
                  )}
                  <Text color="gray.700">
                    Starts at {lecture.startTime.split("T").join(" ")}
                  </Text>
                  <Text color="gray.700">
                    Ends at {lecture.endTime.split("T").join(" ")}
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    {lecture.discussions}
                  </Text>
                  <Flex justify="center">
                    <Button
                      onClick={() => handleEdit(lecture._id)}
                      mr={2}
                      colorScheme="teal"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(lecture._id)}
                      colorScheme="red"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </Flex>
                </Stack>
              )}
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default AdminList;
