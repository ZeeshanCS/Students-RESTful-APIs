const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  rollNo: {
    type: Number,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  class: {
    type: String,
  },
  coursesEnrolled: {
    type: String,
  },
  department: {
    type: String,
  },
  session: {
    type: String,
  },
  shiftTime: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
});

exports.Student = mongoose.model("Student", studentSchema);
