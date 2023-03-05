import React, { useState, useEffect } from "react";
import pengaduanService from "../services/pengaduan.service";
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
import jsPDF from "jspdf";
import "jspdf-autotable";

const Pengaduan = () => {
  const [allpengaduan, setAllPengaduan] = useState([]);
  const [accessToken, setCurrentAccessToken] = useState(undefined);
  const [level, setCurrentLevel] = useState(undefined);

  const navigate = useNavigate();

  const baseURL = "http://localhost:3303/";

  // Init Table to PDF
  const doc = new jsPDF();

  //Init Date
  const today = new Date();

  console.log(allpengaduan);

  const generateLaporan = () => {
    doc.autoTable({ html: "#table-pengaduan" });
    doc.save(`Report Pengaduan-${moment(today).format("MMMM Do YYYY")}.pdf`);
  };

  const updateStatus = (id_pengaduan, status) => {
    pengaduanService.updateStatusPengaduan(id_pengaduan, status);
    window.location.reload();
  };

  useEffect(() => {
    pengaduanService.getAllPengaduan().then(
      (response) => {
        setAllPengaduan(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/");
          window.location.reload();
        }
      }
    );

    const accessToken = AuthService.getCurrentAccessToken();
    const level = AuthService.getCurrentLevel();

    if (accessToken) {
      setCurrentAccessToken(accessToken);
      setCurrentLevel(level);
    }

    if (!accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      {level == "admin" && (
        <Button variant="contained" className="mb-4" onClick={generateLaporan}>
          Generate Laporan
        </Button>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pengadu</TableCell>
              <TableCell>Judul Laporan</TableCell>
              <TableCell align="center">Tanggal Pengaduan</TableCell>
              <TableCell align="center">Isi Laporan</TableCell>
              <TableCell align="center">No Telepon</TableCell>
              <TableCell align="center">Foto</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Lokasi</TableCell>
              <TableCell align="center">Tanggapan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allpengaduan.map((row) => (
              <TableRow
                key={row.id_pengaduan}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.author.nama}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.jdl_laporan}
                </TableCell>
                <TableCell align="center">
                  {moment(row.tgl_pengaduan).format("MMMM Do YYYY")}
                </TableCell>
                <TableCell align="center">{row.isi_laporan}</TableCell>
                <TableCell component="th" scope="row">
                  {row.author.telp}
                </TableCell>
                <TableCell align="center">
                  <a href={baseURL + row.foto}>
                    <img
                      style={{ widows: 80, height: 80 }}
                      src={baseURL + row.foto}
                    />
                  </a>
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.lokasi}</TableCell>
                {row.tanggapan != null && (
                  <TableCell align="center">
                    {row.tanggapan.tanggapan}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <table border="solid 2px" id="table-pengaduan" hidden="true">
        <tr>
          <th>Pengadu</th>
          <th>NIK</th>
          <th>Judul Laporan</th>
          <th>Lokasi</th>
          <th>Tanggal Laporan</th>
          <th>Isi Laporan</th>
          <th>Status</th>
        </tr>

        {allpengaduan.map((row) => (
          <tr key={row.id_pengaduan}>
            <td>{row.author.nama}</td>
            <td>{row.author.nik}</td>
            <td>{row.lokasi}</td>
            <td>{row.jdl_laporan}</td>
            <td>{moment(row.tgl_pengaduan).format("MMMM Do YYYY")}</td>
            <td>{row.isi_laporan}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Pengaduan;
