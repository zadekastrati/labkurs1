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
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/trainers/DataTable";
import TrainerForm from "layouts/trainers/form";
import { useAuth } from "../../context/AuthContext"; // Correct import

function Trainers() {
  const { user } = useAuth(); // Use the useAuth hook
  const [trainerData, setTrainerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteTrainerId, setDeleteTrainerId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/trainers", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        trainersName: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.trainersName}
            </MDTypography>
          </MDBox>
        ),
        specialization: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.specialization}
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            {user?.role === 4 && (
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
      setTrainerData(formattedData);
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

  const handleOpenDeleteModal = (trainerId) => {
    setDeleteTrainerId(trainerId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteTrainer = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/trainers/${deleteTrainerId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete trainer");

      fetchData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleCreateTrainer = async (trainerData) => {
    try {
      const response = await fetch("http://localhost:8080/api/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(trainerData),
      });
      if (!response.ok) throw new Error("Failed to create trainer");

      fetchData();
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error creating trainer:", error);
    }
  };

  const handleOpenUpdateModal = (trainer) => {
    setSelectedTrainer(trainer);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const handleUpdateTrainer = async (trainerData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/trainers/${selectedTrainer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(trainerData),
      });
      if (!response.ok) throw new Error("Failed to update trainer");

      fetchData();
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
  };

  const columns = [
    { Header: "Trainers Name", accessor: "trainersName", width: "45%", align: "left" },
    { Header: "Specialization", accessor: "specialization", width: "45%", align: "left" },
    { Header: "Action", accessor: "action", align: "right" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {user?.role === 4 && (
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
                  Trainers
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: trainerData }}
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
          <MDTypography>Are you sure you want to delete this trainer?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button
            onClick={handleDeleteTrainer}
            color="primary"
            style={{ color: "#ff0000" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Trainer Modal */}
      <TrainerForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateTrainer}
      />

      {/* Update Trainer Modal */}
      <TrainerForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={handleUpdateTrainer}
        initialData={selectedTrainer}
      />
    </DashboardLayout>
  );
}

export default Trainers;
