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
import DataTable from "layouts/users/DataTable";
import { Link } from "react-router-dom";
import UserForm from "layouts/users/form";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Users() {
  const [usersData, setUsersData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteUsersId, setDeleteUsersId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null);

  const handleOpenDeleteModal = (usersId) => {
    setDeleteUsersId(usersId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteUsers = async (usersId) => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/users/${usersId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setUsersData((prevData) => prevData.filter((item) => item.id !== usersId));
        handleCloseDeleteModal();
      } else {
        throw new Error("Failed to delete users");
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedUsers(null);
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenUpdateModal = (users) => {
    setSelectedUsers(users);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateUsers = async (usersId, usersData) => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/users/${usersId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(usersData),
      });
      if (!response.ok) {
        throw new Error("Failed to update Users");
      }
      fetchData(); // Refetch data after updating a Users
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating Users:", error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/users", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        users: <Author name={item.name} email={item.email} />,
        role: (
          <MDBox ml={-2}>
            <MDBadge badgeContent={item.Role.title} />
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
      setUsersData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/roles", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRoles();
  }, []);

  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "users", accessor: "users", width: "45%", align: "left" },
    { Header: "role", accessor: "role", align: "left" },
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
                  Users
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: usersData }}
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
          <MDTypography>Are you sure you want to delete this User?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDeleteUsers(deleteUsersId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create course Modal */}
      <UserForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={fetchData} // Directly fetch data after creation
        roles={roles} // Pass roles to CourseForm
      />

      {/* Update course Modal */}
      <UserForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(usersData) => handleUpdateUsers(selectedUsers.id, usersData)}
        initialData={selectedUsers}
        roles={roles} // Pass categories to CourseForm
      />
    </DashboardLayout>
  );  
}

export default Users;
