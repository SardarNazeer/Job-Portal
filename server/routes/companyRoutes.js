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


const router = express.Router()

// Register a company 

router.post('/register', upload.single('image'), registerCompany)

// Company login 

router.post('/login', loginCompany)

// Get company data 

router.post('/company', getCompanyData)

// post a job 

router.post('/post-job', postJob)

// Get applicant data of company 

router.get('/applicants', getCompanyJobApplicants)

// Get company job list 

router.get('/list-jobs', getCompanyPostedJob)

// Change application status

router.post('/change-status', ChangeJobApplicationStatus)

//Change applicant visibility

router.get('/change-visibility', changeVisibility)

export default router