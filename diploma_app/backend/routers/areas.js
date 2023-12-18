import express from "express";
const router =express.Router();
import { 
    verifyToken, 
    verifyUser,
    verifyAdmin,
    verifyPatient,
    verifyDoctor
} from "../utils/verifyToken.js";
import { createArea, deleteAreaByProcedure } from "../controllers/area.js";
//CREATE
router.post('/', createArea);
//DELETE
router.delete('/delete', deleteAreaByProcedure)
export default router;