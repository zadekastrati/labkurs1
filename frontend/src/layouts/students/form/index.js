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

function StudentForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || { firstName: "", lastName: "", cityId: "" }
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (open) {
      if (!initialData) {
        setFormData({ firstName: "", lastName: "", cityId: "" });
        setSelectedOption(null);
      } else {
        setFormData(initialData);
        if (initialData.city) {
          const initialCity = {
            value: initialData.city.id,
            label: initialData.city.name,
          };
          setSelectedOption(initialCity);
        } else {
          setSelectedOption(null);
        }
      }
      fetchCities();
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
    setSelectedOption(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      cityId: selectedOption.value,
    }));
  };

  const handleCreateStudent = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/students", {
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
        throw new Error("Failed to create Student");
      }
    } catch (error) {
      console.error("Error creating Student:", error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/students/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error("Failed to update Student");
      }
    } catch (error) {
      console.error("Error updating Student:", error);
    }
  };

  const handleSubmit = async () => {
    if (initialData) {
      await handleUpdateStudent();
    } else {
      await handleCreateStudent();
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/city");
      if (response.ok) {
        const data = await response.json();
        setCities(data); // Assuming cities are stored in the database with properties: id and name
      } else {
        throw new Error("Failed to fetch cities");
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const citiesArray = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  return (
    <Dialog
      id="StudentsModal"
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
        <div className="App">
          <Select
            margin="dense"
            name="cityId"
            label="City"
            fullWidth
            value={selectedOption}
            onChange={handleCityChange}
            options={citiesArray}
            menuPortalTarget={document.getElementById('StudentsModal')}
          />
        </div>
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

export default StudentForm;
