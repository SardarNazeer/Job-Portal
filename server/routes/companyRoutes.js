import express from "express"
import {
  ChangeJobApplicationStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJob,
  loginCompany,
  postJob,
  registerCompany
} from "../controllers/companyControllers.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";


const router = express.Router()

// Register a company 

router.post('/register', upload.single('image'), registerCompany)

// Company login 

router.post('/login', loginCompany)

// Get company data 

router.post('/company', protectCompany, getCompanyData)

// post a job 

router.post('/post-job', protectCompany, postJob)

// Get applicant data of company 

router.get('/applicants', protectCompany, getCompanyJobApplicants)

// Get company job list 

router.get('/list-jobs',protectCompany, getCompanyPostedJob)

// Change application status

router.post('/change-status',protectCompany, ChangeJobApplicationStatus)

//Change applicant visibility

router.get('/change-visibility',protectCompany, changeVisibility)

export default router