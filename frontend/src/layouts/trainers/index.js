import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDBadge from "@mui/material/Badge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/trainers/DataTable";

function Trainers() {
  const [trainersData, setTrainerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/trainers")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        const formattedData = data.map((item) => ({
          trainer: (
            <Author name={item.name} specialization={item.specialization} />
          ),
          specialization: (
            <MDBox ml={2}>
              <MDBadge badgeContent={item.role} color="info" variant="gradient" size="sm" />
            </MDBox>
          ),
          action: (
            <MDBox display="flex" alignItems="center">
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                Edit
              </MDTypography>
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }}>
                Delete
              </MDTypography>
            </MDBox>
          ),
        }));
        setTrainerData(formattedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{specialization}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Trainer", accessor: "trainer", width: "45%", align: "left" },
    { Header: "Specialization", accessor: "specialization", align: "left" },
    { Header: "Action", accessor: "action", align: "right" }
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Button component="a" variant="contained" color="inherit" sx={{ ml: 2 }}>
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
                  Trainers
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: trainersData }}
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

export default Trainers;
