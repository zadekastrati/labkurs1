import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/schedules/DataTable"; // Adjust the path if needed
import ScheduleForm from "layouts/schedules/form"; // Adjust the path if needed
import { useAuth } from "../../context/AuthContext";

function Schedules() {
  const { user } = useAuth();
  const [scheduleData, setScheduleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/schedules", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        schedule: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {item.scheduleName}
              </MDTypography>
              <MDTypography variant="caption">{item.scheduleDetails}</MDTypography>
            </MDBox>
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
      setScheduleData(formattedData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDeleteModal = (scheduleId) => {
    setDeleteScheduleId(scheduleId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/schedules/${scheduleId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete schedule");
      setScheduleData((prevData) => prevData.filter((item) => item.id !== scheduleId));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleCreateSchedule = async (scheduleData) => {
    try {
      const response = await fetch("http://localhost:8080/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(scheduleData),
      });
      if (!response.ok) throw new Error("Failed to create schedule");
      handleCloseCreateModal();
      fetchData();
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  const handleOpenUpdateModal = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const handleUpdateSchedule = async (scheduleId, scheduleData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/schedules/${scheduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(scheduleData),
      });
      if (!response.ok) throw new Error("Failed to update schedule");
      handleCloseUpdateModal();
      fetchData();
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const columns = [
    { Header: "Schedule", accessor: "schedule", width: "80%", align: "left" },
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
                  Schedules
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: scheduleData }}
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
          <MDTypography>Are you sure you want to delete this schedule?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button
            onClick={() => handleDeleteSchedule(deleteScheduleId)}
            color="primary"
            style={{ color: "#ff0000" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Schedule Modal */}
      <ScheduleForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateSchedule}
      />

      {/* Update Schedule Modal */}
      <ScheduleForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(scheduleData) =>
          handleUpdateSchedule(selectedSchedule.id, scheduleData)
        }
        initialData={selectedSchedule}
      />
    </DashboardLayout>
  );
}

export default Schedules;
