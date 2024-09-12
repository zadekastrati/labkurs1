// ScheduleForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';

function ScheduleForm({ schedule, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    scheduleName: '',
    classroomId: '',
    startTime: '',
    endTime: '',
  });
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    axios.get('/api/classrooms').then((response) => setClassrooms(response.data));
    if (schedule) {
      setFormData({
        scheduleName: schedule.scheduleName,
        classroomId: schedule.classroomId,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      });
    }
  }, [schedule]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Schedule Name"
            name="scheduleName"
            value={formData.scheduleName}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Classroom</InputLabel>
            <Select
              name="classroomId"
              value={formData.classroomId}
              onChange={handleChange}
            >
              {classrooms.map((classroom) => (
                <MenuItem key={classroom.id} value={classroom.id}>
                  {classroom.classroomName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Start Time"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="End Time"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
}

ScheduleForm.propTypes = {
  schedule: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ScheduleForm;
