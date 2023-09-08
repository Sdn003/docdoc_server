const { mongoose } = require('../DB/dbConfig');
const Schema = mongoose.Schema;

const scheduleAppointmentSchema = new Schema({
  patientName: {
    type: String,
    required: true,
    min: [3, "Name Length Should be at least 3 Characters"],
    max: 18,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
    min: 10,
    max: 10,
  },
  doctorName: {
    type: String,
    required: true,
  },
  specializedIn: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const ScheduleAppointmentSchema = mongoose.model(
  "ScheduleAppointmentSchema",
  scheduleAppointmentSchema
);

module.exports = { ScheduleAppointmentSchema };