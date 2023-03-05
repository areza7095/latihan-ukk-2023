import express from "express";
import { 
    SendPengaduan,
    GetAllPengaduan,
    GetAllPengaduanbyID,
    GetPengaduanbyID,
    GetPengaduanbyNIK,
    DeletePengaduan
 } from "../Controller/PengaduanController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Send Pengaduan
router.post('/api/masyarakat/pengaduan',VerifyToken ,SendPengaduan);

//Get Pengaduan By NIK
router.post('/api/masyarakat/allpengaduanabynik',VerifyToken, GetPengaduanbyNIK);

//Get Pengaduan By ID
router.get('/api/masyarakat/pengaduanabyid',VerifyToken, GetPengaduanbyID);

//Get All Pengaduan 
router.get('/api/petugas/allpengaduan', GetAllPengaduan);

//Get All Pengaduan by Id Pengaduan
router.post('/api/petugas/pengaduanbyid', GetAllPengaduanbyID);

//Delete Pengaduan
router.delete('/api/masyarakat/hapuspengaduan',VerifyToken, DeletePengaduan)



export default router;
