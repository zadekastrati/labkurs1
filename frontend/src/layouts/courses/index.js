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
import CourseForm from "layouts/courses/form";

function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenDeleteModal = (courseId) => {
    setDeleteCourseId(courseId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCourseData((prevData) => prevData.filter((item) => item.id !== courseId));
        handleCloseDeleteModal();
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedCourse(null);
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleOpenUpdateModal = (course) => {
    setSelectedCourse(course);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdateCourse = async (courseId, courseData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      if (!response.ok) {
        throw new Error("Failed to update course");
      }
      fetchData(); // Refetch data after updating a course
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        course: <Author name={item.title} description={item.description} />,
        category: (
          <MDBox ml={2}>
            <MDBadge badgeContent={item.Category.name} />
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
      setCourseData(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          course: <Author name={item.title} description={item.description} />,
          category: (
            <MDBox ml={2}>
              <MDBadge badgeContent={item.Category.name}/>
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
        setCourseData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
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
    { Header: "course", accessor: "course", width: "45%", align: "left" },
    { Header: "category", accessor: "category", align: "left" },
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
                  Courses
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: courseData }}
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
          <MDTypography>Are you sure you want to delete this course?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button onClick={() => handleDeleteCourse(deleteCourseId)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create course Modal */}
      <CourseForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={fetchData} // Directly fetch data after creation
        categories={categories} // Pass categories to CourseForm
      />

      {/* Update course Modal */}
      <CourseForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(courseData) => handleUpdateCourse(selectedCourse.id, courseData)}
        initialData={selectedCourse}
        categories={categories} // Pass categories to CourseForm
      />
    </DashboardLayout>
  );
}

export default Courses;
