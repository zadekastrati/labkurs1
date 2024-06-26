import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function CategoriesForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || { name: "" });

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ name: "" });
    } else if (initialData) {
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
      const response = await fetch("http://localhost:8080/api/categories", {
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
        throw new Error("Failed to create Categories");
      }
    } catch (error) {
      console.error("Error creating Categories:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(
        `http://localhost:8080/api/categories/${initialData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        window.location.reload();
        handleClose();
        onSubmit(data);
        const data = await response.json();
        // onSubmit(formData);
      } else {
        throw new Error("Failed to update Categories");
      }
    } catch (error) {
      console.error("Error updating Categories:", error);
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
      <DialogTitle>{initialData ? "Edit Categories" : "Create Categories"}</DialogTitle>
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

export default CategoriesForm;
