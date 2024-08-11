import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function RoleForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || { title: "" });

  useEffect(() => {
    if (!initialData && open) {
      // Reset formData to an empty object when opening form to create a new role
      setFormData({ title: "" });
    } else if (initialData) {
      // Set formData to initialData when opening form to edit an existing role
      setFormData(initialData);
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        handleClose();
        onSubmit(data);
      } else {
        throw new Error("Failed to create role");
      }
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      
      // Ensure the token is present
      if (!token) {
        throw new Error('No token found in localStorage or sessionStorage');
      }
  
      const response = await fetch(
        `http://localhost:8080/api/roles/${initialData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,  // Include the Authorization header
          },
          body: JSON.stringify(formData),
        }
      );
  
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      if (response.ok) {
        const responseBody = await response.text();
        let data = {};
        if (responseBody) {
          data = JSON.parse(responseBody);
        }
        onSubmit(data);
        handleClose();
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to update role: ${response.status} ${response.statusText} - ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };  
  
  const handleSubmit = () => {
    if (initialData) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="false"
      PaperProps={{
        style: {
          width: "30vw",
          maxWidth: "none",
          position: "absolute",
          top: "10%",
        },
      }}
    >
      <DialogTitle>{initialData ? "Edit Role" : "Create Role"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          style={{ color: "#3583eb" }}
        >
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoleForm;
