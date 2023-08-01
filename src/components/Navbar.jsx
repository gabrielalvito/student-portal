import React from "react";
import { Link, Box, Flex } from "@chakra-ui/react";
const NavBar = () => {
  return (
    <>
     <Box bg="gray.200" py={4}>
      <Flex maxW="container.lg" mx="auto" px={4} align="center" justify="center">
        <Link href="/" mr={4} data-testid="home-page" >
          Student Portal
        </Link>
        <Link href="/student" mr={4} data-testid="student-page">
          All Student
        </Link>
        <Link href="/add" mr={4} data-testid="add-page">
          Add Student
        </Link>
      </Flex>
      </Box>
    </>
  );
};

export default NavBar;
