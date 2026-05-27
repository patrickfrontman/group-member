import express from 'express';
import Stockin from '../models/stockin.js';
import Sparepart from '../models/sparepart.js';
import auth from '../middleware/auth.js';

const router = express.Router()

//create sparepart
router.post("/",auth,async(req,res)=>{
    try{
        const {stockinquantity,sparepartid} = req.body;
        if((!stockinquantity)||(!sparepartid)){
            return res.status(400).json({message:"please fill all the fields"})
        }
        const sparepart = await Sparepart.findById(sparepartid)
        if(!sparepart){
            return res.status(404).json({message:"sparepart not found"})
        }
        const stockin = await Stockin.create({
            stockinquantity,
            sparepartid
        })
       sparepart.quantity += stockinquantity
         sparepart.quantity * sparepart.unitprice;
         await sparepart.save()
        return res.status(201).json({message:"stockin created successfully",stockin})
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
})
//get all stockins
router.get("/",auth,async(req,res)=>{
    try{
        const stockins = await Stockin.find().populate("sparepartid")
        res.status(200).json({message:"stockins fetched successfully",stockins})
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
})
export default router;