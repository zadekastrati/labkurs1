import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function StudentsForm({ open, handleClose, onSubmit, initialData, cities }) {
  const [formData, setFormData] = useState(
    initialData || { firstName: "", lastName: "", cityId: "" }
  );

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ firstName: "", lastName: "", cityId: "" });
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

  const handleCityChange = (selectedOption) => {
    const value = selectedOption.value;
    setFormData((prevData) => ({
      ...prevData,
      cityId: value,
    }));
  };

  const handleCreateStudents = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        handleClose();
        onSubmit();
      } else {
        throw new Error("Failed to create student");
      }
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const handleUpdateStudents = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/students/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.reload();
        handleClose();
        onSubmit();
      } else {
        throw new Error("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleSubmit = async () => {
    if (initialData) {
      await handleUpdateStudents();
    } else {
      await handleCreateStudents();
    }
  };

  const citiesArray = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  return (
    <Dialog
      id='studentsModal'
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
      PaperProps={{
        style: {
          width: "30vw",
          maxWidth: "none",
          position: "absolute",
          top: "10%",
        },
      }}
    >
      <DialogTitle>{initialData ? "Edit Student" : "Create Student"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />
        <Select
          margin="dense"
          name="cityId"
          label="City"
          fullWidth
          value={citiesArray.find(option => option.value === formData.cityId) || null}
          onChange={handleCityChange}
          options={citiesArray}
          menuPortalTarget={document.getElementById('studentsModal')}
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

export default StudentsForm;
