const {mongoose} = require('../DB/dbConfig');
const Schema = mongoose.Schema


const adminSchema = new Schema({
  name: { type: String, required: true },
});

const AdminSchema = mongoose.model("AdminSchema", adminSchema);
module.exports = { AdminSchema };
