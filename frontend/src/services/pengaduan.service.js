import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3303/api";

const ApiManager = axios.create({
  baseURL: "http://169.254.176.137:3303/api",
  responseType: "json",
  withCredentials: true,
});

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

const updateVerifAkun = (nik, verifikasi) => {
  return axios.put(API_URL + "/petugas/updateStatusVerifikasi", {
    nik: nik,
    verifikasi: verifikasi,
  });
};

const updateStatusPengaduan = (id_pengaduan, status) => {
  return axios.put(API_URL + "/petugas/updateStatusPengaduan", {
    id_pengaduan: parseInt(id_pengaduan),
    status: status,
  });
  // console.log({id_pengaduan: id_pengaduan, status: status})
};

// const hapusPetugas = async (data) => {
//   return axios
//     .delete(API_URL + "/admin/hapuspetugas", {
//       data
//     })
//     .then((response) => {
//       console.log(response)
//       if (response.status == 200) {
//         // console.log(response.data)
//       }

//       return response;
//     }).catch((err) => {
//       console.log(err)
//     }) 
// };

const hapusPetugas = async (data) => {
  try {
    const result = await ApiManager("admin/hapuspetugas", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      data: { id_petugas: data },
    });
    return result;
  } catch (error) {
    console.log(error)
    // return JSON.parse(error.request.response);
  }
};

const GetPengaduanById = (id_pengaduan) => {
  return axios.post(API_URL + "/petugas/pengaduanbyid", {
    id_pengaduan: parseInt(id_pengaduan),
  });
};

const SendTanggapan = async (
  id_pengaduan,
  id_petugas,
  tanggapan,
  tgl_pengaduan
) => {
  return axios
    .post(API_URL + "/petugas/sendTanggapan", {
      id_pengaduan: parseInt(id_pengaduan),
      id_petugas: id_petugas,
      tanggapan: tanggapan,
      tgl_tanggapan: tgl_pengaduan,
    })
    .then((response) => {
      // console.log(response)
      if (response.status == 200) {
        // console.log(response.data)
      }

      return response;
    });
};

const UpdateTanggapan = async (
  id_pengaduan,
  id_petugas,
  tanggapan,
  tgl_pengaduan
) => {
  return axios
    .put(API_URL + "/petugas/updateTanggapan", {
      id_pengaduan: parseInt(id_pengaduan),
      id_petugas: id_petugas,
      tanggapan: tanggapan,
      tgl_tanggapan: tgl_pengaduan,
    })
    .then((response) => {
      // console.log(response)
      if (response.status == 200) {
        // console.log(response.data)
      }

      return response;
    });
};

const pengaduanService = {
  getAllPengaduan,
  getAllMasyarakat,
  getAllPetugas,
  hapusPetugas,
  updateVerifAkun,
  updateStatusPengaduan,
  GetPengaduanById,
  SendTanggapan,
  UpdateTanggapan
};

export default pengaduanService;
