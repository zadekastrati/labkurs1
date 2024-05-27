import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/courses/DataTable";

function Categories() {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const handleOpenModal = () => {
    setNewCategory({ name: "" });
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setNewCategory({ name: "" });
    setIsEditing(false);
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const url = isEditing
      ? `http://localhost:8080/api/categories/${editingCategory.id}`
      : "http://localhost:8080/api/categories";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (response.ok) {
        handleCloseModal();
        window.location.reload();
        const updatedCategoryData = await response.json();
        setCategoryData((currentData) => {
          const newData = isEditing
            ? currentData.map((category) =>
              category.key === editingCategory.id ? { ...category, ...updatedCategoryData } : category
              )
            : [...currentData, formattedNewCategory(updatedCategoryData)];

          console.log("New data array after update:", newData); // Log to verify the immediate update
          return newData;
        });
        setRenderKey((prevKey) => prevKey + 1); // This is one way to force a rerender
        setOpenModal(false);
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/categories/${deletingCategory.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCategoryData((currentData) =>
          currentData.filter((category) => category.id !== deletingCategory.id)
        );
        setOpenDeleteDialog(false);
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenDeleteDialog = (category) => {
    setDeletingCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeletingCategory(null);
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/categories");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCategoryData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { Header: "Category Name", accessor: "name", align: "left" },
    { Header: "Action", accessor: "action", align: "right" },
  ];

  const rows = categoryData.map((category) => ({
    name: (
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" fontWeight="medium">
          {category.name}
        </MDTypography>
      </MDBox>
    ),
    action: (
      <MDBox display="flex" alignItems="center">
        <EditIcon 
        onClick={()=>handleOpenEditModal(category)}
        style={{cursor:"pointer",marginRight: "30px", fontSize: "5.5rem" }}
        />
        <DeleteIcon
        onClick={()=> handleOpenDeleteDialog(category)}
        style={{cursor:"pointer", fontSize: "1.5rem"}}
        />
        </MDBox>
    ),
  }));

  const handleOpenEditModal = (category) => {
    setNewCategory({ name: category.name });
    setEditingCategory(category);
    setIsEditing(true);
    setOpenModal(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Button onClick={handleOpenModal} variant="contained" color="inherit" sx={{ ml: 2 }}>
        Create
      </Button>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? "Update" : "Create"}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the category "{deletingCategory?.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
                    table={{ columns, rows }}
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
    </DashboardLayout>
  );
}

export default Categories;
