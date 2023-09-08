const {mongoose} = require('../DB/dbConfig');
const Schema = mongoose.Schema;
const validator = require('validator');

//Validations for Doctor Create/Edit
const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: [3, "Name Length Should be at least 3 Characters"],
    max: 18,
  },
  lastName: {
    type: String,
    required: true,
    min: [1, "Name Length Should be at least 1 Characters"],
    max: 18,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validator: (value) => {
      return validator.isEmail(value);
    }
  },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 130,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    yearsOfExp: {
      type: Number,
      min: 2,
      max: 40,
      required: true,
    },
    specializedIn: {
      type: String,
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    imageURL :{
      type : String
    }
  },
);

const DoctorSchema = mongoose.model('DoctorSchema', doctorSchema);
module.exports = {DoctorSchema}