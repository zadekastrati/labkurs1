// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Author = ({ studentsName, courseType }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar name={name} size="sm" /> */}
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {studentsName}
        </MDTypography>
        <MDTypography variant="caption">{courseType}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "certificate", accessor: "certificate", width: "45%", align: "left" },
      { Header: "courseType", accessor: "courseType", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: [
      {
        certificate: <Author studentsName="John Michael" courseType="john@creative-tim.com" />,
        role: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="trainer" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
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
        certificate: <Author studentsName="John Michael" courseType="john@creative-tim.com" />,
        role: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="student" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
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
