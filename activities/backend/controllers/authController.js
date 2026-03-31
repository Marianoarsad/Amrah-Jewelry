import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {

    try {

        const { username, email, password } = req.body;
        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." })
        } 
        
        const user = await User.create({ username, email, password });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // FINDING IF USER EXISTS
        const user = await User.findOne({ email });
 
        if (user && (await bcrypt.compare(password, user.password))) {
            
            // CREATING TICKET/TOKEN
            const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role, 
                name: user.username 
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn : "1d" }
        );

            res.json({ 
                _id: user._id, 
                username: user.username, 
                password: user.password 
            })

        } else {
            res.status(401).json({ message: "Invalid" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const logout = (req, res) => {

    res.status(200).json({ message: "Logged out successfully." })

}