/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/import React, { useEffect, useState } from 'react';
import axios from 'axios';

// @mui material components
import Grid from "@mui/material/Grid";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
   // State to store the counts
   const [counts, setCounts] = useState({
    courses: 0,
    trainers: 0,
    students: 0,
    users: 0
  });

  const fetchCounts = () => {
    axios.get('http://localhost:3000/api/counts')
      .then(response => {
        setCounts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the counts!', error);
      });
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  // Example function to handle adding a course
  const addCourse = (courseData) => {
    axios.post('http://localhost:3000/api/courses', courseData)
      .then(response => {
        console.log(response.data.message);
        fetchCounts();  // Fetch counts after adding a course
      })
      .catch(error => {
        console.error('There was an error adding the course!', error);
      });
  };

  // Similar functions for adding trainers, students, and users
  const addTrainer = (trainerData) => {
    axios.post('http://localhost:3000/api/trainers', trainerData)
      .then(response => {
        console.log(response.data.message);
        fetchCounts();
      })
      .catch(error => {
        console.error('There was an error adding the trainer!', error);
      });
  };

  const addStudent = (studentData) => {
    axios.post('http://localhost:3000/api/students', studentData)
      .then(response => {
        console.log(response.data.message);
        fetchCounts();
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  const addUser = (userData) => {
    axios.post('http://localhost:3000/api/users', userData)
      .then(response => {
        console.log(response.data.message);
        fetchCounts();
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="school"
                title="Courses"
                count={counts.courses}
                percentage={{ color: 'success' }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="book"
                title="Trainers"
                count={counts.trainers}
                percentage={{ color: 'success' }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="person"
                title="Students"
                count={counts.students}
                percentage={{ color: 'success' }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="All Users"
                count={counts.users}
                percentage={{ color: 'success' }}
             
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
