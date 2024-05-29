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

function AssignmentForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || { name: "", description: "", courseId: "" }
  );
  const [courses, setCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Add this line to declare selectedOption

  const coursesArray = [];
  courses.forEach((course) => {
    coursesArray.push({ value: course.id, label: course.title });
  });

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ name: "", description: "", courseId: "" });
    } else if (initialData) {
      setFormData(initialData);
      setSelectedOption(coursesArray.find(option => option.value === initialData.courseId)); // Set the initial selected option
    }
    fetchCourses();
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (option) => {
    setSelectedOption(option); // Set the selected option
    setFormData((prevData) => ({
      ...prevData,
      courseId: option.value,
    }));
  };

  const handleCreateAssignment = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/assignment", {
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
        throw new Error("Failed to create assignment");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleUpdateAssignment = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/assignment/${initialData.id}`, {
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
        throw new Error("Failed to update assignment");
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  const handleSubmit = async () => {
    if (initialData) {
      await handleUpdateAssignment();
    } else {
      await handleCreateAssignment();
    }
    fetchCourses();
    handleClose();
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <Dialog
      id="assignmentsModal"
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
      <DialogTitle>{initialData ? "Edit Assignment" : "Create Assignment"}</DialogTitle>
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
            name="courseId"
            label="Course"
            fullWidth
            value={selectedOption} // Use selectedOption here
            onChange={handleCourseChange}
            options={coursesArray}
            menuPortalTarget={document.getElementById('assignmentsModal')}
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

export default AssignmentForm;
 