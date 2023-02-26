import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import pengaduanService from "../services/pengaduan.service";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Masyarakat = () => {
  const [allMasyarakat, setAllMasyarakat] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    pengaduanService.getAllMasyarakat().then(
      (response) => {
        setAllMasyarakat(response.data);
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NIK</TableCell>
              <TableCell align="right">Nama Lengkap</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Telepon</TableCell>
              <TableCell align="right">Verifikasi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMasyarakat.map((row) => (
              <TableRow
                key={row.nik}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nama}
                </TableCell>
                <TableCell align="right">{row.nama}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.telp}</TableCell>
                <TableCell align="right">{row.verifikasi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Masyarakat;
