import express from "express";
import { 
    LoginMasyarakat,
    LoginPetugas,
    RegisterMasyarakat,
    RegisterPetugas
} from "../Controller/AuthController.js";

//Init Router
const router = express.Router();

//Masyarakat
router.post('/api/masyarakat/register', RegisterMasyarakat);
router.post('/api/masyarakat/login', LoginMasyarakat);

//Petugas
router.post('/api/petugas/register', RegisterPetugas);
router.post('/api/petugas/login', LoginPetugas);

export default router;
