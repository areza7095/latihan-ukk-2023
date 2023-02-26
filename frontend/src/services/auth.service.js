import axios from "axios";

const API_URL = "http://localhost:3303";

//fix this
const signup = (namaPetugas, username, password, telp) => {
  return axios
    .post(API_URL + "/api/petugas/register", {
      nama_petugas: namaPetugas,
      username: username,
      password: password,
      telp: telp,
      level: 'petugas'
    })
    .then((response) => {
      return response.status;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/api/petugas/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.status == 200) {
        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
        localStorage.setItem("idPetugas", JSON.stringify(response.data.userData.id_petugas));
        localStorage.setItem("level", JSON.stringify(response.data.userData.level));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("idPetugas");
  localStorage.removeItem("level");
};

const getCurrentAccessToken = () => {
  return JSON.parse(localStorage.getItem("accessToken"));
};

const getCurrentIdPetugas = () => {
  return JSON.parse(localStorage.getItem("idPetugas"));
};

const getCurrentLevel = () => {
  return JSON.parse(localStorage.getItem("level"));
};
const authService = {
  signup,
  login,
  logout,
  getCurrentAccessToken,
  getCurrentIdPetugas,
  getCurrentLevel
};

export default authService;
