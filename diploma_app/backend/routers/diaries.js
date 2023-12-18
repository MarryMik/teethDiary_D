import express from "express";
const router =express.Router();
import {  
    createDiary, 
    updateDiary, 
    deleteDiary, 
    getDiary, 
    getDiaries,
    getDiariesByUser, 
    getAccessDiaries
} from "../controllers/diary.js";
//CREATE
router.post('/', createDiary);
//GET ALL
router.get('/', getDiaries);
//GET ALL BY USER
router.get('/byUser', getDiariesByUser)
//GET
router.get('/api/:iddiary', getDiary)
//UPDATE
router.put('/api/:iddiary', updateDiary)
//DELETE
router.delete('/api/:iddiary', deleteDiary)
// GET ALL BY ACCESS
router.get('/view', getAccessDiaries)
export default router;