import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobileNo: { type: Number, required: false },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" }
    }, {
        timestamps: true,
        versionKey: false
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        console.log('Password not modified, skipping hashing.')
        return next()
    }
    try {
        console.log('Hashing password...')
        const salt = await bcrypt.genSalt(10)  // Use the asynchronous version
        this.password = await bcrypt.hash(this.password, salt)
        console.log('Password hashed successfully.')
        next()  // Ensure next() is called after hashing
    } catch (error) {
        console.log('Error hashing password:', error)
        next(error)
    }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compareSync(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
