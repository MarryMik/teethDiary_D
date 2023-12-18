import express from "express";
const router =express.Router();
import { getBrushesByUser, deleteBrush, updateBrush, createBrush} from "../controllers/brush.js";
//GET ALL
router.get('/', getBrushesByUser);
//DELETE
router.delete('/api/:idbrush', deleteBrush); 
//UPDATE
router.put('/api/upd/:idbrush', updateBrush);
//CREATE
router.post('/',createBrush )
export default router;