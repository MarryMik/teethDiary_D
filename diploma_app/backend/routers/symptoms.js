import express from "express";
const router =express.Router();
import { deleteSymptom, getSymptoms ,createSymptom} from "../controllers/symptom.js";
//GET
router.get('/', getSymptoms);
//DELETE
router.delete('/api/:idsymptom', deleteSymptom);
//CREATE
router.post('/', createSymptom);
export default router;
