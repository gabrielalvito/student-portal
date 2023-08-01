import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import {
    FormLabel,
    Container,
    FormControl,
    Input,
    Select,
    Button,
  } from "@chakra-ui/react";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/student/${id}`);
      const data = await response.json();
      setStudentData(data);
      setFormData({
        fullname: data.fullname,
        address: data.address,
        phoneNumber: data.phoneNumber,
        birthDate: data.birthDate,
        gender: data.gender,
        programStudy: data.programStudy,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { fullname, address, phoneNumber, birthDate, gender, programStudy } =
      formData;

    let faculty = "";

    // Set the faculty based on the program study
    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        faculty = "Fakultas Ekonomi";
        break;
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        faculty = "Fakultas Ilmu Sosial dan Politik";
        break;
      case "Teknik Sipil":
      case "Arsitektur":
        faculty = "Fakultas Teknik";
        break;
      case "Matematika":
      case "Fisika":
      case "Informatika":
        faculty = "Fakultas Teknologi Informasi dan Sains";
        break;
      default:
        faculty = "";
        break;
    }

    const updatedStudentData = {
      fullname,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
      faculty,
    };

    try {
      const response = await fetch(`http://localhost:3001/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudentData),
      });

      if (response.ok) {
        navigate("/student");
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!studentData) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <NavBar />
      <Container maxW="100%" p={10}>
      <img src={studentData.profilePicture} alt="Profile Picture" role="img" className="rounded" width={150} height={150}/>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel mt={5}>Full Name:</FormLabel>
          <Input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            data-testid="name"
            className="form-control"
            required
          />

          {/* <FormLabel mt={5}>Profile Picture:</FormLabel>
          <Input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
            data-testid="profilePicture"
            className="form-control"
            required
          /> */}

          <FormLabel mt={5}>Address:</FormLabel>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            data-testid="address"
            className="form-control"
            required
          />

          <FormLabel mt={5}>Phone Number:</FormLabel>
          <Input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            data-testid="phoneNumber"
            className="form-control"
            required
          />

          <FormLabel mt={5}>Birth Date:</FormLabel>
          <Input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            data-testid="date"
            className="form-control"
            required
          />

          <FormLabel mt={5}>Gender:</FormLabel>
          <Select
            id="gender"
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

          <FormLabel mt={5}>Program Study:</FormLabel>
          <Select
            id="programStudy"
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
          <Button colorScheme='teal' mt={5} size={"lg"} type="submit" data-testid="edit-btn">
            Edit Student
          </Button>
        </FormControl>
      </form>
      </Container>
      <Footer/>
    </>
  );
};

export default EditStudent;
