import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDBadge from "@mui/material/Badge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/students/DataTable"; // Adjusted path for student data table
import { Link } from "react-router-dom";
import StudentForm from "layouts/students/form"; // Adjusted path for student form

function Students() {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for create modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for update modal
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store selected student for update

  const handleOpenDeleteModal = (studentId) => {
    setDeleteStudentId(studentId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${studentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Filter out the deleted student from the studentData state
        setStudentData((prevData) => prevData.filter((item) => item.id !== studentId));
        handleCloseDeleteModal(); // Close the delete modal after successful deletion
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateStudent = async (studentData) => {
    // Handle creating student logic here
    console.log("Create student data:", studentData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (student) => {
    setSelectedStudent(student);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateStudent = async (studentId, studentData) => {
    // Handle updating student logic here
    console.log("Update student data:", studentData);
    handleCloseUpdateModal();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/students");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Update studentData state with the new data
      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        age: item.age,
        class: item.class,
        action: (
          <MDBox display="flex" alignItems="center">
            <Button
              component={Link}
              variant="caption"
              fontWeight="medium"
              sx={{ ml: 1 }}
              onClick={() => handleOpenUpdateModal(item)}
            >
              Edit
            </Button>

            <Button
              variant="caption"
              fontWeight="medium"
              sx={{ ml: 1 }}
              onClick={() => handleOpenDeleteModal(item.id)}
            >
              Delete
            </Button>
          </MDBox>
        ),
      }));
      setStudentData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { Header: "Name", accessor: "name", width: "30%", align: "left" },
    { Header: "Age", accessor: "age", align: "left" },
    { Header: "Class", accessor: "class", align: "left" },
    { Header: "Action", accessor: "action", align: "right" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Button onClick={handleOpenCreateModal} variant="contained" color="inherit" sx={{ ml: 2 }}>
        Create
      </Button>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Students
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: studentData }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogContent>
          <MDTypography>Are you sure you want to delete this student?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDeleteStudent(deleteStudentId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Student Modal */}
      <StudentForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateStudent}
      />

      {/* Update Student Modal */}
      <StudentForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(studentData) => handleUpdateStudent(selectedStudent.id, studentData)}
        initialData={selectedStudent}
      />
    </DashboardLayout>
  );
}

export default Students;

