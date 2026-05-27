import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    stockoutquantity:{
        type:Number,
        required:true,
    },
    sparepartid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sparepart",
        required:true
    },
    stockoutunitprice:{
        type:Number,
        required:true
    },
    stockouttotalprice:{
        type:Number,
        required:true
    },
    stockoutDate:{
        type:Date,
        default:Date.now,
        required:true
    }
},{timestamps:true})

const stockout = mongoose.model("Stockout", userSchema);
export default stockout;