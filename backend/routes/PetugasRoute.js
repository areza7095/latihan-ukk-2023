import express from "express";
import { 
    GetAllPetugas,
    DeletePetugas
 } from "../Controller/PetugasController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Get All Petugas
router.get('/api/petugas/allpetugas', GetAllPetugas);


//Delete Petugas
router.delete('/api/masyarakat/hapuspetugas', DeletePetugas)



export default router;
