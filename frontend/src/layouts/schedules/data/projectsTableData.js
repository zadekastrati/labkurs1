/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
=========================================================
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images (You can replace these with classroom/schedule icons or logos)
import logoClassroom from "assets/images/small-logos/logo-classroom.svg"; // Update to a relevant image if needed

export default function data() {
  const Schedule = ({ image, scheduleName, classroom }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={scheduleName} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {scheduleName} - {classroom}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Schedule", accessor: "schedule", width: "30%", align: "left" },
      { Header: "Classroom", accessor: "classroom", align: "left" },
      { Header: "Start Time", accessor: "startTime", align: "center" },
      { Header: "End Time", accessor: "endTime", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        schedule: <Schedule image={logoClassroom} scheduleName="Morning Session" classroom="Room A" />,
        classroom: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Room A
          </MDTypography>
        ),
        startTime: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            08:00 AM
          </MDTypography>
        ),
        endTime: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            10:00 AM
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
      {
        schedule: <Schedule image={logoClassroom} scheduleName="Afternoon Session" classroom="Room B" />,
        classroom: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Room B
          </MDTypography>
        ),
        startTime: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            02:00 PM
          </MDTypography>
        ),
        endTime: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04:00 PM
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      },
    ],
  };
}
