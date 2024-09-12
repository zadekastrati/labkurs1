import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Grid,
  Card,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/classrooms/DataTable";
import ClassroomForm from "layouts/classrooms/form";
import { useAuth } from "../../context/AuthContext"; // Correct import

function Classrooms() {
  const { user } = useAuth(); // Use the useAuth hook
  const [classroomsData, setClassroomsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteClassroomId, setDeleteClassroomId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/classrooms", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        classroomName: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.classroomName}
            </MDTypography>
          </MDBox>
        ),
        location: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.location}
            </MDTypography>
          </MDBox>
        ),
        capacity: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.capacity}
            </MDTypography>
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
      setClassroomsData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDeleteModal = (classroomId) => {
    setDeleteClassroomId(classroomId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteClassroom = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/classrooms/${deleteClassroomId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete classroom");

      fetchData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleCreateClassroom = async (classroomsData) => {
    try {
      const response = await fetch("http://localhost:8080/api/classrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(classroomsData),
      });
      if (!response.ok) throw new Error("Failed to create classroom");

      fetchData();
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error creating classroom:", error);
    }
  };

  const handleOpenUpdateModal = (classroom) => {
    setSelectedClassroom(classroom);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const handleUpdateClassroom = async (classroomsData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/classrooms/${selectedClassroom.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(classroomsData),
      });
      if (!response.ok) throw new Error("Failed to update classroom");

      fetchData();
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating classroom:", error);
    }
  };

  const columns = [
    { Header: "Classroom Name", accessor: "classroomName", width: "30%", align: "left" },
    { Header: "Location", accessor: "location", width: "30%", align: "left" },
    { Header: "Capacity", accessor: "capacity", width: "20%", align: "left" },
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
                  Classrooms
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: classroomsData }}
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
          <MDTypography>Are you sure you want to delete this classroom?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button
            onClick={handleDeleteClassroom}
            color="primary"
            style={{ color: "#ff0000" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Classroom Modal */}
      <ClassroomForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateClassroom}
      />

      {/* Update Classroom Modal */}
      <ClassroomForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={handleUpdateClassroom}
        initialData={selectedClassroom}
      />
    </DashboardLayout>
  );
}

export default Classrooms;
