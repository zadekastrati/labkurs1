import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import Icon from '@mui/material/Icon';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDBadge from "@mui/material/Badge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/users/DataTable";
import { Link } from "react-router-dom";
import UserForm from "layouts/users/form";

function Users() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for create modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for update modal
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user for update

  const handleOpenDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Filter out the deleted user from the userData state
        setUserData((prevData) => prevData.filter((item) => item.id !== userId));
        handleCloseDeleteModal(); // Close the delete modal after successful deletion
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateUser = async (userData) => {
    // Handle creating user logic here
    console.log("Create user data:", userData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateUser = async (userId, userData) => {
    // Handle updating user logic here
    console.log("Update user data:", userData);
    handleCloseUpdateModal();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Update roleData state with the new data
      const formattedData = data.map((item) => ({
        id: item.id,
        user: <Author name={item.name} email={item.email} />,
        role: (
          <MDBox ml={2}>
            <MDBadge badgeContent={item.Role.title} />
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
      setUserData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          user: <Author name={item.name} email={item.email} />,
          role: (
            <MDBox ml={2}>
              <MDBadge badgeContent={item.Role.title} />
            </MDBox>
          ),
          action: (
            <MDBox display="flex" alignItems="center" gap={0.5}>
              <Button
                component={Link}
                variant="caption"
                fontWeight="medium"
                onClick={() => handleOpenUpdateModal(item)}
                sx={{ minWidth: 0, padding: '4px',
                ':hover': {
                  color: 'blue', 
                }}}
              >
                <Icon fontSize="small">edit</Icon>
              </Button>

              <Button
                variant="caption"
                fontWeight="medium"
                onClick={() => handleOpenDeleteModal(item.id)}
                sx={{ minWidth: 0, padding: '4px',
                ':hover': {
                  color: 'red', 
                }}}
              >
                <Icon fontSize="small">delete</Icon>
              </Button>
            </MDBox>
          ),
        }));
        setUserData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
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
    { Header: "User", accessor: "user", width: "45%", align: "left" },
    { Header: "Role", accessor: "role", align: "left" },
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
                    table={{ columns, rows: userData }}
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
          <MDTypography>Are you sure you want to delete this user?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDeleteUser(deleteUserId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Modal */}
      <UserForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateUser}
      />

      {/* Update User Modal */}
      <UserForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(userData) => handleUpdateUser(selectedUser.id, userData)}
        initialData={selectedUser}
      />
    </DashboardLayout>
  );
}

export default Users;
