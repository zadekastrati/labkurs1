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

function CertificateForm({ open, handleClose, onSubmit, initialData }) {
  const [selectedOption] = useState(null);
  const [formData, setFormData] = useState(
    initialData || { studentsName: "", courseType: "", date: "", trainer: "" }
  );
  const [trainers, setTrainers] = useState([]);
  const trainersArray = [];
  trainers.forEach((trainer) => {
    trainersArray.push({ value: trainer.id, label: trainer.trainersName });
  });

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ trainersName: "", studentsName: "", courseType: "", date: "", trainer: "" });
    } else if (initialData) {
      setFormData(initialData);
    }
    fetchTrainers();
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTrainerChange = (e) => {
    const value = e.value;
    setFormData((prevData) => ({
      ...prevData,
      trainerId: value,
    }));
  };

  const handleCreateCertificate = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/certificates", {
        method: "POST",
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
        throw new Error("Failed to create certificate");
      }
    } catch (error) {
      console.error("Error creating certificate:", error);
    }
  };

  const handleUpdateCertificate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/certificates/${initialData.id}`, {
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
        throw new Error("Failed to update certificate");
      }
    } catch (error) {
      console.error("Error updating certificate:", error);
    }
  };

  const handleSubmit = async () => {
    if (initialData) {
      await handleUpdateCertificate();
    } else {
      await handleCreateCertificate();
    }
    // Refetch data after creating/updating certificate
    fetchTrainers();
    handleClose();
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/trainers", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTrainers(data); // Assuming trainers are stored in the database with properties: id and title
      } else {
        throw new Error("Failed to fetch trainers");
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  };

  return (
    <Dialog
      id="certificatesModal"
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
      <DialogTitle>{initialData ? "Edit Certificate" : "Create Certificate"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="studentsName"
          label="Students Name"
          fullWidth
          value={formData.studentsName}
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
          fullWidth
          value={formData.date}
          onChange={handleChange}
        />

        <div className="App">
          <Select
            margin="dense"
            name="trainerId"
            label="Trainer"
            fullWidth
            defaultValue={selectedOption}
            onChange={handleTrainerChange}
            options={trainersArray}
            menuPortalTarget={document.getElementById("certificatesModal")}
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

export default CertificateForm;
