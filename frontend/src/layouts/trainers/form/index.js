import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function TrainerForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || { trainersName: "", specialization: "" });

  useEffect(() => {
    if (!initialData && open) {
      // Reset formData to an empty object when opening form to create a new trainer
      setFormData({ trainersName: "",  specialization: "" });
    } else if (initialData) {
      // Set formData to initialData when opening form to edit an existing trainer
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
      const response = await fetch("http://localhost:8080/api/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` // Include token
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error("Failed to create trainer");
      }
    } catch (error) {
      console.error("Error creating trainer:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/trainers/${initialData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` // Include token
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error("Failed to update trainer");
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
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
      <DialogTitle>{initialData ? "Edit Trainer" : "Create Trainer"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="trainersName"
          label="Trainers Name"
          fullWidth
          value={formData.trainersName}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="specialization"
          label="Specialization"
          fullWidth
          value={formData.specialization}
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

export default TrainerForm;
