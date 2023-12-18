import express from "express";
const router =express.Router();
import { getProceduresView, deleteProcedure, createProcedure , getProceduresByRecord, updateProcedure} from "../controllers/procedure.js";
//отримання даних з представлення
router.get('/view', getProceduresView);  
//отримання процедур за записом
router.get('/view/rec', getProceduresByRecord);
//видалення
router.delete('/api/:idprocedure', deleteProcedure);
//створення
router.post('/',createProcedure);
//оновлення
router.put('/api/:idprocedure', updateProcedure );
export default router; 