import Skill from '../models/skillModel.js'

const getAllSkills= async(req,res)=>{
    try {
        const skills=await Skill.find({})
        return res.status(200).send(skills)
    } catch (error) {
        return res.status(500).send({message:"Error in getting Skills",error:error.message})    }
}

const getSkill=async(req,res)=>{
    const{id}=req.params
    try {
        const skill=await Skill.findById(id)
        return res.status(200).send(skill)
    } catch (error) {
        return res.status(500).send({message:"Error in getting skill",error:error.message})
    }
}
const createSkill=async(req,res)=>{
    
    try {
        const skill=await Skill.create(req.body)
        return res.status(201).send({message:"Skill created successfully",skill})
    } catch (error) {
        return res.status(500).send({message:"Error in creating Skill",error:error.message})
    }
}
const updateSkill=async(req,res)=>{
    const{id}=req.params
    try {
        const skill=await Skill.findByIdAndUpdate(id,req.body,{
            new:true
        })
        return res.status(200).send({message:"Skill updated successfully"})
    } catch (error) {
        return res.status(500).send({message:"Error in updating Skill",error:error.message})
    }
}
const deleteSkill=async(req,res)=>{
    const{id}=req.params
    try {
        const skill=await Skill.findByIdAndDelete(id)
        return res.status(200).send({messsage:"Skill deleted successfully"})
    } catch (error) {
        return res.status(500).send({message:"Error in deleting Skill",error:error.message})
    }
}

export{
    getAllSkills,
    getSkill,
    updateSkill,
    createSkill,
    deleteSkill
}

