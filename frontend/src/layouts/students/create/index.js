import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Form } from "react-bootstrap";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

function CreateStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", city: "", age: "" });
  const [showSuccessAlert, setShowSuccessAlert] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create student");
      }

      // Show success alert message
      setShowSuccessAlert(true);

      navigate("/students");

      // Handle success
      console.log("Student created successfully");
    } catch (error) {
      // Handle error
      console.error("Error creating student:", error.message);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mt-5 mb-5">
        <h2 className="mb-5">Create a New Student</h2>
        <Form onSubmit={handleSubmit}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="First Name"
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Last Name"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="City"
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="number"
              label="Age"
              fullWidth
              name="age"
              value={formData.age}
              onChange={handleInputChange}
            />
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" type="submit" color="info">
              Create
            </MDButton>
          </MDBox>
        </Form>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateStudent;

