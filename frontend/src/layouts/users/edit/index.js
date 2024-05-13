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

function updateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "" });
  const [showSuccessAlert, setShowSuccessAlert] = useState();
  const [showErrorAlert, setShowErrorAlert] = useState();

  useEffect(() => {
    // Fetch user data to populate the form
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
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
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      // Show success alert message
      setShowSuccessAlert(true);

      // Navigate to frontend /users route
      navigate("/users");

      // Handle success
      console.log("User updated successfully");
    } catch (error) {
      // Handle error
      console.error("Error updating user:", error.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="container mt-5 mb-5">
        <h2 className="mb-5">Edit User</h2>
        {showErrorAlert && (
          <MDAlert variant="danger" onClose={() => setShowErrorAlert(false)}>
            Error: Failed to fetch user data or update user.
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

export default updateUser;
