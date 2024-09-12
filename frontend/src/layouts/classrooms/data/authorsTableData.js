// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const ClassroomInfo = ({ classroomName, location, capacity }) => (
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
      { Header: "Classroom", accessor: "classroomName", width: "40%", align: "left" },
      { Header: "Location", accessor: "location", align: "left" },
      { Header: "Capacity", accessor: "capacity", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: [
      {
        classroomName: <ClassroomInfo classroomName="Room A" location="Building 1" capacity="30" />,
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              sx={{ ml: 1 }}
            >
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
      {
        classroomName: <ClassroomInfo classroomName="Room B" location="Building 2" capacity="50" />,
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              sx={{ ml: 1 }}
            >
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
    ],
  };
}
