import express from "express";
import { 
    Login,
    Register 
} from "../Controller/AuthController.js";

//Init Router
const router = express.Router();

router.post('/api/user/register', Register);
router.post('/api/user/login', Login);

export default router;
