import express from "express";

import { 
    UserAttendance,
    getAllAttendance
} from "../Controller/AttendanceController.js";

const router = express.Router();

//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Adding VerifyToken For Protect the route
router.post('/api/user/attendance', VerifyToken, UserAttendance);
router.get('/api/admin/allAttendance', VerifyToken, getAllAttendance);

export default router;
