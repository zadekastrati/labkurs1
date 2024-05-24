import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function CityForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || { name: "" });

  useEffect(() => {
    if (!initialData && open) {
      // Reset formData to an empty object when opening form to create a new city
      setFormData({ name: "" });
    } else if (initialData) {
      // Set formData to initialData when opening form to edit an existing city
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
      const response = await fetch("http://localhost:8080/api/city", { // Change port to 8080
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        handleClose();
        onSubmit(data);
      } else {
        throw new Error("Failed to create city");
      }
    } catch (error) {
      console.error("Error creating city:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/city/${initialData.id}`, // Change port to 8080
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        window.location.reload(); // Reload the page
        handleClose();
        onSubmit(data);
        const data = await response.json();
      } else {
        throw new Error("Failed to update city");
      }
    } catch (error) {
      console.error("Error updating city:", error);
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
      <DialogTitle>{initialData ? "Edit City" : "Create City"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          fullWidth
          value={formData.name}
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

export default CityForm;
