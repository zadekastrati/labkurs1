import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/roles/DataTable";
import { Link } from "react-router-dom";
import RoleForm from "layouts/roles/form";
import Icon from '@mui/material/Icon';

function Roles() {
  const [roleData, setRoleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleOpenDeleteModal = (roleId) => {
    setDeleteRoleId(roleId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/roles/${roleId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        handleCloseDeleteModal();
        fetchData();
      } else {
        throw new Error("Failed to delete role");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateRole = async (roleData) => {
    console.log("Create role data:", roleData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (role) => {
    setSelectedRole(role);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateRole = async (roleId, roleData) => {
    console.log("Update role data:", roleData);
    handleCloseUpdateModal();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/roles", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        title: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.title}
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            <Button
              component={Link}
              variant="caption"
              fontWeight="medium"
              onClick={() => handleOpenUpdateModal(item)}
              sx={{ minWidth: 0, padding: '4px', ':hover': { color: 'blue' }}}
            >
              <Icon fontSize="small">edit</Icon>
            </Button>
            <Button
              variant="caption"
              fontWeight="medium"
              onClick={() => handleOpenDeleteModal(item.id)}
              sx={{ minWidth: 0, padding: '4px', ':hover': { color: 'red' }}}
            >
              <Icon fontSize="small">delete</Icon>
            </Button>
          </MDBox>
        ),
      }));
      setRoleData(formattedData);
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
    { Header: "Title", accessor: "title", width: "45%", align: "left" },
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
                  Roles
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: roleData }}
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
          <MDTypography>Are you sure you want to delete this role?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button
            onClick={() => handleDeleteRole(deleteRoleId)}
            color="primary"
            style={{ color: "#3583eb" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Role Modal */}
      <RoleForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateRole}
      />

      {/* Update Role Modal */}
      <RoleForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(roleData) => handleUpdateRole(selectedRole.id, roleData)}
        initialData={selectedRole}
      />
    </DashboardLayout>
  );
}

export default Roles;
