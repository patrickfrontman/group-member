import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

    employeenumber: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    telephone: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    hireddate: {
        type: Date,
        required: true
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    }

}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;