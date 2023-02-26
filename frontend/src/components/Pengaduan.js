import React, { useState, useEffect } from "react";
import PostService from "../services/pengaduan.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

//Moment Date
import moment from "moment/moment";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

//Generate PDF
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

 



const Pengaduan = () => {
  const [allpengaduan, setAllPengaduan] = useState([]);

  const navigate = useNavigate();

  const baseURL = "http://localhost:3303/";

  // Create Document Component
 const laporanPengaduan = (
  <Document>
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text>Section #1</Text>
    </View>
    <View style={styles.section}>
      <Text>Section #2</Text>
    </View>
  </Page>
</Document>
);

 
  const generateLaporan = () => {
    ReactPDF.render(<laporanPengaduan />, `$/example.pdf`);
  };

  useEffect(() => {
    PostService.getAllPengaduan().then(
      (response) => {
        setAllPengaduan(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={generateLaporan}>
        Generate Laporan
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Judul Laporan</TableCell>
              <TableCell align="right">Tanggal Pengaduan</TableCell>
              <TableCell align="right">Isi Laporan</TableCell>
              <TableCell align="right">Foto</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allpengaduan.map((row) => (
              <TableRow
                key={row.id_pengaduan}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.jdl_laporan}
                </TableCell>
                <TableCell align="right">
                  {moment(row.tgl_pengaduan).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="right">{row.isi_laporan}</TableCell>
                <TableCell align="right">
                  <img
                    style={{ widows: 80, height: 80 }}
                    src={baseURL + row.foto}
                  />
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PDFViewer>
    <laporanPengaduan />
  </PDFViewer>
    </div>
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


export default Pengaduan;
