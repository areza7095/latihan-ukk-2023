import express from "express";

import { 
    getEreport,
    getAllEreport
} from "../Controller/EreportController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Adding VerifyToken For Protect the route
router.get('/api/user/ereport', VerifyToken, getEreport);
router.get('/api/admin/alleReport', VerifyToken, getAllEreport);

export default router;
