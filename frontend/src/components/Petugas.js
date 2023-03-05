import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import pengaduanService from "../services/pengaduan.service";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "bootstrap";

const Petugas = () => {
  const [allPetugas, setAllPetugas] = useState([]);

  const navigate = useNavigate();

  const hapusPetugas = (id_petugas) => {
    pengaduanService.hapusPetugas(id_petugas);
    alert("Petugas Berhasil dihapus")
    window.location.reload();
  };

  const handleBuatAkunPetugas = () => {
    navigate("/signup");
  };

  const handleUpdateAkunPetugas = () => {
    navigate("/updateakun");
  };

  const updatePetugas = (id_petugas) => {
    console.log(id_petugas)
  }

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
          navigate("/");
          window.location.reload();
        }
      }
    );

    const accessToken = AuthService.getCurrentAccessToken();
    const level = AuthService.getCurrentLevel();

    if (!accessToken) {
      navigate("/");
    }

    if (level == "petugas") {
      navigate("/home");
    }
  }, []);


  return (
    <div>
        <button
          type="button"
          class="btn btn-primary mb-5"
          style={{marginRight:12}}
          onClick={handleBuatAkunPetugas}
        >
          Buat Akun Petugas
        </button>
        <button
          type="button"
          class="btn btn-success mb-5"
          onClick={handleUpdateAkunPetugas}
        >
          Update Akun Petugas
        </button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID Petugas</TableCell>
              <TableCell align="center">Nama Petugas</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Telepon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPetugas.map((row) => (
              <TableRow
                key={row.id_petugas}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id_petugas}
                </TableCell>
                <TableCell align="center">{row.nama_petugas}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.telp}</TableCell>
                <TableCell align="center">
                <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" className="btn btn-danger" onClick={() => {
                      hapusPetugas(row.id_petugas);
                    }}>
                      Hapus
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

export default Petugas;
