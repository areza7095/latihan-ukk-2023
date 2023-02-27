import express from "express";
import { 
    GetAllMasyarakat
 } from "../Controller/MasyarakatController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Get All Masyarakat
router.get('/api/petugas/allmasyarakat', GetAllMasyarakat);

export default router;
