import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({

    GrossSalary: {
        type: Number,
        required: true
    },

    TotalDeduction: {
        type: Number,
        required: true
    },

    NetSalary: {
        type: Number,
        required: true
    },

    month: {
        type: String,
        required: true
    },

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    }

}, { timestamps: true });

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;