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

const Petugas = () => {
  const [allPetugas, setAllPetugas] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    pengaduanService.getAllPetugas().then(
      (response) => {
        setAllPetugas(response.data);
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
              <TableCell>ID Petugas</TableCell>
              <TableCell align="center">Nama Petugas</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Telepon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPetugas.map((row) => (
              <TableRow
                key={row.id_petugas}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th"  scope="row">
                  {row.id_petugas}
                </TableCell>
                <TableCell align="center">{row.nama_petugas}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.telp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Petugas;
