import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/roles/DataTable";
import { Link } from "react-router-dom";


function Roles() {
  const [roleData, setRoleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleDeleteRole = (roleId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this role?');
    
    if (!isConfirmed) {
      return;
    }
  
    fetch(`http://localhost:8080/api/roles/${roleId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete role');
        }
        // Remove the deleted role from roleData state
        setRoleData((prevData) => prevData.filter((item) => item.id !== roleId));
      })
      .catch((error) => {
        console.error('Error deleting role:', error);
        // Handle error
      });
  }; 
  

  useEffect(() => {
    fetch("http://localhost:8080/api/roles")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        const formattedData = data.map((item) => ({
          title: <Author title={item.title} />,
          action: (
            <MDBox display="flex" alignItems="center">
              <Button
                component={Link}
                to={`/update_role/${item.id}`}
                variant="caption"
                fontWeight="medium"
                sx={{ ml: 1 }}
              >
                Edit
              </Button>

              <Button
                variant="caption"
                fontWeight="medium"
                sx={{ ml: 1 }}
                onClick={() => handleDeleteRole(item.id)}
              >
                Delete
              </Button>
            </MDBox>
          ),
        }));
        setRoleData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const Author = ({ title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Title", accessor: "title", width: "45%", align: "left" },
    { Header: "Action", accessor: "action", align: "right" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Button component={Link} to="/create_role" variant="contained" color="inherit" sx={{ ml: 2 }}>
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
                  table={{
                    columns,
                    rows: roleData,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                  actions={{
                    delete: (item) => (
                      <Button
                        variant="caption"
                        fontWeight="medium"
                        sx={{ ml: 1 }}
                        onClick={() => handleDeleteRole(item.id)}
                      >
                        Delete
                      </Button>
                    ),
                  }}
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

export default Roles;
