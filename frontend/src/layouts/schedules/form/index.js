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

function ScheduleForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || { studentName: "", courseType: "", date: "", trainerId: "" }
  );
  const [trainers, setTrainers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData(initialData);
        setSelectedOption({ value: initialData.trainerId, label: initialData.trainerName });
      } else {
        setFormData({ studentName: "", courseType: "", date: "", trainerId: "" });
        setSelectedOption(null);
      }
      fetchTrainers();
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTrainerChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      trainerId: selectedOption ? selectedOption.value : "",
    }));
    setSelectedOption(selectedOption);
  };

  const handleCreateOrUpdateSchedule = async () => {
    const url = initialData
      ? `http://localhost:8080/api/schedules/${initialData.id}`
      : "http://localhost:8080/api/schedules";
    const method = initialData ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error(`Failed to ${initialData ? "update" : "create"} schedule`);
      }
    } catch (error) {
      console.error("Error:", error);
      // Consider displaying an error message to the user
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/trainers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTrainers(data.map((trainer) => ({
          value: trainer.id,
          label: trainer.trainerName,
        })));
      } else {
        throw new Error("Failed to fetch trainers");
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          position: "absolute",
          top: "10%",
        },
      }}
    >
      <DialogTitle>{initialData ? "Edit Schedule" : "Create Schedule"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="studentName"
          label="Student's Name"
          fullWidth
          value={formData.studentName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="courseType"
          label="Course Type"
          fullWidth
          value={formData.courseType}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="date"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formData.date}
          onChange={handleChange}
        />
        <Select
          name="trainerId"
          label="Trainer"
          fullWidth
          value={selectedOption}
          onChange={handleTrainerChange}
          options={trainers}
          placeholder="Select Trainer"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateOrUpdateSchedule} color="primary" style={{ color: "#3583eb" }}>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ScheduleForm;
