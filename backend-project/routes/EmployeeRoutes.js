
import express from "express";
import Employee from "../models/employee.js";
import Department from "../models/department.js";
import auth from "../middleware/auth.js"

const router = express.Router();


// post an employee
router.post("/",auth, async (req, res) => {
    try {

        const {
            employeenumber,
            firstname,
            lastname,
            position,
            address,
            telephone,
            gender,
            hireddate,
            department} = req.body;

        const findDepartment = await Department.findById(department);

        if (!findDepartment) {
            return res.status(404).json({message: "Department not found"});
        }

        const employee = await Employee.create({
            employeenumber,
            firstname,
            lastname,
            position,
            address,
            telephone,
            gender,
            hireddate,
            department
        });

        res.status(201).json({message: "Employee created successfully",employee});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// get all employee
router.get("/", auth, async (req, res) => {
  try {

    const employees = await Employee.find()
      .populate("department");

    res.status(200).json({
      employees
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});


// get single employee
router.get("/:id",auth, async (req, res) => {
    try {

        const employee = await Employee.findById(req.params.id).populate("department");

        res.status(200).json({employee});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
export default router;