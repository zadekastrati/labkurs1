// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Schedule = ({ scheduleName, classroomId }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {scheduleName}
        </MDTypography>
        <MDTypography variant="caption">Classroom ID: {classroomId}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Schedule", accessor: "scheduleName", width: "45%", align: "left" },
      { Header: "Classroom ID", accessor: "classroomId", align: "left" },
      { Header: "Start Time", accessor: "startTime", align: "left" },
      { Header: "End Time", accessor: "endTime", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: [
      {
        scheduleName: <Schedule scheduleName="Morning Session" classroomId={1} />,
        startTime: "08:00 AM",
        endTime: "10:00 AM",
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
        scheduleName: <Schedule scheduleName="Afternoon Session" classroomId={2} />,
        startTime: "02:00 PM",
        endTime: "04:00 PM",
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
