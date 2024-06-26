import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Button, TextField,IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/city/DataTable";
import { Link } from "react-router-dom";
import CityForm from "layouts/city/form";
import { useAuth } from "../../context/AuthContext";


function City() {
  const { user } = useAuth();
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteCityId, setDeleteCityId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false); // State for create modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // State for update modal
  const [selectedCity, setSelectedCity] = useState(null); // State to store selected role for update

  const handleOpenDeleteModal = (cityId) => {
    setDeleteCityId(cityId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteCity = async (cityId) => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/city/${cityId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        handleCloseDeleteModal();
        fetchData();
      } else {
        throw new Error("Failed to delete city");
      }
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateCity = async (cityData) => {
    // Handle creating role logic here
    console.log("Create city data:", cityData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (city) => {
    setSelectedCity(city);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateCity = async (cityId, cityData) => {
    // Handle updating role logic here
    console.log("Update city data:", cityData);
    handleCloseUpdateModal();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/city",{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Update roleData state with the new data
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
      setCityData(formattedData);
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
                  City
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: cityData }}
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
          <MDTypography>Are you sure you want to delete this city?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button
            onClick={() => handleDeleteCity(deleteCityId)}
            color="primary"
            style={{ color: "#3583eb" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Role Modal */}
      <CityForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateCity}
      />

      {/* Update Role Modal */}
      <CityForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(cityData) => handleUpdateCity(selectedCity.id, cityData)}
        initialData={selectedCity}
      />
    </DashboardLayout>
  );
}

export default City;
