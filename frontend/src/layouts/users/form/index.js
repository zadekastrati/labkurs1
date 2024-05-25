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

function UserForm({ open, handleClose, onSubmit, initialData }) {
  const [selectedOption] = useState(null);
  const [formData, setFormData] = useState(
    initialData || { name: "", email: "", password: "", role: "" }
  );
  const [roles, setRoles] = useState([]);
  const rolesArray = [];
  roles.forEach((role) => {
    rolesArray.push({ value: role.id, label: role.title });
  });

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ name: "", email: "", password: "", role: "" });
    } else if (initialData) {
      setFormData(initialData);
    }
    fetchRoles();
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const value = e.value;
    setFormData((prevData) => ({
      ...prevData,
      roleId: value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
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
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${initialData.id}`, {
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
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit = async () => {
    if (initialData) {
      await handleUpdateUser();
    } else {
      await handleCreateUser();
    }
    fetchRoles();
    handleClose();
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/roles");
      if (response.ok) {
        const data = await response.json();
        setRoles(data); // Assuming roles are stored in the database with properties: id and title
      } else {
        throw new Error("Failed to fetch roles");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  return (
    <Dialog
      id='usersModal'
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
      <DialogTitle>{initialData ? "Edit User" : "Create User"}</DialogTitle>
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
          name="email"
          label="Email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <div className="App">
          <Select
            margin="dense"
            name="roleId"
            label="Role"
            fullWidth
            defaultValue={selectedOption}
            onChange={handleRoleChange}
            options={rolesArray}
            menuPortalTarget={document.getElementById('usersModal')}
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

export default UserForm;
