import mongoose from "mongoose";
 
const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Database connected`)
    } catch (error) {
        console.log("Error connecting to db",error);
    }
}
export default  connectDb