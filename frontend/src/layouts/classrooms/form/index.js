import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function ClassroomForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || { classroomName: "", location: "", capacity: "" });

  useEffect(() => {
    if (!initialData && open) {
      // Reset formData to an empty object when opening form to create a new classroom
      setFormData({ classroomName: "", location: "", capacity: "" });
    } else if (initialData) {
      // Set formData to initialData when opening form to edit an existing classroom
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
      const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:8080/api/classrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        onSubmit(data); // Notify parent component of the new classroom
        handleClose();
      } else {
        throw new Error("Failed to create classroom");
      }
    } catch (error) {
      console.error("Error creating classroom:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/api/classrooms/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        onSubmit(data); // Notify parent component of the updated classroom
        handleClose();
      } else {
        throw new Error("Failed to update classroom");
      }
    } catch (error) {
      console.error("Error updating classroom:", error);
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
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          width: "30vw",
          maxWidth: "none",
          position: "absolute",
          top: "10%",
        },
      }}
    >
      <DialogTitle>{initialData ? "Edit Classroom" : "Create Classroom"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="classroomName"
          label="Classroom Name"
          fullWidth
          value={formData.classroomName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="location"
          label="Location"
          fullWidth
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="capacity"
          label="Capacity"
          fullWidth
          type="number"
          value={formData.capacity}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" style={{ color: "#3583eb" }}>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClassroomForm;
