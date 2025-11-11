import Company from "../models/Company";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken";

// register new company 
export const registerCompany = async (req,res) => {
    const { name, email, password } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({success:false, message: "Missing Details"})
    }

     try {
    // check if company already exists
    const CompanyExists = await Company.findOne({ email });
    if (CompanyExists)
      return res.json({success:true, message: "Company already registered." });

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    await company.save();
    res.json({success:true, company:{
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
    },
    token: generateToken(company._id)
 });
  } catch (error) {
    res.json({success:false, message: "Error registering company", error });
  }
};

// login company 
export const loginCompany = async (req,res) => {
    const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (bcrypt.compare(password, company.password)) {

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } 
  else {
    res.json({success:false, message:'Invalid Email or Password'})
  }
}
  catch (error) {
    res.json({ success: false, message: "Error logging in company", error });
  }
}

// get company data
export const getCompanyData = async (req,res) => {
    
}

// post job
export const postJob = async (req, res) => {
  const { title, description, location, salary } = req.body;

  if (!companyId || !title || !description) {
    return res.json({ success: false, message: "Missing job details" });
  }

  try {
    const job = await Job.create({
      company: companyId,
      title,
      description,
      location,
      salary,
    });

    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: "Error posting job", error });
  }
};


// get company job applicants
export const getCompanyJobApplicants = async (req,res) => {
    
}

// get company posted jobs
export const getCompanyPostedJob = async (req,res) => {
    
}

// change job application data
export const ChangeJobApplicationStatus = async (req,res) => {
    
}

// change job visibility 
export const changeVisibility = async (req,res) => {
    
}
