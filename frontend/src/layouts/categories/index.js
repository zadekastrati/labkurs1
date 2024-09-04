import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField,IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/categories/DataTable";
import { Link } from "react-router-dom";
import CategoriesForm from "layouts/categories/form";
import Icon from '@mui/material/Icon';
import { useAuth } from "../../context/AuthContext";


function Categories() {
  const { user } = useAuth();
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteCategoriesId, setDeleteCategoriesId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(null);

  const handleOpenDeleteModal = (categoriesId) => {
    setDeleteCategoriesId(categoriesId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteCategories = async (categoriesId) => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/categories/${categoriesId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        handleCloseDeleteModal();
        fetchData();
      } else {
        throw new Error("Failed to delete Categories");
      }
    } catch (error) {
      console.error("Error deleting Categories:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateCategories = async (categoriesData) => {
    console.log("Create role data:", categoriesData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (categories) => {
    setSelectedCategories(categories);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateCategories = async (categoriesId, categoriesData) => {
    console.log("Update Categories data:", categoriesData);
    handleCloseUpdateModal();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/categories", {
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
        name: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.name}
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
      setCategoriesData(formattedData);
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
    { Header: "Name", accessor: "name", width: "45%", align: "left" },
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
                Categories
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: categoriesData }}
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
          <MDTypography>Are you sure you want to delete this Categories?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button
            onClick={() => handleDeleteCategories(deleteCategoriesId)}
            color="primary"
            style={{ color: "#3583eb" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Role Modal */}
      <CategoriesForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateCategories}
      />

      {/* Update Role Modal */}
      <CategoriesForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(CategoriesData) => handleUpdateCategories(selectedCategories.id, CategoriesData)}
        initialData={selectedCategories}
      />
    </DashboardLayout>
  );
}

export default Categories;
