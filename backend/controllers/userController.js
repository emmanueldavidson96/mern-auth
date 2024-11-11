import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc Auth User and Set Token
//route POST /api/users/auth
//@access Public
const auth_user = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email:email})
    if (user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email
        });        
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
    res.status(200).json({message:"Log User"});
});

//@desc Register a new user
//route POST /api/users
//@access Public
const register_user = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const user_exists = await User.findOne({email:email})
    if(user_exists){
        res.status(400)
        throw new Error("User already exists!");
    }
    const user = await User.create({name:name,email:email,password:password});
    if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        });
    }else{
        res.status(400);
        throw new Error("Invalid User Data!")
    }
    res.status(200).json({message:"User successfully registered!"})  
});

//@desc Logout user
//route POST /api/users/logout
//@access Public
const logout_user = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({message:"User logged out"});
});

//@desc Get User Profile
//route GET /api/users/profile
//@access Private
const get_user_profile = asyncHandler(async (req, res) => {
    // console.log(req.user)
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

//@desc Get User Profile
//route GET /api/users/profile
//@access Private

const update_user_profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name: updatedUser.name,
            email:updatedUser.email,
        }) 

    }else{
        res.status(404);
        throw new Error("User not found!")
    }
    res.status(200).json({message:"Update user profile"});
});

export {
    auth_user,
    register_user,
    logout_user,
    get_user_profile,
    update_user_profile
}