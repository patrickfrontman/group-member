import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({

  departmentCode: {
    type: String,
    required: true,
    unique: true
  },

  departmentName: {
    type: String,
    required: true
  },

  GrossSalary: {
    type: Number,
    required: true
  },

  // ADD THIS
  DefaultDeduction: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

const Department = mongoose.model(
  "Department",
  departmentSchema
);

export default Department;