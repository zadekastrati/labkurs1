import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function UserForm({ open, handleClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || { name: "", email: "", password: "", roleId: "" }
  );
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (!initialData && open) {
      setFormData({ name: "", email: "", password: "", roleId: "" });
    } else if (initialData) {
      setFormData(initialData);
    }
    fetchRoles();
  }, [open, initialData]);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8080/api/roles", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      } else {
        throw new Error("Failed to fetch roles");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const method = initialData ? "PUT" : "POST";
      const url = initialData
        ? `http://localhost:8080/api/users/${initialData.id}`
        : "http://localhost:8080/api/users";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleClose();
        onSubmit(formData);
      } else {
        throw new Error(`Failed to ${initialData ? "update" : "create"} user`);
      }
    } catch (error) {
      console.error(`Error ${initialData ? "updating" : "creating"} user:`, error);
    }
  };

  return (
    <Dialog
      id="usersModal"
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
        <Select
          margin="dense"
          name="roleId"
          label="Role"
          fullWidth
          value={roles.find(role => role.value === formData.roleId)}
          onChange={handleRoleChange}
          options={roles.map(role => ({ value: role.id, label: role.title }))}
          menuPortalTarget={document.getElementById('usersModal')}
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

UserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default UserForm;
