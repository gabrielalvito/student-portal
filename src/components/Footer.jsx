import React from "react";
import { Box,
  Container,
  Stack,
  Flex,
  useColorModeValue,} from "@chakra-ui/react";
  
const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
          <Flex maxW="container.lg" mx="auto" px={4} align="center" justify="center">
        <Stack direction={'row'} spacing={6}>
          <p className="studentId">FE4464096</p>
          <p className="studentName">Gabriel Alvito Adi Nugraha</p>
        </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
