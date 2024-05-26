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
import DataTable from "layouts/students/DataTable";
import { Link } from "react-router-dom";
import StudentForm from "layouts/students/form";

function Students() {
  const [studentData, setstudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletestudentId, setDeletestudentId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for create modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for update modal
  const [selectedstudent, setSelectedstudent] = useState(null); // State to store selected student for update

  const handleOpenDeleteModal = (studentId) => {
    setDeletestudentId(studentId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeletestudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${studentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Filter out the deleted student from the studentData state
        setstudentData((prevData) => prevData.filter((item) => item.id !== studentId));
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

  const handleCreatestudent = async (studentData) => {
    // Handle creating student logic here
    console.log("Create student data:", studentData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (student) => {
    setSelectedstudent(student);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdatestudent = async (studentId, studentData) => {
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
      // Update roleData state with the new data
      const formattedData = data.map((item) => ({
        id: item.id,
        student: <Author firstName={item.firstName} lastName={item.lastName} />,
        city: (
          <MDBox ml={2}>
            <MDBadge badgeContent={item.City.name} />
          </MDBox>
        ),
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
      setstudentData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          student: <Author firstName={item.firstName} lastName={item.lastName} />,
          city: (
            <MDBox ml={2}>
               <MDBadge badgeContent={item.City.name} />
            </MDBox> 
          ),
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
        setstudentData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const Author = ({ firstName, lastName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {firstName}
        </MDTypography>
        <MDTypography variant="caption">{lastName}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Student", accessor: "student", width: "45%", align: "left" },
    { Header: "City", accessor: "city", align: "left" },
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
          <Button onClick={() => handleDeletestudent(deletestudentId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create student Modal */}
      <StudentForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreatestudent}
      />

      {/* Update student Modal */}
      <StudentForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(studentData) => handleUpdatestudent(selectedstudent.id, studentData)}
        initialData={selectedstudent}
      />
    </DashboardLayout>
  );
}

export default Students;
