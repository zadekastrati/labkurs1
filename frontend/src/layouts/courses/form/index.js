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

function CourseForm({ open, handleClose, onSubmit, initialData }) {
  const [selectedOption] = useState(null);
  const [formData, setFormData] = useState(
    initialData || { title: "", description: "", category: "" }
  );
  const [categories, setCategories] = useState([]);
  const categoriesArray = [];
  categories.forEach((category) => {
    categoriesArray.push({ value: category.id, label: category.name });
  });

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ title: "", description: "", category: "" });
    } else if (initialData) {
      setFormData(initialData);
    }
    fetchCategories();
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.value;
    setFormData((prevData) => ({
      ...prevData,
      categoryId: value,
    }));
  };

  const handleCreateCourse = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses", {
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
        throw new Error("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${initialData.id}`, {
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
        throw new Error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleSubmit = async () => {
    if (initialData) {
      await handleUpdateCourse();
    } else {
      await handleCreateCourse();
    }
    fetchCategories();
    handleClose();
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <Dialog
      id='coursesModal'
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
      <DialogTitle>{initialData ? "Edit Course" : "Create Course"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Name"
          fullWidth
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <div className="App">
          <Select
            margin="dense"
            name="categoryId"
            label="Category"
            fullWidth
            defaultValue={selectedOption}
            onChange={handleCategoryChange}
            options={categoriesArray}
            menuPortalTarget={document.getElementById('coursesModal')}
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

export default CourseForm;
