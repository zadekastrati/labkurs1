import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Form } from "react-bootstrap";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

function UpdateRole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "" });
  const [showSuccessAlert, setShowSuccessAlert] = useState();
  const [showErrorAlert, setShowErrorAlert] = useState();

  useEffect(() => {
    // Fetch role data to populate the form
    fetchRoleData();
  }, []);

  const fetchRoleData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/roles/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch role data");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching role data:", error.message);
      setShowErrorAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/roles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      // Show success alert message
      setShowSuccessAlert(true);

      // Navigate to frontend /roles route
      navigate("/roles");

      // Handle success
      console.log("Role updated successfully");
    } catch (error) {
      // Handle error
      console.error("Error updating role:", error.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mt-5 mb-5">
        <h2 className="mb-5">Edit Role</h2>
        {showErrorAlert && (
          <MDAlert variant="danger" onClose={() => setShowErrorAlert(false)}>
            Error: Failed to fetch role data or update role.
          </MDAlert>
        )}
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
              Update
            </MDButton>
          </MDBox>
        </Form>
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default UpdateRole;
