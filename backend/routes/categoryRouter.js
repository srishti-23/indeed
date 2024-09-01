import express from "express"
import { getAllCategories,
    getCategory,
    updateCategory,
    createCategory,
    deleteCategory} from '../controllers/categoryController.js'

const categoryRouter=express.Router()

categoryRouter.get("/details",getAllCategories)
categoryRouter.get("/:id",getCategory)
categoryRouter.post("/create",createCategory)
categoryRouter.patch("/:id",updateCategory)
categoryRouter.delete("/:id",deleteCategory)

export default categoryRouter
