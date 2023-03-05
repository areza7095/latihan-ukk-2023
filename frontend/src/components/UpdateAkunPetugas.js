import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import pengaduanService from "../services/pengaduan.service";

const UpdateAkunPetugas = () => {
  const [allPetugas, setAllPetugas] = useState([]);
  const [idPetugas, setIdPetugas] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = AuthService.getCurrentAccessToken();
    const level = AuthService.getCurrentLevel();

    if (!accessToken) {
      navigate("/");
    }

    if (level == "petugas") {
      navigate("/home");
    }

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
  }, []);

  const handleResetAkun = async (e) => {
    e.preventDefault()
    try {
      await AuthService.UpdatePetugas(idPetugas, password).then(
        (response) => {
          if (response.status == 200) {
            alert("Password Akun berhasil dirubah")
            navigate("/petugas");
            window.location.reload();
          }
        },
        (error) => {
          alert(error.response.data.message);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleResetAkun}>
        <h3>Update Password Akun Petugas</h3>
        <div class="mb-3">
        <select
        class="form-select"
        aria-label="Default select example"
        onChange={(id_petugas) => setIdPetugas(id_petugas.target.value)}
      >
        <option selected>Pilih Akun Petugas</option>
        {allPetugas.map((row) => (
          <>
            <option value={row.id_petugas}>
              {row.nama_petugas} | {row.username} | {row.telp} 
            </option>
          </>
        ))}
      </select>

        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            password
          </label>
          <input
            type="password"
            placeholder="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>


        {idPetugas == null || password == null && (
          <button type="submit" class="btn btn-success" disabled>
          Reset
        </button>
        )}

        {idPetugas != null && password != null  && (
          <button type="submit" class="btn btn-success">
          Reset
        </button>
        )}
      </form>
    </div>
  );
};

export default UpdateAkunPetugas;
