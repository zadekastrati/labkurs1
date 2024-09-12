// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// You might not need images, so you can remove the import section if it's not used

export default function data() {
  const Classroom = ({ classroomName, location, capacity }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {classroomName}
        </MDTypography>
        <MDTypography display="block" variant="caption" color="text">
          {location} - {capacity} seats
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Classroom", accessor: "classroom", width: "40%", align: "left" },
      { Header: "Location", accessor: "location", align: "left" },
      { Header: "Capacity", accessor: "capacity", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        classroom: <Classroom classroomName="Room A" location="Building 1" capacity="30" />,
        location: "Building 1",
        capacity: "30",
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" color="text">
              <Icon>edit</Icon> Edit
            </MDTypography>
            <MDTypography component="a" href="#" color="text" sx={{ ml: 1 }}>
              <Icon>delete</Icon> Delete
            </MDTypography>
          </MDBox>
        ),
      },
      {
        classroom: <Classroom classroomName="Room B" location="Building 2" capacity="50" />,
        location: "Building 2",
        capacity: "50",
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" color="text">
              <Icon>edit</Icon> Edit
            </MDTypography>
            <MDTypography component="a" href="#" color="text" sx={{ ml: 1 }}>
              <Icon>delete</Icon> Delete
            </MDTypography>
          </MDBox>
        ),
      },
      // Add more rows as needed
    ],
  };
}
