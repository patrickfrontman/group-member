import express from "express";
import Department from "../models/department.js";
import auth from "../middleware/auth.js"

const router = express.Router();


// routes for post department
router.post("/",auth, async (req, res) => {
    try {

        const {
  departmentCode,
  departmentName,
  GrossSalary,
  DefaultDeduction
} = req.body;

        if (!departmentCode || !departmentName || !GrossSalary) {
            return res.status(400).json({message: "All fields are required"});
        }
const department = await Department.create({
  departmentCode,
  departmentName,
  GrossSalary,
  DefaultDeduction
});

        res.status(201).json({message: "Department created successfully",department});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// get all departments
router.get("/",auth, async (req, res) => {
    try {

        const departments = await Department.find();

        res.status(200).json({departments});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// get department with it's id
router.get("/:id",auth, async (req, res) => {
    try {

        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({message: "Department not found"});
        }

        res.status(200).json({department});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;