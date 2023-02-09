//sample Route

import express from "express";
import { 
    getUsers,
    getStudent

} from "../Controller/ExampleController.js";

const router = express.Router();


//Import Verify Token
import VerifyToken from '../Controller/VerifyTokenController.js';

//Adding VerifyToken For Protect the route
router.get('/users', VerifyToken, getUsers);
router.get('/students',VerifyToken,  getStudent);


export default router;
