import express from "express";
import { 
    SendPengaduan,
    GetAllPengaduanbyNik,
    GetAllPengaduan,
    GetAllPengaduanbyID,
    GetPengaduanbyID,
    DeletePengaduan
 } from "../Controller/PengaduanController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Send Pengaduan
router.post('/api/masyarakat/pengaduan', SendPengaduan);

//Get Pengaduan By NIK
router.get('/api/masyarakat/pengaduanallbynik', GetAllPengaduanbyNik);

//Get Pengaduan By ID
router.get('/api/masyarakat/pengaduanabyid', GetPengaduanbyID);

//Get All Pengaduan 
router.get('/api/petugas/allpengaduan', GetAllPengaduan);

//Get All Pengaduan by Id Pengaduan
router.get('/api/petugas/pengaduanbyid', GetAllPengaduanbyID);

//Delete Pengaduan
router.delete('/api/masyarakat/hapuspengaduan', DeletePengaduan)



export default router;
