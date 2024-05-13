import React, { useState, useEffect,useCallback } from "react";
import { Dialog, DialogContent, TextField, DialogActions } from '@mui/material';
import { debounce } from 'lodash';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDBadge from "@mui/material/Badge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/courses/DataTable";

function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // State for controlling modal visibility
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [renderKey, setRenderKey] = useState(0);

  const handleOpenModal = () => {
    setNewCourse({ title: '', description: '' });  // Reset the form fields
    setIsEditing(false);  // Ensure we're not in editing mode
    setOpenModal(true);
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prevState => ({ ...prevState, [name]: value }));
  };
 
  const handleSubmit = async () => {
    const url = isEditing ? `http://localhost:8080/api/courses/${editingCourse.id}` : 'http://localhost:8080/api/courses';
    const method = isEditing ? 'PUT' : 'POST';
  
    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCourse)
        });

        if (response.ok) {
            const responseData = await response.text(); // Get response text

            // Check if response data is not empty
            const updatedCourseData = responseData ? JSON.parse(responseData) : {};

            setCourseData(currentData => {
                const newData = isEditing ? 
                    currentData.map(course => 
                        course.key === editingCourse.id ? {...course, ...updatedCourseData} : course
                    ) : 
                    [...currentData, formattedNewCourse(updatedCourseData)];
                
                console.log("New data array after update:", newData); // Log to verify the immediate update
                return newData;
            });
            
            setRenderKey(prevKey => prevKey + 1); // This is one way to force a rerender
            setOpenModal(false);  // Close the modal after successful operation
            
            // Reload the page
            window.location.reload();
        } else {
            console.error("HTTP error:", response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
  
  const handleCloseModal = () => {
    setNewCourse({ title: '', description: '' }); // Reset the form to initial state
    setIsEditing(false); // Ensure we're not in editing mode
    setOpenModal(false); // Close the modal
  };
  
  
  
  const formattedNewCourse = (courseData) => ({
    key: courseData.id,
    courses: (
      <MDBox display="flex" alignItems="center">
        <MDTypography display="block" variant="button" fontWeight="medium">
          {courseData.title}
        </MDTypography>
      </MDBox>
    ),
    description: (
      <MDBox display="flex" alignItems="center">
        <MDTypography display="block" variant="button" fontWeight="medium">
          {courseData.description}
        </MDTypography>
      </MDBox>
    ),
    action: (
      <MDBox display="flex" alignItems="center">
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => handleOpenEditModal(courseData)}>
          Edit
        </MDTypography>
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }} onClick={() => handleDeleteClick(courseData.id)}>
          Delete
        </MDTypography>
      </MDBox>
    ),
  });  
 useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true); // Set loading to true at the start of the fetch
    try {
      const response = await fetch("http://localhost:8080/api/courses");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      const formattedData = data.map((item) => ({
        key: item.id,
        courses: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.title}
            </MDTypography>
          </MDBox>
        ),
        description: (
          <MDBox display="flex" alignItems="center">
            <MDTypography display="block" variant="button" fontWeight="medium">
              {item.description}
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => handleOpenEditModal(item)}>
              Edit
            </MDTypography>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }} onClick={() => handleDeleteClick(item.id)}>
              Delete
            </MDTypography>
          </MDBox>
        ),
      }));
      setCourseData(formattedData); // Update the state with formatted data
      setIsLoading(false); // Set loading to false after the data is loaded
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error); // Set the error state
      setIsLoading(false); // Ensure loading is set to false on error
    }
  };

  fetchData();
}, []); // Empty dependency array ensures this effect only runs once when the component mounts

useEffect(() => {
  console.log("Course data updated:", courseData);
}, [courseData]);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
const [selectedCourseId, setSelectedCourseId] = useState(null);

const handleDeleteClick = useCallback((courseId) => {
  console.log("Deleting course with ID:", courseId);
  setOpenConfirmDialog(true);
  setSelectedCourseId(courseId);
}, []); // No dependencies are listed here.

const cancelDelete = () => {
  setOpenConfirmDialog(false);
};
const handleDelete = async (courseId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(`Delete response for ${courseId}: Success`);
      setCourseData(prevCourses => {
        const updatedCourses = prevCourses.filter(course => course.key !== courseId);
        console.log('Updated courses data:', updatedCourses);
        return updatedCourses;
      });
      setOpenConfirmDialog(false);
    } else {
      throw new Error('Failed to delete the course');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
 const proceedDelete = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/courses/${selectedCourseId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Use the correct property (`key` instead of `id`) to filter out the deleted course
      setCourseData(prevCourses => prevCourses.filter(course => course.key !== selectedCourseId));
      setOpenConfirmDialog(false); // Close the confirmation dialog after successful deletion
    } else {
      throw new Error('Failed to delete the course');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const handleOpenEditModal = (course) => {
  setNewCourse({ title: course.title, description: course.description });
  setEditingCourse(course);
  setIsEditing(true);
  setOpenModal(true);
};

  const Author = ({ name,description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {description}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Courses", accessor: "courses", width: "45%", align: "left" },
    { Header: "Description", accessor: "description", align: "left" },
    { Header: "Action", accessor: "action", align: "right" }
  ];
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
            id="title"
            label="Course Title"
            type="text"
            fullWidth
            variant="outlined"
            name="title"
            value={newCourse.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="description"
            value={newCourse.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEditing ? "Update" : "Create"}</Button>
        </DialogActions>
      </Dialog>
      {/* Confirmation Dialog for Deleting a Course */}
    <Dialog open={openConfirmDialog} onClose={cancelDelete}>
      <DialogContent>
        Are you sure you want to delete this course?
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDelete}>No</Button>
        <Button onClick={proceedDelete} color="primary">Yes</Button>
      </DialogActions>
    </Dialog>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <MDTypography variant="h6" color="white">Courses</MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                  key={renderKey}
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
    </DashboardLayout>
  );
}
  export default Courses;
