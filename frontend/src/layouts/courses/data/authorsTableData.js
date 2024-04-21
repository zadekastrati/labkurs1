// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images 
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "user", accessor: "user", width: "45%", align: "left" },
      { Header: "role", accessor: "role", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: [
      {
        user: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        role: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="professor" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action:
        <MDBox display="flex" alignItems="center">
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }}>
          Delete
        </MDTypography>
      </MDBox>  
      },
      {
        user: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        role: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="student" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        action:
        <MDBox display="flex" alignItems="center">
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" sx={{ ml: 1 }}>
          Delete
        </MDTypography>
      </MDBox>      
      },
    ],
  };
}