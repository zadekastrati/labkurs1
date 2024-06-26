import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

function ExamForm ({ open, handleClose, onSubmit, initialData }) {
  const [selectedOption,setSelectedOption] = useState(null);
  const [formData, setFormData] = useState(
    initialData || { name: "", course: "" }
  );
  const [courses, setCourses] = useState([]);
  const coursesArray = [];
  courses.forEach((course) => {
    coursesArray.push({ value: course.id, label: course.title });
  });

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ name: "", course: "" });
    } else if (initialData) {
      setFormData(initialData);
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

  const handleCourseChange = (e) => {
    const value = e.value;
    setFormData((prevData) => ({
      ...prevData,
      courseId: value,
    }));
  };

  const handleCreateExam = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/exam", {
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
        throw new Error("Failed to create exam");
      }
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  const handleUpdateExam = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/exam/${initialData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` 
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error("Failed to update exam");
      }
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  const handleSubmit = async () => {
    if (initialData) {
      await handleUpdateExam();
    } else {
      await handleCreateExam();
    }
    fetchCourses();
    handleClose();
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses",{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwtToken')}` // Include token
      }
    });
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
      id='examModal'
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
      <DialogTitle>{initialData ? "Edit Exam" : "Create Exam"}</DialogTitle>
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
        <div className="App">
          <Select
            margin="dense"
            name="courseId"
            label="Course"
            fullWidth
            defaultValue={selectedOption}
            onChange={handleCourseChange}
            options={coursesArray}
            menuPortalTarget={document.getElementById('examModal')}
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

export default ExamForm;