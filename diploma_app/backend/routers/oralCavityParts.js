import express from "express";
const router =express.Router();
import { getAll_OCP } from "../controllers/oralCavPart.js";
//GET ALL
router.get('/', getAll_OCP);
export default router;