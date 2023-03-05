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
        localStorage.setItem("namaPetugas", JSON.stringify(response.data.userData.nama_petugas));
        localStorage.setItem("telp", JSON.stringify(response.data.userData.telp));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("idPetugas");
  localStorage.removeItem("level");
};

const UpdatePetugas = async (
  id_petugas,
  password,
) => {
  return axios
    .put(API_URL + "/api/admin/updatePetugas", {
      id_petugas: parseInt(id_petugas),
      password: password,
    })
    .then((response) => {
      // console.log(response)
      if (response.status == 200) {
      }

      return response;
    });
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

const getCurrentName = () => {
  return JSON.parse(localStorage.getItem("namaPetugas"));
};

const getCurrentTelp = () => {
  return JSON.parse(localStorage.getItem("telp"));
};
const authService = {
  signup,
  login,
  logout,
  getCurrentAccessToken,
  getCurrentIdPetugas,
  getCurrentLevel,
  UpdatePetugas,
  getCurrentName,
  getCurrentTelp
};

export default authService;
