import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField,IconButton } from "@mui/material";
import Icon from '@mui/material/Icon';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDBadge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/exam/DataTable";
import { Link } from "react-router-dom";
import UserForm from "layouts/exam/form";
import { useAuth } from "../../context/AuthContext";

function Exam() {
  const { user } = useAuth();
  const [examData, setExamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteExamId, setDeleteExamId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for create modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for update modal
  const [selectedExam, setSelectedExam] = useState(null); // State to store selected user for update

  const handleOpenDeleteModal = (examId) => {
    setDeleteExamId(examId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteExam = async (examId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/exam/${examId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` // Include token
        }
      });
      if (response.ok) {
        setExamData((prevData) => prevData.filter((item) => item.id !== examId));
        handleCloseDeleteModal(); // Close the delete modal after successful deletion
      } else {
        throw new Error("Failed to delete exam");
      }
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
    
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateExam = async (examData) => {
    // Handle creating user logic here
    console.log("Create exam data:", examData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (exam) => {
    setSelectedExam(exam);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateExam = async (examId,examData) => {
    // Handle updating user logic here
    console.log("Update exam data:", examData);
    handleCloseUpdateModal();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/exam",{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` // Include token
      }
    });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Update roleData state with the new data
      const formattedData = data.map((item) => ({
        id: item.id,
        exam: <Author name={item.name} />,
        course: (
          <MDBox ml={2}>
            <MDBadge badgeContent={item.Course.title} />
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
      setExamData(formattedData);
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

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        {/* <MDTypography variant="caption">{description}</MDTypography> */}
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Exam", accessor: "exam", width: "45%", align: "left" },
    { Header: "Course", accessor: "course", align: "left" },
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
                  Exams
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: examData }}
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
          <MDTypography>Are you sure you want to delete this exam?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDeleteExam(deleteExamId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Modal */}
      <UserForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateExam}
      />

      {/* Update User Modal */}
      <UserForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(examData) => handleUpdateExam(selectedExam.id, examData)}
        initialData={selectedExam}
      />
    </DashboardLayout>
  );
}

export default Exam;
