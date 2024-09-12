// ScheduleTable.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import MDBox from 'components/MDBox';
import DataTableBodyCell from './DataTableBodyCell';
import DataTableHeadCell from './DataTableHeadCell';
import axios from 'axios'; // For making HTTP requests

function ScheduleTable({ schedules, onEdit, onDelete }) {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("none");

  const handleSort = (column) => {
    const newDirection = sortDirection === "asce" ? "desc" : "asce";
    setSortedColumn(column);
    setSortDirection(newDirection);
    // Assuming schedules are sorted by the backend
    // If sorting on frontend, use a function to sort schedules here
  };

  const sortedSchedules = [...schedules].sort((a, b) => {
    if (!sortedColumn) return 0;
    const aValue = a[sortedColumn];
    const bValue = b[sortedColumn];
    if (aValue < bValue) return sortDirection === "asce" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asce" ? 1 : -1;
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <DataTableHeadCell
              width="auto"
              sorted={sortedColumn === "scheduleName" ? sortDirection : "none"}
              align="left"
              onClick={() => handleSort("scheduleName")}
            >
              Schedule Name
            </DataTableHeadCell>
            <DataTableHeadCell
              width="auto"
              sorted={sortedColumn === "classroomName" ? sortDirection : "none"}
              align="left"
              onClick={() => handleSort("classroomName")}
            >
              Classroom
            </DataTableHeadCell>
            <DataTableHeadCell
              width="auto"
              sorted={sortedColumn === "startTime" ? sortDirection : "none"}
              align="left"
              onClick={() => handleSort("startTime")}
            >
              Start Time
            </DataTableHeadCell>
            <DataTableHeadCell
              width="auto"
              sorted={sortedColumn === "endTime" ? sortDirection : "none"}
              align="left"
              onClick={() => handleSort("endTime")}
            >
              End Time
            </DataTableHeadCell>
            <DataTableHeadCell width="auto" align="left">
              Actions
            </DataTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSchedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <DataTableBodyCell>{schedule.scheduleName}</DataTableBodyCell>
              <DataTableBodyCell>{schedule.classroom?.classroomName}</DataTableBodyCell>
              <DataTableBodyCell>{new Date(schedule.startTime).toLocaleString()}</DataTableBodyCell>
              <DataTableBodyCell>{new Date(schedule.endTime).toLocaleString()}</DataTableBodyCell>
              <DataTableBodyCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(schedule)}>Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(schedule.id)}>Delete</Button>
              </DataTableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ScheduleTable.propTypes = {
  schedules: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ScheduleTable;
