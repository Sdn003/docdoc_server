const express = require('express');
const router = express.Router();
const {LoginSignupSchema, hashing, hashCompare} = require('../Middleware/LoginSignuPSchema');
const JWT = require("jsonwebtoken");
const JWTD = require("jwt-decode");
const secret = "ksdklsdnlkjbjbkjsbi0908909sdbkjsdbkj";


router.get('/getLogin', async(req, res) => {
    try {
        let doc = await LoginSignupSchema.find();
        res.json({
          data: doc,
        });
    } catch (error) {
        // console.log(error)
    }
    
})

//Registering a New User

router.post('/Signup', async(req, res) => {
    try {
        const {name, email, password} = await req.body;
        let userCheck = await LoginSignupSchema.findOne({email: email});
        if(!userCheck){
            let hash = await hashing(password);
            let userDetail = {
                name : name,
                email : email,
                password : hash
            }
            let doc = await LoginSignupSchema.create(userDetail);
            let token = await JWT.sign({password}, secret);
            res.json({
                "successSignup" : true,
                "token" : token,
                "signedInUserdata" : doc,
                 "message" : "User Registered Succsessfully"   
            })
        }
        else{
            res.json({
              userExist: true,
              message: "User already Present, Please Login",
            });
        }
    } catch (error) {
        // console.log(error)
    }
} )

//Existing User Login
router.post('/Login', async(req, res) => {
    try {
        const {email, password} = req.body;
        let userCheck = await LoginSignupSchema.findOne({email});
        
        if (userCheck) {
            let isPasswordCorrect = await hashCompare(password, userCheck.password);
            let loggedInUserDetails = await LoginSignupSchema.findOne({ name : userCheck.name});
            if (isPasswordCorrect === true) {
                let token = await JWT.sign({password}, secret);
                return res
                  .cookie("token", token, {
                    expires: new Date(),
                    sameSite: "strict",
                    httpOnly: true,
                  })
                  .json({
                    loggedInUserDetails: loggedInUserDetails,
                    token: token,
                    successLogin: true,
                    message: "Login Successful",
                  });

            } else {
              res.json({
                successLogin: false,
                message: "Please Enter the Correct Password",
              });
            }

        }
        else{
            res.json({
              userExist: false,
              "message" : "Please Sign up tp proceed"
            });
        }
   
    } catch (error) {
        // console.log(error)
        res.json({
            "errMessage" : error
        })
    }
    
})

//User Verification

router.get('/Verifytoken', async(req, res)=> {
    let token = req.cookies.token;
    try {
            if (!token) {
              res.json({
                message: "You need to Login",
              });
            } else {
              JWT.verify(token, secret, function (err, decoded) {
                if (err) {
                  res.status(409).send({ error: "Invalid Token" });
                } else {
                  return res.send({
                    token,
                    successToken : true,
                    message: "Token Generated Successfully",
                  });
                }
              });
            }
    } catch (error) {
        // console.log(error);
        res.json({
            "message" : error
        })
    }

})

//logout User

router.get('/Logout', async(req, res) => {
    try {
        res.clearCookie('token').send({message : "Logout Successful"})
    } catch (error) {
        // console.log(error);
        res.statusCode(500);
    }
})

//Forget Password
router.post('/ForgetPassword', async(req, res)=>{
    try {
        const {email, newPassword } = req.body; 
    let userCheck = await LoginSignupSchema.findOne({email})
        if(userCheck){
            let hash = await hashing(newPassword);
            let doc = await LoginSignupSchema.updateOne({email}, {$set : {password: hash}});
            res.json({
                "successUpdate" : true,
                "message" : "Password Updated Successfully",
                data : doc
            })
        
        }
        else{
            res.json({
                "userExist" : false,
                "message" : "User does not Exist"
            })
        }

    }
        
    catch (error) {
        // console.log(error)
        res.json({
            "message" : "Validation Error"
        })
    }
    

})


//Update Password
router.post('/UpdatePassword', async(req, res) => {
    try {
        const {email, oldPassword, newPassword, confirmPassword} = req.body;
        let userCheck = await LoginSignupSchema.findOne({ email });
        if(userCheck){
            let oldPasswordVerify = await hashCompare(
              oldPassword,
              userCheck.password
            ); 
            if(oldPasswordVerify === true){
                if(confirmPassword === newPassword){
                    let hash = await hashing(newPassword);
                    await LoginSignupSchema.updateOne(
                      { email },
                      { $set: { password: hash } }
                    );
                    res.json({
                      successUpdate: true,
                      data: userCheck,
                      message: "Password Updated Successfully",
                    });
                }
                else{
                    res.json({
                      message:
                        "New Password and Conform Password should be same",
                    });
                }
                
            }
            else{
                
                res.json({
                  statusCode: 500,
                  successUpdate: false,
                  message: "Please Check your Old Password and try again",
                });
                
            }
        }
        else{
            res.json({
                "message" : "Please Check your mail ID"
            })
        }
    } catch (error) {
        // console.log(error);
        res.statusCode(500).json({"message" : error})
    }
})




module.exports = router;