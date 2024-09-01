import express from "express"
import { getAllSkills,
    getSkill,
    updateSkill,
    createSkill,
    deleteSkill} from '../controllers/skillController.js'

const skillRouter=express.Router()

skillRouter.get("/details",getAllSkills)
skillRouter.get("/:id",getSkill)
skillRouter.post("/create",createSkill)
skillRouter.patch("/:id",updateSkill)
skillRouter.delete("/:id",deleteSkill)

export default skillRouter
