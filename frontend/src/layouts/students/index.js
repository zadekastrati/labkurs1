import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/students/DataTable"; // Assuming you have a DataTable component for students
import { Link } from "react-router-dom";

function Students() {
  const [studentData, setStudentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        // Modify the data as needed to fit the DataTable component
        const formattedData = data.map((student) => ({
          firstName: student.firstName,
          lastName: student.lastName,
          city: student.city,
          age: student.age,
          action: (
            <MDBox display="flex" alignItems="center">
              <MDTypography
                component={Link}
                to={`/edit_student/${student.id}`}
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                Edit
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
                sx={{ ml: 1 }}
              >
                Delete
              </MDTypography>
            </MDBox>
          ),
        }));
        setStudentData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const columns = [
    { Header: "First Name", accessor: "firstName", width: "20%", align: "left" },
    { Header: "Last Name", accessor: "lastName", width: "20%", align: "left" },
    { Header: "City", accessor: "city", width: "20%", align: "left" },
    { Header: "Age", accessor: "age", width: "10%", align: "left" },
    { Header: "Action", accessor: "action", align: "right" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showSuccessAlert && (
        <MDAlert color="success" dismissible onClose={() => setShowSuccessAlert(false)}>
          Student created successfully
        </MDAlert>
      )}
      <Button component={Link} to="/create_student" variant="contained" color="inherit" sx={{ ml: 2 }}>
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
                  Students
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: studentData }}
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

export default Students;
