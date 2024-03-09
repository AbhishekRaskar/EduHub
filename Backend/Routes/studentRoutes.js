const express = require("express");
const { studentModel } = require("../Model/studentModel");
const bcrypt = require("bcrypt");

const studentRouter = express.Router();

// Registration
studentRouter.post("/signup", async (req, res) => {
    const { name, email, password, contact, course } = req.body; // Include course here

    try {
        const student = await studentModel.findOne({ email });
        if (student) {
            res.status(400).json({ msg: "Student is already registered." });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newStudent = new studentModel({ name, email, password: hash, contact, course }); // Include course here
                await newStudent.save();
                res.status(200).json({ msg: "Student has been registered successfully." });
            });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
studentRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await studentModel.findOne({ email });
        if (student) {
            bcrypt.compare(password, student.password, (err, result) => {
                if (result) {
                    res.status(200).json({
                        msg: "Login successful.",
                        student: {
                            studentName: student.name,
                            studentEmail: student.email,
                            studentCourse: student.course
                        }
                    });
                } else {
                    res.status(400).json({ msg: "Wrong credentials." });
                }
            });
        } else {
            res.status(400).json({ msg: "Student not found." });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Profile
studentRouter.put("/profile", async (req, res) => {
    const { email } = req.body;
    try {
        const student = await studentModel.findOne({ email });
        if (student) {
            // Update profile fields here
            // For example, update name and contact
            student.name = req.body.name;
            student.contact = req.body.contact;
            await student.save();
            res.status(200).json({ msg: "Profile updated successfully." });
        } else {
            res.status(400).json({ msg: "Student not found." });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = {
    studentRouter
};
