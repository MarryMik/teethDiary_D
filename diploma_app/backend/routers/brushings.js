import express from "express";
const router =express.Router();
import { getBrushingsByUser ,deleteBrushing, createBrushing, updateBrushing} from "../controllers/brushing.js";
//GET ALL
router.get('/', getBrushingsByUser);
//DELETE 
router.delete('/api/:idbrushing', deleteBrushing);
//CREATE
router.post('/', createBrushing);
//UPDATE
router.put('/api/upd/:idbrushing', updateBrushing);
export default router;