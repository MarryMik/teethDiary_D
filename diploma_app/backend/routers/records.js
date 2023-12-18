import express from "express";
const router =express.Router();
import { getRecordsView, deleteRecord, createRecord, getRecordByTrtmnt, updateRecord } from "../controllers/record.js";
//GET VIEW
router.get('/view', getRecordsView);
//GET RECORDS BY TREATMENT
router.get('/view/trt', getRecordByTrtmnt );
//DELETE
router.delete('/api/:idrecord', deleteRecord);
//CREATE
router.post('/', createRecord);
//UPDATE
router.put('/api/:idrecord', updateRecord)
export default router;


