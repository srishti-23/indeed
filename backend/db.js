import mongoose from "mongoose";
 
const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`database connected`)
    } catch (error) {
        console.log("Error connecting to db",error);
    }
}
export default  connectDb