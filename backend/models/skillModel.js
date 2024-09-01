import mongoose from "mongoose";

const skillSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
    },
    {
        timestamps:true,
        versionKey:false
    }
)
const Skill=mongoose.model("Skill",skillSchema)

export default Skill