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

import React, { useState } from 'react';


const Course= () => {
  const [courseData, setCourseData] = useState({
    name: '',
    professor: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/courses', courseData); // Send POST request to create course
      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage('An error occurred. Please try again.'); // Display error message
    }
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={courseData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="professor">Professor:</label>
          <input type="text" id="professor" name="professor" value={courseData.professor} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={courseData.description} onChange={handleChange} required />
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default Course;