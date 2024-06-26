import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "layouts/certificates/DataTable";
import CertificateForm from "layouts/certificates/form";
import { useAuth } from "../../context/AuthContext";

function Certificates() {
  const { user } = useAuth();
  const [certificateData, setCertificateData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteCertificateId, setDeleteCertificateId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/certificates", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        certificate: <Author studentsName={item.studentsName} courseType={item.courseType} />,
        trainer: (
          <MDBox ml={2}>
            <MDBadge
              badgeContent={item.Trainer.trainersName}
              color="info"
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        action: (
          <MDBox display="flex" alignItems="center">
            {user?.role === 4 && (
              <>
                <IconButton
                  onClick={() => handleOpenUpdateModal(item)}
                  sx={{ color: "grey", "&:hover": { color: "blue" } }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleOpenDeleteModal(item.id)}
                  sx={{ color: "grey", "&:hover": { color: "red" } }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </MDBox>
        ),
      }));
      setCertificateData(formattedData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDeleteModal = (certificateId) => {
    setDeleteCertificateId(certificateId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDeleteCertificate = async (certificateId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/certificates/${certificateId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      if (!response.ok) throw new Error("Failed to delete certificate");
      setCertificateData((prevData) => prevData.filter((item) => item.id !== certificateId));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleCreateCertificate = async (certificateData) => {
    console.log("Create certificate data:", certificateData);
    handleCloseCreateModal();
    fetchData();
  };

  const handleOpenUpdateModal = (certificate) => {
    setSelectedCertificate(certificate);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const handleUpdateCertificate = async (certificateId, certificateData) => {
    console.log("Update certificate data:", certificateData);
    handleCloseUpdateModal();
    fetchData();
  };

  const Author = ({ studentsName, courseType }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {studentsName}
        </MDTypography>
        <MDTypography variant="caption">{courseType}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "Certificate", accessor: "certificate", width: "45%", align: "left" },
    { Header: "Trainer", accessor: "trainer", align: "left" },
    { Header: "Action", accessor: "action", align: "right" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {user?.role === 4 && (
        <Button onClick={handleOpenCreateModal} variant="contained" color="inherit" sx={{ ml: 2 }}>
          Create
        </Button>
      )}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Certificates
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {isLoading ? (
                  <MDTypography>Loading...</MDTypography>
                ) : error ? (
                  <MDTypography>Error: {error.message}</MDTypography>
                ) : (
                  <DataTable
                    table={{ columns, rows: certificateData }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogContent>
          <MDTypography>Are you sure you want to delete this certificate?</MDTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          <Button
            onClick={() => handleDeleteCertificate(deleteCertificateId)}
            color="primary"
            style={{ color: "#ff0000" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Certificate Modal */}
      <CertificateForm
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        onSubmit={handleCreateCertificate}
      />

      {/* Update Certificate Modal */}
      <CertificateForm
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        onSubmit={(certificateData) =>
          handleUpdateCertificate(selectedCertificate.id, certificateData)
        }
        initialData={selectedCertificate}
      />
    </DashboardLayout>
  );
}

export default Certificates;
