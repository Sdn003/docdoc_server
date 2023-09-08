const express = require('express');
const router = express.Router();
const { PatientSchema } = require('../Middleware/PatientSchema')

//Getting Patient List
router.get("/AllPatients", async (req, res) => {
  try {
    let doc = await PatientSchema.find();
    if (doc) {
      res.json({
        patientDataFetched: true,
        message: "Patients list fetched successfully",
        patientData: doc,
      });
    } else {
      res.json({
        patientDataFetched: false,
        message: "No Records Found",
      });
    }
  } catch (error) {
    // console.log(error, "Getting the Patient list");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});

//Getting One Patient
router.get('/Patient/:id', async(req, res) => {
  try {
     let email = req.params.id;
     let patientData = await PatientSchema.find({ email });
     if (patientData) {
       res.json({
         patientData,
         message: "Data Fetched Successfully",
       });
     } else {
       res.json({
         message: "Error in Fetching data",
         patientData: ["No Records Found"],
       });
     }
  } catch (error) {
    // console.log(error, "Creating the Patient");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
  })
}})

// Add or create a Patient in DB
router.post("/AddPatient", async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      email,
      age,
      mobile,
      healthInsurance,
      ailments,
    } = req.body;
    let patientCheck = await PatientSchema.findOne({ email });
    if (!patientCheck) {
      let mobileCheck = await PatientSchema.findOne({mobile});
      if (!mobileCheck) {
         let newPatient = {
           firstName,
           lastName,
           email,
           age,
           mobile,
           healthInsurance,
           ailments,
         };
         let doc = await PatientSchema.create(newPatient);
         res.json({
           patientCreateSuccess: true,
           message: "Patient created Successfully",
           data: doc,
           statusCode: 200,
         });
      } else {
         res.json({
           mobileExists: true,
           message: "Entered Mobile number already Exists",
         });
      }
     
    } else {
      res.json({
        patientCreateSuccess: false,
        message: "Entered E-mail already Exists",
      });
    }
  } catch (error) {
    // console.log(error, "Creating the Patient");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});

//Edit a Patient
router.put("/EditPatient/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let patientCheck = await PatientSchema.findOneAndReplace(
      { _id : id },
      req.body
    );
    if (patientCheck) {
      res.json({
        patientEditSuccess: true,
        message: "Update Successful",
        patientCheck,
      });
    } else {
      res.json({
        patientEditSuccess: false,
        message: "Error occurred while Editing",
      });
    }
  } catch (error) {
    // console.log(error, "Editing a Patient");
    if (error.keyPattern.email === 1) {
      res.json({
        message: "Validation Error",
        statusCode: 403,
        error: `${error.keyValue.email} - Email exists for another Patient`,
      });
    } else if (error.keyPattern.mobile === 1) {
      res.json({
        message: "Validation Error",
        statusCode: 403,
        error: `${error.keyValue.mobile} - Mobile exists for another Patient`,
      });
    }
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});

//Delete a Patient
router.delete("/DeletePatient/:id", async (req, res) => {
  try {
    let patientCheck = await PatientSchema.findByIdAndRemove(req.params.id);
    if (patientCheck) {
      res.json({
        patientDeleteSuccess: true,
        message: "Patient Deleted Successfully",
        statusCode: 200,
      });
    } else {
      res.json({
        patientDeleteSuccess: false,
        message: "Error while Deleting the Patient",
      });
    }
  } catch (error) {
    // console.log(error, "Deleting a Doctor");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});

module.exports = router;