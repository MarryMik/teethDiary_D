import express from "express";
const router =express.Router();
import { 
    createTreatment,
    updateTreatment,
    deleteTreatment,
    getTreatment,
    getTreatments,
    getTreatmentsView
    } from "../controllers/treatments.js";
//CREATE
router.post('/', createTreatment);
//GET ALL
router.get('/', getTreatments);
//GET
router.get('/api/:idtreatment', getTreatment)
//UPDATE
router.put('/api/:idtreatment', updateTreatment)
//DELETE
router.delete('/api/:idtreatment', deleteTreatment)
// GET VIEW
router.get('/view', getTreatmentsView);
export default router;