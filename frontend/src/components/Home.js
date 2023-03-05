import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import pengaduanService from "../services/pengaduan.service";

const Home = () => {
  const [pengaduan, setPengaduan] = useState([]);
  const [accessToken, setCurrentAccessToken] = useState(undefined);
  const [namaPetugas, setNamaPetugas] = useState(null);
  const [telp, setTelp] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    pengaduanService.getAllPengaduan().then(
      (response) => {
        // setPengaduan(response.data);
        // console.log(response.data)
      },
      (error) => {
        console.log(error);
      }
    );
    const accessToken = AuthService.getCurrentAccessToken();
    const nama_petugas = AuthService.getCurrentName();
    const telpon = AuthService.getCurrentTelp();

    if (accessToken) {
      setCurrentAccessToken(accessToken);
      setNamaPetugas(nama_petugas);
      setTelp(telpon)
    }
    if (!accessToken) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div class="card" style={{width: "18rem"}}>
        <img src="http://localhost:3303/images/1677721135336-rn_image_picker_lib_temp_524d2931-4299-47f9-a309-f451ea9b5994.jpg" class="card-img-top " alt="..." />
        <div class="card-body">
          <h3 class="card-title">{namaPetugas}</h3>
          <h5>Personal Contact</h5>

          <p class="card-text">
            {telp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
