import express from 'express';
import Sparepart from '../models/sparepart.js';
import auth from '../middleware/auth.js';
import ExcelJS from 'exceljs';

const router = express.Router();


// CREATE SPAREPART
router.post("/", auth, async (req, res) => {
    try {
        const { name, category, quantity, unitprice } = req.body;

        if ((!name) || (!category) || (!quantity) || (!unitprice)) {
            return res.status(400).json({
                message: "please fill all the fields"
            });
        }

        const totalprice = quantity * unitprice;

        const sparepart = await Sparepart.create({
            name,
            category,
            quantity,
            unitprice,
            totalprice
        });

        res.status(201).json({
            message: "sparepart created successfully",
            sparepart
        });

    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
});


// GET ALL SPAREPARTS
router.get("/", auth, async (req, res) => {
    try {

        const spareparts = await Sparepart.find();

        res.status(200).json({
            message: "spareparts fetched successfully",
            spareparts
        });

    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
});





// EXPORT EXCEL
router.get("/export/excel", auth, async (req, res) => {

    try {

        // fetch data from database
        const spareparts = await Sparepart.find();

        //create workbook
        const workbook = new ExcelJS.Workbook();

        //create worksheet
        const worksheet = workbook.addWorksheet("sparepart")

        //add columns on your excel file
        worksheet.columns=[
            {header:"Name",key:"name",width:25},
            {header:"Category",key:"category",width:25},
            {header:"Quantity",key:"quantity",width:15},
            {header:"Unitprice",key:"unitprice",width:15},
            {header:"Totalprice",key:"totalprice",width:25},
        ];
        //style headers of the excel file
        worksheet.getRow(1).font={
            bold:true,
            size:16
        }

        //lopps throuth the database
        spareparts.forEach((item)=>{
            worksheet.addRow({
                name:item.name,
                category:item.category,
                quantity:item.quantity,
                unitprice:item.unitprice,
                totalprice:item.totalprice
            })
        })

        //set header for the excel file
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment;filename=spareparts.xlsx"
        );

        //save worksheet
        await workbook.xlsx.write(res)

        //end response
        res.end()
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
})

// GET SINGLE SPAREPART
router.get("/:id", auth, async (req, res) => {
    try {

        const sparepart = await Sparepart.findById(req.params.id);

        if (!sparepart) {
            return res.status(404).json({
                message: "sparepart not found"
            });
        }

        res.status(200).json({
            message: "sparepart fetched successfully",
            sparepart
        });

    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
});
export default router;