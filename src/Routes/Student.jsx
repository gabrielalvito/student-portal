import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  Select,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [students, selectedFaculty]);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3001/student");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filterStudents = () => {
    if (selectedFaculty === "All") {
      setFilteredStudent(students);
    } else {
      const filtered = students.filter((student) =>
        student.faculty.includes(selectedFaculty.trim())
      );
      setFilteredStudent(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  if (loading) {
    return "Loading ...";
  }

  return (
    <>
      <NavBar />
      <Container maxW="100%" p={10} minH="80vh" display="flex" flexDirection="column">
        <Select
          placeholder="Select option"
          value={selectedFaculty}
          onChange={handleFilterChange}
          data-testid="filter"
          className="form-select"
        >
          <option value="All">All</option>
          <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
          <option value="Fakultas Ilmu Sosial dan Politik">
            Fakultas Ilmu Sosial dan Politik{" "}
          </option>
          <option value="Fakultas Teknik">Fakultas Teknik</option>
          <option value="Fakultas Teknologi Informasi dan Sains">
            Fakultas Teknologi Informasi dan Sains
          </option>
        </Select>

        <TableContainer marginTop={5}>
          <Table variant="simple" id="table-student">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Full Name</Th>
                <Th>Faculty</Th>
                <Th>Program Study</Th>
                <Th>Option</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredStudent.map((student, index) => (
                <Tr key={student.id} className="student-data-row">
                  <Td>{index + 1}</Td>
                  <Td>
                    <Link to={`/student/${student.id}`}>
                      {student.fullname}
                    </Link>
                  </Td>
                  <Td>{student.faculty}</Td>
                  <Td>{student.programStudy}</Td>
                  <Td>
                    <Button
                      onClick={() => handleDelete(student.id)}
                      data-testid={`delete-${student.id}`}
                      colorScheme='red'
                      size='sm'
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />

    </>
  );
};

export default Student;
