import User from "../models/userModel.js"
import { createToken } from "../utilities/jwt.js"
import {sendEmail} from "../utilities/email.js"

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.create({
            name, email, password
        })

        const option={
            from:process.env.EMAIL,
            to:email,
            subject:"Welcome to our platform",
            html:`<h1>Welcome ${name}</h1>
            <h1>Thanks for registering on our paltform</h1>
            <p>Now you can login to our platform with your email and password</p> 
            <p>Thanks</p>`
          
        }
        sendEmail(option)
        return res.status(201).send({ message: "User registered successfully" })
    } catch (error) {
        return res.status(500).send({ message: "Error in registering user", error: error.message })
    }
}
const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({})
        return res.status(200).send(users)
        
    } catch (error) {
        return res.status(500).send({message:"Error in getting Companies",error:error.message})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const passwordMatch = await user.matchPassword(password);
        if (!passwordMatch) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const token = createToken({ id: user._id });
        console.log("Generated Token:", token); // Debugging log
        
        res.cookie("authToken", token, {
            path: "/",
            expires: new Date(Date.now() + 3600000), // 1 hour
            secure: false, // Use true if using HTTPS
            httpOnly: true,
            sameSite: "Lax"
        });

        console.log("Token set in cookie:", token); // Debugging log

        return res.status(200).send({ message: "User logged in successfully", token });
    } catch (error) {
        return res.status(500).send({ message: "Error in signing in user", error: error.message });
    }
};


const logOut=async(req,res)=>{
    res.clearCookie("authToken")
    return res.status(200).send({message:"User Logged Out successfully"})
}
const deleteUser=async(req,res)=>{
    try {
        console.log(req.user);
        const{id}=req.params
        const user=await User.findByIdAndDelete(id)
        if(!user){
            return res.status(400).send({message:"User not found"})
        }
        return res.status(200).send({message:"Deleted User successfully"})
        
    } catch (error) {
        return res.status(500).send({ message: "Error in deleting user", error: error.message })

    }
}

export { register, login ,logOut,deleteUser,getAllUsers}
