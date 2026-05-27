import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
import UserRoutes from './routes/UserRoutes.js';
import SparepartRoutes from './routes/SparepartRoutes.js';
import StockinRoutes from './routes/StockinRoutes.js';
import StockoutRoutes from './routes/StockoutRoutes.js';

const app = express()
const PORT = process.env.PORT

//initialize middleware
app.use(express.json())
app.use(cors())
app.use("/api/users",UserRoutes)
app.use("/api/spareparts",SparepartRoutes)
app.use("/api/stockins",StockinRoutes)
app.use("/api/stockouts",StockoutRoutes)

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("✅ connected to mongodb"))
.catch((error)=>{
    console.error(error.message)
})

app.listen(process.env.PORT,()=>{
    console.log(`server learning at http://localhost:${process.env.PORT}`)
})