const express = require('express');
const router = express.Router();
const { SpecialitySchema } = require('../Middleware/SpecialitySchema');

//Getting Speciality List
router.get('/Speciality', async(req, res) => {
    
    try {
        let doc = await SpecialitySchema.find();
        res.json({
            "message" : "Data Fetched Successfully",
            doc
        })
    } catch (error) {
        // console.log(error)
    }
})

//Creating Speciality Types
router.post('/AddSpeciality', async(req, res) => {
    try {
        let { specialityType } = req.body
        let specialityCheck = await SpecialitySchema.findOne({specialityType});
         if(specialityCheck){
            res.json({
                message : "Speciality type Already Exists"
            })
         }
         else{
            let doc = await SpecialitySchema.create({ specialityType });
            res.json({
                "message" : "Speciality type added successfully",
                statusCode : 200,
                data : doc
            })
         }

         
    } catch (error) {
    //    console.log(error);
       res.json({
        "message" : "Validation Error"
       }) 
    }
   
})

//Editing Speciality Types
router.put('/editSpeciality/:id', async(req, res) => {
    try {
        let {specialityType} = req.body;
        let specialityCheck = await SpecialitySchema.findByIdAndUpdate(req.params.id, {
          specialityType,
        });
        if (specialityCheck){
            res.json({
              message: "Update Successful",
            });
        }
        else{
            res.json({
                "message" : "Error Occurred"
            })
        }
    } catch (error) {
        // console.log(error)
    }
})



module.exports = router;