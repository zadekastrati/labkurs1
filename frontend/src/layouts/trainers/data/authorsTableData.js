// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";


export default function data() {
  const Author = ({ trainersName }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} trainersName={trainersName} size="sm" /> */}
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {trainersName}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "trainer", accessor: "trainer", width: "45%", align: "left" },
      { Header: "specialization", accessor: "specialization", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: [
      {
        trainer: <Author trainersName="John Michael" specialization="john@creative-tim.com" />,
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
        trainer: (
          <Author
            trainersName="John Michael"
            specialization="john@creative-tim.com"
          />
        ),
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
