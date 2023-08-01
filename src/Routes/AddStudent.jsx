import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  FormLabel,
  Container,
  FormControl,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    profilePicture: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
    } = formData;

    const faculty = getFacultyByProgramStudy(programStudy);

    const studentData = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      faculty,
      programStudy,
    };
    try {
      const response = await fetch("http://localhost:3001/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        navigate("/student");
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFacultyByProgramStudy = (programStudy) => {
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        return "Fakultas Ekonomi";
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        return "Fakultas Ilmu Sosial dan Politik";
      case "Teknik Sipil":
      case "Arsitektur":
        return "Fakultas Teknik";
      case "Matematika":
      case "Fisika":
      case "Informatika":
        return "Fakultas Teknologi Informasi dan Sains";
      default:
        return "";
    }
  };
  return (
    <>
      <NavBar />
      <Container maxW="100%" p={10}>
        <form onSubmit={handleSubmit}>
          <FormControl margin={5}>
            <FormLabel mt={4}>Full Name:</FormLabel>
            <Input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              data-testid="name"
              className="form-control"
              required
            />

            <FormLabel mt={4}>Profile Picture:</FormLabel>
            <Input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
              data-testid="profilePicture"
              className="form-control"
              required
            />

            <FormLabel mt={4}>Address:</FormLabel>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              data-testid="address"
              className="form-control"
              required
            />

            <FormLabel mt={4}>Phone Number:</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              data-testid="phoneNumber"
              className="form-control"
              required
            />

          <FormLabel mt={4}>Birth Date:</FormLabel>
          <Input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            data-testid="date"
            className="form-control"
            required
          />

          <FormLabel mt={4}>Gender:</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            data-testid="gender"
            className="form-control"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>

          <FormLabel mt={4}>Program Study:</FormLabel>
          <Select
            name="programStudy"
            value={formData.programStudy}
            onChange={handleInputChange}
            data-testid="prody"
            className="form-control"
            required
          >
            <option value="">Select Program Study</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional">
              Hubungan Internasional
            </option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </Select>
          <Button colorScheme='teal' mt={5} size={"lg"} type="submit" data-testid="add-btn">Add Student</Button>
          </FormControl>
        </form>
      </Container>
      <Footer/>

    </>
  );
};

export default AddStudent;
