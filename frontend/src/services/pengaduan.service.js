import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3303/api";

const getAllPengaduan = () => {
  return axios.get(API_URL + "/petugas/allpengaduan");
};

// const getAllPrivatePosts = () => {
//   return axios.get(API_URL + "/private", { headers: authHeader() });
// };

const getAllMasyarakat = () => {
  return axios.get(API_URL + "/petugas/allmasyarakat");
};

const getAllPetugas = () => {
  return axios.get(API_URL + "/petugas/allpetugas");
};

const pengaduanService = {
  getAllPengaduan,
  getAllMasyarakat,
  getAllPetugas
};

export default pengaduanService;
