import mongoose from "mongoose";
import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router()

//register user 
router.post("/register",async(req,res)=>{
    try{
    const {name,email,password} = req.body;
    if((!name)||(!email)||(!password)){
        return res.status(400).json({message:"please fill all the fields"})
    }
    const exists = await User.findOne({email})
    if(exists){
        return res.status(400).json({message:"user already exists"})
    }
    const passwordhash = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password:passwordhash
    })
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.status(201).json({message:"user registered successfully",user,token})
}catch(error){
    return res.status(500).json({message:"internal server error"})
}
})
//login user
router.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        if((!email)||(!password)){
            return res.status(400).json({message:"please fill all the fields"})
        }
        const userexists = await User.findOne({email})
        if(!userexists){
            return res.status(400).json({message:"user does not exist"})
        }
        const ispasswordcorrect = await bcrypt.compare(password,userexists.password)
        if(!ispasswordcorrect){
            return res.status(400).json({message:"invalid credentials"})
        }
        const token = jwt.sign({id:userexists._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({message:"user logged in successfully",userexists,token})
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
})

export default router;