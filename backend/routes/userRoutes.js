import express from "express"
import { register,login,logOut, deleteUser,getAllUsers,checkUserLoggedIn } from "../controllers/userController.js"
import { authentication } from "../middlewares/userMiddleware.js"

const userRouter= express.Router()
userRouter.get('/details',getAllUsers )
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',logOut)
userRouter.delete('/:id', authentication, deleteUser);
userRouter.get('/status/:id', authentication, checkUserLoggedIn);


export default userRouter