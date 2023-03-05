import React, { useState, useEffect } from "react";
import pengaduanService from "../services/pengaduan.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
//Moment Date
import moment from "moment/moment";

const Tanggapan = () => {
  const [allpengaduan, setAllPengaduan] = useState([]);
  const [pengaduanById, setPengaduanById] = useState(null);
  const [statusPengaduanById, setStatusPengaduanById] = useState(null);
  const [idPengaduan, setIdPengaduan] = useState("");
  const [status, setStatus] = useState("");
  const [idPetugas, setIdPetugas] = useState("");
  const [accessToken, setCurrentAccessToken] = useState(undefined);
  const [level, setCurrentLevel] = useState(undefined);

  //State untuk send tanggapan
  const [tanggapan, setTanggapan] = useState("");

  const navigate = useNavigate();

  const today = new Date();

  useEffect(() => {
    const accessToken = AuthService.getCurrentAccessToken();
    const id_petugas = AuthService.getCurrentIdPetugas();
    const level = AuthService.getCurrentLevel();

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

    if (accessToken) {
      setCurrentAccessToken(accessToken);
      setIdPetugas(id_petugas);
      setCurrentLevel(level);
    }

    if (!accessToken) {
      navigate("/");
    }

    if(level != 'admin'){
      navigate("/updatetanggapan");
    }
  }, []);

  const checkStatusPengaduan = () => {
    pengaduanService.GetPengaduanById(idPengaduan).then(
      (response) => {
        setPengaduanById(response.data[0]);
        setStatusPengaduanById(response.data[0].status);
      },
      (error) => {
        // console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/");
          window.location.reload();
        }
      }
    );
  };

  const SendTanggapan = async (e) => {
    e.preventDefault();
    try {
      await pengaduanService
        .SendTanggapan(idPengaduan, idPetugas, tanggapan, today)
        .then(
          (response) => {
            if (response.status == 200) {
              pengaduanService.updateStatusPengaduan(idPengaduan, status);
              alert("Anda berhasil memberikan tanggapan");
              navigate("/pengaduan");
              window.location.reload();
            }
          },
          (error) => {
            // console.log(error)
            // alert(error.response.data.message);
          }
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <select
        class="form-select"
        aria-label="Default select example"
        onChange={(id_pengaduan) => setIdPengaduan(id_pengaduan.target.value)}
        onClick={checkStatusPengaduan}
      >
        <option selected>Pilih Pengaduan yang ingin ditanggapi</option>
        {allpengaduan.map((row) => (
          <>
            <option value={row.id_pengaduan}>
              {row.author.nama} | {row.author.nik} | {row.jdl_laporan} |{" "}
              {moment(row.tgl_pengaduan).format("MMMM Do YYYY")} | {row.lokasi}{" "}
              | {row.status}
            </option>
          </>
        ))}
      </select>

      <div className="checkStatus">
        {level == "admin" && (
          <div className="checkStatus">
            {statusPengaduanById == "Tertunda" && (
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(status) => setStatus(status.target.value)}
              >
                <option selected>Pilih Status Pengaduan</option>
                <option value="Proses">Proses</option>
                {/* <option value="Selesai">Selesai</option> */}
              </select>
            )}

            {statusPengaduanById == "Proses" && (
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(status) => setStatus(status.target.value)}
                disabled
              >
                <option selected>Pilih Status Pengaduan</option>
                {/* <option value="Proses">Proses</option> */}
                <option value="Selesai">Selesai</option>
              </select>
            )}

            {statusPengaduanById == "Selesai" && (
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(status) => setStatus(status.target.value)}
                disabled
              >
                <option selected>Pilih Status Pengaduan</option>
                {/* <option value="Proses">Proses</option> */}
                {/* <option value="Selesai">Selesai</option> */}
              </select>
            )}
          </div>
        )}

        {level == "petugas" && (
          <div className="checkStatus">
            {statusPengaduanById == "Tertunda" && (
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(status) => setStatus(status.target.value)}
                disabled
              >
                <option selected>Pilih Status Pengaduan</option>
                <option value="Proses">Proses</option>
                {/* <option value="Selesai">Selesai</option> */}
              </select>
            )}

            {statusPengaduanById == "Proses" && (
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(status) => setStatus(status.target.value)}
              >
                <option selected>Pilih Status Pengaduan</option>
                {/* <option value="Proses">Proses</option> */}
                <option value="Selesai">Selesai</option>
              </select>
            )}

            {statusPengaduanById == "Selesai" && (
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(status) => setStatus(status.target.value)}
                disabled
              >
                <option selected>Pilih Status Pengaduan</option>
                {/* <option value="Proses">Proses</option> */}
                {/* <option value="Selesai">Selesai</option> */}
              </select>
            )}
          </div>
        )}
      </div>

      <div className="textAreaTanggapan">
        {level == "admin" && (
          <div>
            {statusPengaduanById == null && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                  disabled
                ></textarea>
              </div>
            )}

            {statusPengaduanById == "Tertunda" && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                ></textarea>
              </div>
            )}

            {statusPengaduanById == "Proses" && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                  disabled
                ></textarea>
              </div>
            )}

            {statusPengaduanById == "Selesai" && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                  disabled
                ></textarea>
              </div>
            )}
          </div>
        )}

        {level == "petugas" && (
          <div>
            {statusPengaduanById == null && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                  disabled
                ></textarea>
              </div>
            )}

            {statusPengaduanById == "Tertunda" && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                  disabled
                ></textarea>
              </div>
            )}

            {statusPengaduanById == "Proses" && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                ></textarea>
              </div>
            )}

            {statusPengaduanById == "Selesai" && (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Tanggapan
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={tanggapan}
                  onChange={(e) => setTanggapan(e.target.value)}
                  disabled
                ></textarea>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="btnKirimTanggapn">
        {level == "admin" && (
          <div>
            {statusPengaduanById == null && (
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={SendTanggapan}
                  disabled
                >
                  Kirim Tanggapan
                </button>
              </div>
            )}

            {statusPengaduanById == "Tertunda" && (
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={SendTanggapan}
                >
                  Kirim Tanggapan
                </button>
              </div>
            )}

            {statusPengaduanById == "Proses" && (
              <button
                type="button"
                class="btn btn-primary"
                onClick={SendTanggapan}
                disabled
              >
                Kirim Tanggapan
              </button>
            )}

            {statusPengaduanById == "Selesai" && (
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={SendTanggapan}
                  disabled
                >
                  Kirim Tanggapan
                </button>
              </div>
            )}
          </div>
        )}

        {level == "petugas" && (
          <div>
            {statusPengaduanById == null && (
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={SendTanggapan}
                  disabled
                >
                  Kirim Tanggapan
                </button>
              </div>
            )}

            {statusPengaduanById == "Tertunda" && (
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={SendTanggapan}
                  disabled
                >
                  Kirim Tanggapan
                </button>
              </div>
            )}

            {statusPengaduanById == "Proses" && (
              <button
                type="button"
                class="btn btn-primary"
                onClick={SendTanggapan}
              >
                Kirim Tanggapan
              </button>
            )}

            {statusPengaduanById == "Selesai" && (
              <div class="mb-3">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={SendTanggapan}
                  disabled
                >
                  Kirim Tanggapan
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Tanggapan;
