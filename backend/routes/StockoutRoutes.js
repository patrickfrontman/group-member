import express from 'express';
import stockout from '../models/stockout.js';
import auth from '../middleware/auth.js';

const router = express.Router()

//create stockout
router.post("/",auth,async(req,res)=>{
    try{
        const {stockoutquantity,sparepartid,stockoutunitprice} = req.body;
        if((!stockoutquantity)||(!sparepartid)||(!stockoutunitprice)){
            return res.status(400).json({message:"please fill all the fields"})
        }


        const stockouttotalprice = stockoutquantity * stockoutunitprice
        const stockouts = await stockout.create({
            stockoutquantity,
            sparepartid,
            stockoutunitprice,
            stockouttotalprice
        })
        return res.status(201).json({message:"stockout created successfully",stockouts})
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
})
//get all stockouts
router.get("/",auth,async(req,res)=>{
    try{
        const stockouts = await stockout.find().populate("sparepartid")
        res.status(200).json({message:"stockouts fetched successfully",stockouts})
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
})
//update stockout
router.put("/:id",auth,async(req,res)=>{
    try {
        const id = req.params.id
        const stockouts = await stockout.findByIdAndUpdate(id,req.body,{new:true})
        if(!stockouts){
            return res.status(404).json({message:"stockout not found"})
        }
        return res.status(200).json({message:"stockout updated successfully",stockouts})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
})
//deletes stockout
router.delete("/:id",auth,async(req,res)=>{
    try {
        const id = req.params.id
        const stockouts = await stockout.findByIdAndDelete(id)
        if(!stockouts){
            return res.status(404).json({message:"stockout not found"})
        }
        return res.status(200).json({message:"stockout deleted successfully",stockouts})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
})
export default router;