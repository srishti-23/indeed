import Category from "../models/categoryModel.js";

const getAllCategories=async(req,res)=>{
    try {
        const categories= await Category.find({})
        return res.status(200).send(categories)
    } catch (error) {
        return res.status(500).send({message:"Error in getting all categories",error:error.message})
        
    }
}
const getCategory=async(req,res)=>{
    const{id}=req.params
    try {
        const category=await Category.findById(id)
        return res.status(200).send(category)
    } catch (error) {
        return res.status(500).send({message:"Error in getting category",error:error.message})
    }
}
const createCategory=async(req,res)=>{
    
    try {
        const category=await Category.create(req.body)
        return res.status(201).send({message:"Category created successfully",category})
    } catch (error) {
        return res.status(500).send({message:"Error in creating Category",error:error.message})
    }
}
const updateCategory=async(req,res)=>{
    const{id}=req.params
    try {
        const category=await Category.findByIdAndUpdate(id,req.body,{
            new:true
        })
        return res.status(200).send({message:"category updated successfully"})
    } catch (error) {
        return res.status(500).send({message:"Error in updating category",error:error.message})
    }
}
const deleteCategory=async(req,res)=>{
    const{id}=req.params
    try {
        const category=await Category.findByIdAndDelete(id)
        return res.status(200).send({messsage:"Category deleted successfully"})
    } catch (error) {
        return res.status(500).send({message:"Error in deleting category",error:error.message})
    }
}

export{
    getAllCategories,getCategory,createCategory,updateCategory,deleteCategory

}