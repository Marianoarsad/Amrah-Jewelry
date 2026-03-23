import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// PAYLOAD CONTAINER 🫙
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: {  type: String, required: true },
        role: { type: String, enum: ["User", "Admin"], default: "User" }
        // enum: ["user", "admin"] - limits values to only "user" and "admin"
    }, { timestamps: true } 
);

// MIDDLEWARE - to hash password
userSchema.pre('save', async function(next){
    // next(); bypass process
    // !this pertains to userSchema
    
    // IF NOTHING CHANGED SKIPS HASHING PASSWORD
    if (!this.isModified("password")) return next(); 

    // Hashing process
    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);