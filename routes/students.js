const { Student } = require("../models/student");
const express = require("express");
const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  const studentList = await Student.find();

  if (!studentList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(studentList);
});

// GET student by id
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res
      .status(500)
      .json({ message: "The student with given ID was not found!" });
  }
  res.status(200).send(student);
});

// Creating new student
router.post("/", async (req, res) => {
  let student = new Student({
    rollNo: req.body.rollNo,
    registrationNo: req.body.registrationNo,
    name: req.body.name,
    class: req.body.class,
    coursesEnrolled: req.body.coursesEnrolled,
    department: req.body.department,
    session: req.body.session,
    shiftTime: req.body.shiftTime,
    bloodGroup: req.body.bloodGroup,
    address: req.body.address,
    phoneNo: req.body.phoneNo,
  });
  student = await student.save();

  if (!student) return res.status(404).send("The student cannot be found!");

  res.send("The student has been created successfully!");
});

// Update the existing student
router.put("/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      rollNo: req.body.rollNo,
      registrationNo: req.body.registrationNo,
      name: req.body.name,
      class: req.body.class,
      coursesEnrolled: req.body.coursesEnrolled,
      department: req.body.department,
      session: req.body.session,
      shiftTime: req.body.shiftTime,
      bloodGroup: req.body.bloodGroup,
      address: req.body.address,
      phoneNo: req.body.phoneNo,
    },
    { new: true }
  );

  if (!student)
    return res
      .status(400)
      .send("The student cannot be found which you want to update!");

  res.send("The student has been updated successfully!");
});

// Removing existing student
router.delete("/:id", (req, res) => {
  Student.findByIdAndRemove(req.params.id)
    .then((student) => {
      if (student) {
        return res.status(200).json({
          success: true,
          message: "The student has been deleted successfully!",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "student not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
