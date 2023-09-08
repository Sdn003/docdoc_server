const express = require('express');
const router = express.Router();
const { ScheduleAppointmentSchema } = require('../Middleware/ScheduleAppointmentSchema');


//Getting All Appointments
router.get("/Appointment", async (req, res) => {
  try {
    let doc = await ScheduleAppointmentSchema.find();
    if (doc) {
      res.json({
        appointmentData: doc,
        successFetch: true,
        message: "All Appointments fetched Successfully",
      });
    }
    else{
        res.json({
          successFetch: false,
          message: "Error Occurred while fetching the Appointment(s)",
        });
    }
  } catch (error) {
    // console.log(error, "Getting the Appointment");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});


//Getting one Appointment
router.get('/Appointment/:id', async(req, res) => {
    
    try {
        let mobile = req.params.id;
        let doc = await ScheduleAppointmentSchema.findOne({mobile})
        if(doc){
            res.json({
                data : doc,
                successFetch : true,
                message : "Appointment fetched Successfully"
            })
        }
        else{
             res.json({
               data: doc,
               successFetch: false,
               message: "Error Occurred while fetching the Appointment(s)",
             });
        }
    } catch (error) {
        // console.log(error, "Getting the Appointment");
        res.json({
            "message": "Error Occurred",
            statusCode : 500,
            error
        })
    }
})

//

//Creating a Appointment
router.post('/CreateAppointment', async(req, res) => {
    try {
        let {
          patientName,
          email,
          mobile,
          doctorName,
          specializedIn,
          date, time
        } = req.body;

        let newAppointment = {
         patientName,
         email,
          mobile,
          doctorName,
          specializedIn,
          date,
           time
        };
        let doc = await ScheduleAppointmentSchema.create(newAppointment);
        if(doc){
             res.json({
               data: doc,
               successCreate: true,
               message: "Appointment Scheduled Successfully",
               statusCode: 200,
             });
        }
        else{
            res.json({
                successCreate: false,
                "message" : "Please Check the Entered data and Submit",
             });
        }
       
    } catch (error) {
        // console.log(error, "Creating a Appointment");
        res.json({
          message: "Error Occurred",
          statusCode: 500,
          error,
        });
    }
})

//Editing a appointment
router.put('/EditAppointment/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let doc = await ScheduleAppointmentSchema.findOneAndReplace({_id : id}, req.body);
        if(doc){
             res.json({
               data: doc,
               successEdit: true,
               message: "Appointment Edited Successfully",
             });
        }
        else{
            res.json({
              successEdit: false,
              message: "Error Occurred while editing the Appointment",
            });
        }
        
    } catch (error) {
        // console.log(error, "Editing the Appointment");
        res.json({
          message: "Error Occurred",
          statusCode: 500,
          error,
        });
    }
})

router.delete('/DeleteAppointment/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let doc = await ScheduleAppointmentSchema.findOneAndRemove({_id : id})
        if(doc){
               res.json({
                 successDelete: true,
                 message: "Appointment Cancelled Successfully",
               });
        }
        else{
               res.json({
                 successDelete: false,
                 message: "Error Occurred while Cancelling the Appointment",
               });
        }
           
            
        
    } catch (error) {
        // console.log(error, "Deleting the Appointment");
        res.json({
          message: "Error Occurred",
          statusCode: 500,
          error,
        });
    }
})

module.exports = router;
