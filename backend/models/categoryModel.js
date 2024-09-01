import mongoose from "mongoose";

const categorySchema= new mongoose.Schema(
    {
        name:{type:String,required:true}

    },
    {
        versionKey:false,
        timestamps:true

    }
)
const category=mongoose.model("Category",categorySchema)

export default category
