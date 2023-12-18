import express  from "express";
const router = express.Router();
import {createAccess} from "../controllers/access.js"
//CREATE 
router.post('/share',createAccess);
export default router;