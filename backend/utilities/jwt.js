import jwt from 'jsonwebtoken'
const createToken=(data)=>{
    return jwt.sign(data,process.env.JWT_SECRET_KEY,{
        expiresIn:"1d"
    })
}
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};;

export{
    createToken,verifyToken
}