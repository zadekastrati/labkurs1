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
      const response = await fetch("http://localhost:8080/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error("Failed to create role");
      }
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/roles/${initialData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error("Failed to update role");
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
