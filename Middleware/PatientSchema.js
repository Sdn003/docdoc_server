const { mongoose } = require('../DB/dbConfig');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
  email: {
    type: String,
    unique: true,
    required: true,
    validator: (value) => {
      return validator.isEmail(value);
    },
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
  healthInsurance: {
    type : String
  },
  ailments : {
    type : String
  }
});

const PatientSchema = mongoose.model("PatientSchema", patientSchema);
module.exports = { PatientSchema };