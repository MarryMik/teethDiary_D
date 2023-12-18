import express  from "express";
const router = express.Router();
import {  updateUser, deleteUser, getUser, getUsers , getDoctors} from "../controllers/user.js";
import { 
    verifyToken, 
    verifyUser,
    verifyAdmin,
    verifyPatient,
    verifyDoctor
} from "../utils/verifyToken.js";
//GET ALL
router.get('/', verifyAdmin, getUsers);
//GET
router.get('/api/:iduser', verifyUser, getUser)
//GET DOCTORS
router.get('/doctors', getDoctors )
//UPDATE
router.put('/api/:iduser', verifyUser, updateUser)
//DELETE
router.delete('/api/:iduser', verifyUser, deleteUser)
export default router;

