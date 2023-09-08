const { mongoose } = require("../DB/dbConfig");
const Schema = mongoose.Schema;

const adminManageSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: [3, "Name length at least should be 3 "],
    max: 34,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validator: (value) => {
      return validator.isEmail(value);
    },
},
    imageURL: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      min: [3, "Password length should be at least 8"],
    },
  },
);

const AdminManageSchema = mongoose.model(
  "AdminManageSchema",
  adminManageSchema,
  'loginsignupschemas'
);
module.exports = { AdminManageSchema };
