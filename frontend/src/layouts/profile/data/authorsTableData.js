// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import course1Image from "assets/images/course-1.jpg";
import course2Image from "assets/images/course-2.jpg";
import course3Image from "assets/images/course-3.jpg";

export default function data() {
  const Course = ({ image, title, description }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={title} size="sm" />
      <MDBox lineHeight={1} ml={2}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {title}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Course", accessor: "course", width: "45%", align: "left" },
      { Header: "Grade", accessor: "grade", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: [
      {
        course: <Course image={course1Image} title="Mathematics" description="Advanced calculus" />,
        grade: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="A" color="info" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }}>
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
      {
        course: <Course image={course2Image} title="Physics" description="Quantum mechanics" />,
        grade: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="B" color="warning" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }}>
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
      {
        course: <Course image={course3Image} title="Computer Science" description="Web development" />,
        grade: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="C" color="error" variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Edit
            </MDTypography>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }}>
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
    ],
  };
}
