const { mongoose } = require('../DB/dbConfig');
const Schema = mongoose.Schema;

const specialitySchema = new Schema({
  specialityType: {
    type: String,
    unique : true,
    min : 1,
    max : 50
  },
});

const SpecialitySchema = mongoose.model("SpecialitySchema", specialitySchema);
module.exports = { SpecialitySchema };