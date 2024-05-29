import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/courses/DataTable";
import { Link } from "react-router-dom";
import AssignmentForm from "layouts/assignments/form";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Assignments() {
  const [assignmentData, setAssignmentData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteAssignmentId, setDeleteAssignmentId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleOpenDeleteModal = (assignmentId) => {
    setDeleteAssignmentId(assignmentId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/assignments/${assignmentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setAssignmentData((prevData) => prevData.filter((item) => item.id !== assignmentId));
        handleCloseDeleteModal();
      } else {
        throw new Error("Failed to delete assignment");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedAssignment(null);
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenUpdateModal = (assignment) => {
    setSelectedAssignment(assignment);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateAssignment = async (assignmentId, assignmentData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/assignments/${assignmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignmentData),
      });
      if (!response.ok) {
        throw new Error("Failed to update assignment");
      }
      fetchData(); // Refetch data after updating an assignment
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/assignment");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        assignment: <Author name={item.name} description={item.description} />,
        course: (
          <MDBox ml={2}>
            <MDBadge badgeContent={item.Course.title} />
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            <EditIcon
              onClick={() => handleOpenUpdateModal(item)}
              style={{ cursor: "pointer", marginRight: "24px", fontSize: "2.5rem" }}
            />
            <DeleteIcon
              onClick={() => handleOpenDeleteModal(item.id)}
              style={{ cursor: "pointer", fontSize: "2.5rem" }}
            />
          </MDBox>
        ),
      }));
      setAssignmentData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCourses();
  }, []);

  const Author = ({ name, description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Assignment", accessor: "assignment", width: "45%", align: "left" },
    { Header: "Course", accessor: "course", align: "left" },
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
                  Assignments
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: assignmentData }}
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
          <MDTypography>Are you sure you want to delete this assignment?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDeleteAssignment(deleteAssignmentId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create assignment Modal */}
      <AssignmentForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={fetchData} // Directly fetch data after creation
        courses={courses} // Pass courses to AssignmentForm
      />

      {/* Update assignment Modal */}
      <AssignmentForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(assignmentData) => handleUpdateAssignment(selectedAssignment.id, assignmentData)}
        initialData={selectedAssignment}
        courses={courses} // Pass courses to AssignmentForm
      />
    </DashboardLayout>
  );
}

export default Assignments;
