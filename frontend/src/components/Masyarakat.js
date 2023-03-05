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

  const updateVerifAkun = (nik, verifikasi) => {
    const Nik = nik.toString()
    pengaduanService.updateVerifAkun(Nik, verifikasi)
    window.location.reload();
  }

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
          navigate("/");
          window.location.reload();
        }
      }
    );

    const accessToken = AuthService.getCurrentAccessToken();
    const level = AuthService.getCurrentLevel();


    if(!accessToken){
      navigate("/");
    }

    if(level == 'petugas'){
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NIK</TableCell>
              <TableCell align="center">Nama Lengkap</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Telepon</TableCell>
              <TableCell align="center">Verifikasi</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMasyarakat.map((row) => (
              <TableRow
                key={row.nik}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nik}
                </TableCell>
                <TableCell align="center">{row.nama}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.telp}</TableCell>
                <TableCell align="center">{row.verifikasi}</TableCell>
                <TableCell align="center">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" className="btn btn-success" onClick={() => {updateVerifAkun(row.nik, "terverifikasi")}}>
                    Aktifkan
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => {updateVerifAkun(row.nik, "banned")}}>
                      Non Aktifkan
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Masyarakat;
