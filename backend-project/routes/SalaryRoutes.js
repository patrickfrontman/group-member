import express from "express";
import Salary from "../models/salary.js";
import Employee from "../models/employee.js";
import auth from "../middleware/auth.js";

const router = express.Router();


// CREATE SALARY
router.post("/",auth, async (req, res) => {
    try {

        const {GrossSalary,TotalDeduction,month,employee} = req.body;

        const findEmployee = await Employee.findById(employee);

        if (!findEmployee) {
            return res.status(404).json({message: "Employee not found"});
        }

        const NetSalary = GrossSalary - TotalDeduction;

        const salary = await Salary.create({
            GrossSalary,
            TotalDeduction,
            NetSalary,
            month,
            employee
        });

        res.status(201).json({message: "Salary created successfully",salary});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// get all salary
router.get("/",auth, async (req, res) => {
    try {

        const salaries = await Salary.find()
            .populate({
                path: "employee",
                populate: {
                    path: "department"}
                });

        res.status(200).json({
            salaries
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// get single salary
router.get("/:id",auth, async (req, res) => {
    try {

        const salary = await Salary.findById(req.params.id).populate("employee");

        res.status(200).json({salary});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// update salary
router.put("/:id",auth, async (req, res) => {
    try {

        const { grosssalary, totaldeduction } = req.body;

        let netsalary;

        if (GrossSalary && TotalDeduction) {
            netsalary = grosssalary - totaldeduction;
        }

        const salary = await Salary.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                netsalary
            },
            { new: true }
        );

        res.status(200).json({message: "Salary updated",salary});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE SALARY
router.delete("/:id",auth, async (req, res) => {
    try {
        const id = req.params.id
        const deletesalary=await Salary.findByIdAndDelete(id);

        res.status(200).json({message: "Salary deleted"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;