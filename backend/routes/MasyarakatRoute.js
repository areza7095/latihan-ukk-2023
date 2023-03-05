import express from "express";
import { 
    GetAllMasyarakat,
    updateStatusVerifikasi
 } from "../Controller/MasyarakatController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Get All Masyarakat
router.get('/api/petugas/allmasyarakat', GetAllMasyarakat);

// Update Status Verif Masyarakat 
router.put('/api/petugas/updateStatusVerifikasi', updateStatusVerifikasi);

export default router;
