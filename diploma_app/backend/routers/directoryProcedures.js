import express from "express";
import { getDirectoryProcedures } from "../controllers/directoryProcedure.js";
const router =express.Router();
//GET ALL
router.get('/', getDirectoryProcedures);
export default router;