import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Button } from "@chakra-ui/react";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/student");
  };

  return (
      <>
      <Container maxW="100%" height={730} bg="gray.200" centerContent>
        <Box mt={220} padding="4" color="black" maxW="md">
            <Button  data-testid="student-btn" colorScheme="red" size={"lg"} variant={"solid"} onClick={handleClick}>ALL STUDENT</Button>
        </Box>
      </Container>
      <Footer/>
      </>

  );
};

export default Home;
