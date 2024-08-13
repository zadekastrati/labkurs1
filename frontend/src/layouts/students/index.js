import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField,IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/students/DataTable";
import { Link } from "react-router-dom";
import StudentsForm from "layouts/students/form";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../context/AuthContext";

function Students() {
  const { user } = useAuth();
  const [studentsData, setStudentsData] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteStudentsId, setDeleteStudentsId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState(null);

  const handleOpenDeleteModal = (studentsId) => {
    setDeleteStudentsId(studentsId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteStudents = async (studentsId) => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/students/${studentsId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setStudentsData((prevData) => prevData.filter((item) => item.id !== studentsId));
        handleCloseDeleteModal();
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedStudents(null);
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenUpdateModal = (students) => {
    setSelectedStudents(students);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateStudents = async (studentsId, studentsData) => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/students/${studentsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(studentsData),
      });
      if (!response.ok) {
        throw new Error("Failed to update students");
      }
      fetchData(); // Refetch data after updating a students
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating students:", error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/students", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data"); l
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        students: <Author firstName={item.firstName} lastName={item.lastName} />,
        cities: (
          <MDBox ml={-2}>
            <MDBadge badgeContent={item.City.name} />
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            {user?.role === 11 && (
              <>
                <IconButton
                  onClick={() => handleOpenUpdateModal(item)}
                  sx={{ color: "grey", "&:hover": { color: "blue" } }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleOpenDeleteModal(item.id)}
                  sx={{ color: "grey", "&:hover": { color: "red" } }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </MDBox>
        ),
      }));
      setStudentsData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchCities= async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/city", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCities();
  }, []);

  const Author = ({firstName,lastName }) => (
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
    { Header: "students", accessor: "students", width: "45%", align: "left" },
    { Header: "cities", accessor: "cities", align: "left" },
    { Header: "Action", accessor: "action", align: "right" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {user?.role === 11 && (
        <Button onClick={handleOpenCreateModal} variant="contained" color="inherit" sx={{ ml: 2 }}>
          Create
        </Button>
      )}
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
                    table={{ columns, rows: studentsData }}
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
          <Button onClick={() => handleDeleteStudents(deleteStudentsId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create course Modal */}
      <StudentsForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={fetchData} // Directly fetch data after creation
        cities={cities} // Pass categories to CourseForm
      />

      {/* Update course Modal */}
      <StudentsForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(studentsData) => handleUpdateStudents(selectedStudents.id, studentsData)}
        initialData={selectedStudents}
        cities={cities} // Pass categories to CourseForm
      />
    </DashboardLayout>
  );
}

export default Students;
