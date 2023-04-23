require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const requireLogin = (req, res, next) => {
    try{
        const token = req.headers.authorization
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifyToken
        next();
    }catch(error){
        console.log(error);
    }
};

module.exports = requireLogin