import mongoose from "mongoose";

const sparepartschema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },  
    quantity:{
        type:Number,
        required:true
    },
    unitprice:{
        type:Number,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    }
},{timestamps:true})

const spareparts = mongoose.model("Sparepart", sparepartschema);
export default spareparts;