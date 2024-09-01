import User from "../models/userModel.js";
import { verifyToken } from "../utilities/jwt.js";

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).send({ message: "Unauthorized user" });
        }

        const decoded = verifyToken(token);
        console.log("Decoded", decoded);
        
        
        const user = await User.findOne({ _id: decoded.id });
        
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Authorization error:", error); // Additional logging
        return res.status(500).send({ message: "Error in authorizing", error: error.message });
    }
};

export { authentication };
