const express = require('express');
const router = express.Router();
const { AdminManageSchema } = require("../Middleware/AdminManageSchema");
const { hashing } = require("../Middleware/LoginSignuPSchema");


//Getting all Admins
router.get('/AllAdmins', async(req, res) => {
    try {
        let doc = await AdminManageSchema.find();
        if(doc){
            res.json({
              successFetch : true,
                adminData : doc,
                "message" : "Admin List fetched Successfully"
            })
        }
            else{
                 res.json({
                successFetch : false,
                "message" : "No Records Found"
            })
            }
    } catch (error) {
        // console.log(error, "Getting the Admin List");
        res.json({
            statusCode : 500,
            "message" : "Error Occurred",
            error
        })
    }
})

//Creating a Admin
router.post("/AddAdmin", async (req, res) => {
  try {
    let { name, adminId, email, mobile, imageURL, password } = req.body;
    let adminCheck = await AdminManageSchema.findOne({ email });
    if (!adminCheck) {
       let hash = await hashing(req.body.password);
       let newAdmin = {
         name,
         email,
         imageURL,
         password: hash,
       };
       let doc = await AdminManageSchema.create(newAdmin);
       res.json({
         AdminCreateSuccess: true,
         message: "Admin created Successfully",
         data: doc,
         // loginData : loginDoc,
         statusCode: 200,
       });
    }
    else {
      res.json({
        AdminCreateSuccess: false,
        message: "Entered E-Mail Already Exists",
      });
    }
  } catch (error) {
    
     res.json({
       message: "Error Occurred",
       statusCode: 500,
       error,
     });
    // console.log(error, "Creating the Admin");
  }
});

//Edit a Admin
// router.put("/EditAdmin/:id", async (req, res) => {
//  try {
//     let id = req.params.id
//      let adminCheck = await AdminManageSchema.findOneAndReplace(
//      {_id : id},
//      req.body
//    );
//    if (adminCheck) {
//      res.json({
//        AdminEditSuccess: true,
//        message: "Update Successful",
//      });
//    } else {
//      res.json({
//        AdminEditSuccess: false,
//        message: "Error occurred while Editing",
//      });
//    }
//  } catch (error) {
//   //  console.log(error, "Editing a Admin");
//     if (error.keyPattern.email === 1) {
//       res.json({
//         message: "Validation Error",
//         statusCode: 403,
//         error: `${error.keyValue.email} - Email exists for another Patient`,
//       });
//     }
//     res.json({
//       message: "Error Occurred",
//       statusCode: 500,
//       error,
//     });
//  }
// });

//Delete a Admin
router.delete("/DeleteAdmin/:id", async (req, res) => {
  try {
    let adminCheck = await AdminManageSchema.findByIdAndRemove(req.params.id);
    if (adminCheck) {
      res.json({
        successDelete: true,
        message: "Admin Deleted Successfully",
        statusCode: 200,
      });
    } else {
      res.json({
        successDelete: true,
        message: "Error while Deleting the Admin",
      });
    }
  } catch (error) {
    // console.log(error, "Deleting a Admin");
    res.json({
      message: "Error Occurred",
      statusCode: 500,
      error,
    });
  }
});

module.exports = router;