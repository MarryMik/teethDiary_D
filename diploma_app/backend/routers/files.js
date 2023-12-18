import express from "express";
const router =express.Router();
import { createFile, getFile, deleteFile } from "../controllers/file.js";
//CREATE FILE
router.post('/', createFile);
//GET FILE
router.get('/', getFile);
//DELETE FILE
router.delete('/api/:idfile', deleteFile);
export default router;