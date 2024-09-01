import express from "express"
import { getAllJobs,getJob,createJob,updateJob,deleteJob} from "../controllers/jobController.js"
import { authentication } from "../middlewares/userMiddleware.js"

const jobRouter=express.Router()

jobRouter.get("/details",getAllJobs)
jobRouter.get("/:id",getJob)
jobRouter.post("/create",authentication,createJob)
jobRouter.patch("/:id",updateJob)
jobRouter.delete("/:id",deleteJob)


export default jobRouter