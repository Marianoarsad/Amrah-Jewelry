import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// REGISTERS CLIENT
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // CHECKS IF THERE IS AN EXISING USER BASED ON EMAIL 1️⃣
        const existingUser = await User.findOne({ email });

        // IF USER ALREADY EXISTS 2️⃣
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // CREATES NEW USER 3️⃣
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// LOGIN CLIENT
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // CHECKS EXISTING USER BY USERNAME 1️⃣
        const user = await User.findOne({ username });

        // IF USER NOT FOUND, RETURN ERROR
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // CHECKS REQUEST PASSWORD MATCHES THE USER PASSWORD 1️⃣
        const passwordMatch = await bcrypt.compare(password, user.password);

        // IF USER EXIST AND PASSWORD MATCH 2️⃣
        if (passwordMatch) {

            // GENERATES TOKEN (Jason Web Tokens) 3️⃣
            const token = jwt.sign(
                { userId: user._id }, // User's unique ID
                process.env.JWT_SECRET, // a secure cryptographic key used to sign and verify JSON Web Tokens (JWT).
                { expiresIn: "1h" } // Expires in 1 hour
            )

            // RESPONDS WITH TOKEN (_id, username, email) 4️⃣
            res.status(200).json({
                token, // 🪙
                _id: user._id,
                username: user.username,
                email: user.email
            })

            console.log('LOGIN SUCCESSFUL \n token: ' + token);
        } else {
            // PASSWORD DOESN'T MATCH
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// LOGOUT CLIENT
export const logout = async (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
}