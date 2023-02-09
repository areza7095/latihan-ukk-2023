import express from "express";

import { 
    SendTanggapan,
    updateTanggapan
} from "../Controller/TanggapanController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Send Tanggapan
router.post('/api/petugas/sendTanggapan', SendTanggapan);

//Update Tanggapan
router.put('/api/petugas/updateTanggapan', updateTanggapan);

export default router;
