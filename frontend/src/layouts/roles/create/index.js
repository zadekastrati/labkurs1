import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Form } from "react-bootstrap";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

function CreateRole() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "" });
  const [showSuccessAlert, setShowSuccessAlert] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create role");
      }

      // Show success alert message
      setShowSuccessAlert(true);

      // Navigate to frontend /roles route
      navigate("/roles");

      // Handle success
      console.log("Role created successfully");
    } catch (error) {
      // Handle error
      console.error("Error creating role:", error.message);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mt-5 mb-5">
        <h2 className="mb-5">Create a New Role</h2>
        <Form onSubmit={handleSubmit}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Title"
              fullWidth
              name="title"
              value={formData.title}
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

export default CreateRole;
