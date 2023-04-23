require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireLogin = require("../middleware/middleware");

// Register Route

router.post("/register", async (req, res) => {
    const {name, email, password, cpassword} = req.body

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Fill the form comepletly" });
    }

    try {
        
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(200).json({ message: "Email already registered now please login" });
        }

        const hashed_password = await bcrypt.hash(password, 12);
        const hashed_cpassword = await bcrypt.hash(cpassword, 12);

        const user = await new User({
            name,
            email,
            password: hashed_password,
            cpassword: hashed_cpassword
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully", user });


    } catch (error) {
        console.log(error);
    }
});

// Login Route

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Fill the details properly" });
    }

    try {
        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({error: "Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({ error: "Invalid Credentials" })
        }

        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d"
        });

        res.status(200).json({
            message: "User login successfully", 
            user: {
                name: user.name,
                email: user.email,
            },
            token 
        })

    } catch (error) {
        console.log(error);
    }
});

// Testing user is login or not

router.get("/test", requireLogin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;