import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box, Button, Text } from "@chakra-ui/react";
import Footer from "../components/Footer";
const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <>
      <Container maxW="100%" height={730} bg="gray.200" centerContent>
        
        <Text mt={220} fontSize='3xl' color={"black"}>"{location.pathname}" Not Found</Text>
        <Box padding="4" color="black" maxW="md">
          <Button
            colorScheme="red"
            size={"lg"}
            variant={"solid"}
            onClick={handleBack}
            data-testid="back"
          >
           Take Me Back
          </Button>
        </Box>
      </Container>
      <Footer/>
    </>
  );
};

export default NotFound;
