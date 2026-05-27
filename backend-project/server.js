import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"


import UserRoutes from "./routes/UserRoutes.js"
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("✅connected to mongodb"))
.catch((error)=>{
    console.error(error.message)
})

// ROUTES
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);
app.use("/salaries", salaryRoutes);
app.use("/api/auth",UserRoutes)


app.listen(process.env.PORT, () => {
    console.log(`server is learning at http://localhost:${process.env.PORT}`);
});