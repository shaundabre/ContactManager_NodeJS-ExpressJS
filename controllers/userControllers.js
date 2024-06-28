const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

//@desc Register User 
//@route POST /api/user
//@access public 
const postRegister = asyncHandler( async (req,res) => {
    console.log("Request body is " , req.body);
    const { userName, email, password }= req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new Error("All fields are Mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Exists");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hahsed Password", hashedPassword);
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });
    console.log(`User Created ${user}`);

    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User Data Not Valid");
    }

    res.json({ message : "Register User"})
});


//@desc Login User 
//@route POST /api/user
//@access public
const postLogin = asyncHandler( async (req,res) => {
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All Fields Are Mandatory!");
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        );

        res.status(400).json({accessToken})
    }
    else{
        res.status(400);
        throw new Error ("Email and Password not valid ");
    }
});

//@desc Current User Info  
//@route GET /api/user
//@access private
const getCurrentInfo = asyncHandler( async (req,res) => {
    res.json({ message : "Current  User Information"})
});



module.exports = {postRegister, postLogin, getCurrentInfo}