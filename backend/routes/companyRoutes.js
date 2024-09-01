import express from "express"
import {createCompany,getAllCompanies,getCompany,updateCompany ,deleteCompany} from '../controllers/companyController.js'

const companyRouter=express.Router()

companyRouter.get("/details",getAllCompanies)
companyRouter.get("/:id",getCompany)
companyRouter.post("/create",createCompany)
companyRouter.patch("/:id",updateCompany)
companyRouter.delete("/:id",deleteCompany)

export default companyRouter
