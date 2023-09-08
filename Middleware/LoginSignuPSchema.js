const {mongoose} = require('../DB/dbConfig');
const Schema = mongoose.Schema;
const validator = require('validator')
const bcrypt = require('bcryptjs');

//Encrypting the password
const hashing = async(password) => {
    let salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

//Comparing the password with the Original and return Boolean
const hashCompare = async(password, hashValue) => {
    return await bcrypt.compare(password, hashValue);
}

//Validations for Login and Signup
const loginSignupSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: [3, "Name length at least should be 3 "],
    max: 34,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: (value) => {
      return validator.isEmail(value);
    },
  },

  password: {
    type: String,
    required: true,
    min: [3, "Password length should be at least 8"],
  },
});



const LoginSignupSchema = mongoose.model(
  "LoginSignupSchema",
  loginSignupSchema
);

module.exports = { LoginSignupSchema, hashing, hashCompare };