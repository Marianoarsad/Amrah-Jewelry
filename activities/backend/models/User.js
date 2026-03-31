import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['User', "Moderator", "Admin"], default: "User"},

}, { timestamps: true });

// MIDDLEWARE
userSchema.pre('save', async function (next) {

    // SHORT CIRCUITING
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema)