import mongoose from "mongoose";

const stockinschema = new mongoose.Schema({
    stockinquantity:{
        type:Number,
        required:true
    },
    sparepartid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sparepart",
        required:true
    },
    stockindate:{
        type:Date,
        default:Date.now,
        required:true
    }
},{timestamps:true})

const Stockin = mongoose.model("Stockin", stockinschema);
export default Stockin;