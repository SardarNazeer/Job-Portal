import express from "express";
import { getJobById, getJpbs } from "../controllers/jobController";

const router = express.Router();

//Routes to get all data

router.get('/',getJpbs)

// Routes to get a single job data

router.get('/:id',getJobById)

export default router;