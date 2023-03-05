import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Private from "./components/Masyarakat";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Masyarakat from "./components/Masyarakat";
import Tanggapan from "./components/Tanggapan";
import Pengaduan from "./components/Pengaduan";
import Petugas from "./components/Petugas";
import './index.css'
import UpdateTanggapan from "./components/UpdateTanggapan";
import UpdateAkun from "./components/UpdateAkunPetugas";
import UpdateAkunPetuga from "./components/UpdateAkunPetugas";
import UpdateAkunPetugas from "./components/UpdateAkunPetugas";

function App() {
  const [accessToken, setCurrentAccessToken] = useState(undefined);
  const [idPetugas, setCurrentIdPetugas] = useState(undefined);
  const [level, setCurrentLevel] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = AuthService.getCurrentAccessToken();
    const idPetugas = AuthService.getCurrentIdPetugas();
    const level = AuthService.getCurrentLevel();

    // console.log(accessToken)
    // console.log(idPetugas)
    // console.log(level)

    if (accessToken) {
      setCurrentAccessToken(accessToken);
      setCurrentIdPetugas(idPetugas);
      setCurrentLevel(level);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    navigate("/duar");
    // window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          {accessToken && (
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          )}
          {level == "admin" && (
            <div className="navbar-nav ms-auto">
              <Link to={"/petugas"} className="nav-link">
                Petugas
              </Link>
              <Link to={"/masyarakat"} className="nav-link">
                Masyarakat
              </Link>

              <Link to={"/pengaduan"} className="nav-link">
                Pengaduan
              </Link>

              <Link to={"/tanggapan"} className="nav-link">
                Tanggapan
              </Link>

              
            </div>
          )}

          {level == "petugas" && (
            <div className="navbar-nav ms-auto">
              <Link to={"/updatetanggapan"} className="nav-link">
                Tanggapan
              </Link>

              <Link to={"/pengaduan"} className="nav-link">
                Pengaduan
              </Link>
            </div>
          )}
        </div>
        <div className="navbar-nav ms-auto">
          {accessToken && (
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          ) }
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/petugas" element={<Petugas />} />
          <Route path="/masyarakat" element={<Masyarakat />} />
          <Route path="/pengaduan" element={<Pengaduan />} />
          <Route path="/updatetanggapan" element={<UpdateTanggapan />} />
          <Route path="/updateakun" element={<UpdateAkunPetugas />} />
          <Route path="/tanggapan" element={<Tanggapan />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
