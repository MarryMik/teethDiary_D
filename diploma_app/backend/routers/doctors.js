import express from "express";
const router =express.Router();
import { createDoctor } from "../controllers/doctor.js";
//CREATE
router.post('/', createDoctor);
export default router;