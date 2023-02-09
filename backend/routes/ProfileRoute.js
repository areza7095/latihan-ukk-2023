import express from "express";

import { 
    getProfile,
    getAllProfile
} from "../Controller/ProfileController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Adding VerifyToken For Protect the route
router.get('/api/user/profile', VerifyToken, getProfile);
router.get('/api/admin/allProfile', VerifyToken, getAllProfile);

export default router;
