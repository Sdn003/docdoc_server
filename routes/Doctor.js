const express = require("express");
const router = express.Router();
const { DoctorSchema } = require("../Middleware/DoctorSchema");

//Getting Doctors list

router.get("/AllDoctors", async (req, res) => {
  try {
    let doc = await DoctorSchema.find();
    if (doc) {
      res.json({
        doctorDataFetched: true,
        message: "Doctors list fetched successfully",
        doctorData: doc,
      });
    } else {
      res.json({
        doctorDataFetched: false,
        message: "No Records Found",
      });
    }
  } catch (error) {
    // console.log(error, "Getting the Doctors list");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});

//Getting One Doctor
router.get('/Doctor/:id', async(req, res) => {
  try {
    let specializedIn = req.params.id;
    let doctor = await DoctorSchema.find({ specializedIn });
    if(doctor){
      res.json({
        "message" : "Fetched Success",
        doctor
      })
    }
    else{
      res.json({
        message: "Not Found",
        doctor : ["No Records Found"]
      });
    }
  } catch (error) {
    
  }
})

// Add or create a Doctor in DB
router.post("/AddDoctor", async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      regNo,
      email,
      age,
      mobile,
      yearsOfExp,
      specializedIn,
      consultationFee,
    } = req.body;
    let doctorCheck = await DoctorSchema.findOne({ email });
    if (!doctorCheck) {
      let mobileCheck = await DoctorSchema.findOne({mobile})
      if (!mobileCheck) {
        let regNoCheck = await DoctorSchema.findOne({regNo});
        if(!regNoCheck){
           let newDoctor = {
             firstName,
             lastName,
             email,
             age,
             regNo,
             mobile,
             yearsOfExp,
             specializedIn,
             consultationFee,
           };
           let doc = await DoctorSchema.create(newDoctor);
           res.json({
             doctorCreateSuccess: true,
             message: "Doctor created Successfully",
             data: doc,
             statusCode: 200,
           });
        }
        else{
             res.json({
               regNoExists: true,
               message: "Entered Registration number already Exists",
             });
        }
      } else {
        res.json({
          mobileExists: true,
          message: "Entered Mobile number already Exists",
        });
      }
     
    } else {
      res.json({
        doctorCreateSuccess: false,
        message: "Entered E-mail already Exists",
      });
    }
  } catch (error) {
    // console.log(error, "Creating the Doctor");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});

//Edit a Doctor
router.put("/EditDoctor/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let doctorCheck = await DoctorSchema.findOneAndReplace(
      { _id: id },
      req.body
    );
    // console.log(doctorCheck);
    if (doctorCheck) {
      res.json({
        doctorEditSuccess: true,
        message: "Update Successful",
        doctorCheck
      });
    } else {
      res.json({
        doctorEditSuccess: false,
        message: "Error occurred while Editing",
      });
    }
  } catch (error) {
    // console.log(error, "Editing a Doctor");
    if (error.keyPattern.regNo === 1) {
      res.json({
        message: "Validation Error",
        statusCode: 403,
        error: `${error.keyValue.regNo} - Reg Number exists for another Doctor`,
      });
    } else if (error.keyPattern.email === 1) {
      res.json({
        message: "Validation Error",
        statusCode: 403,
        error: `${error.keyValue.email} - Email exists for another Doctor`,
      });
    } else if (error.keyPattern.mobile === 1) {
      res.json({
        message: "Validation Error",
        statusCode: 403,
        error: `${error.keyValue.mobile} - Mobile exists for another Doctor`,
      });
    } else {
      res.json({
        message: "Error Occurred",
        statusCode: 500,
        error,
      });
    }
  }
});

//Delete a Doctor
router.delete("/DeleteDoctor/:id", async (req, res) => {
  try {
    let doctorCheck = await DoctorSchema.findByIdAndRemove(req.params.id);   
    if(doctorCheck){
        res.json({
          doctorDeleteSuccess: true,
          message: "Doctor Deleted Successfully",
          statusCode: 200
        });
    }
    else{
         res.json({
           doctorDeleteSuccess: false,
           message: "Error while Deleting the Doctor",
         });
    }
  } catch (error) {
    // console.log(error, "Deleting a Doctor");

  
      res.json({
        message : "Error Occurred",
        statusCode : 500,
        error 
      })
     
  }
});

module.exports = router;
