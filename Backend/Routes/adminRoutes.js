const express = require("express");
const { AdminModel } = require("../Model/adminModel");
const adminRouter = express.Router();
// name: String,
// img: String,
// email: String,
// password: String,
// city: String,
// contact: String,

// for hashing & comparing a password
const bcrypt = require("bcrypt");

// for genrating a token
const jwt = require("jsonwebtoken");

// dot env accessing variables
require("dotenv").config();

// register
adminRouter.post("/admin-register", async (req, res) => {
    const { name, email, img, password, city, contact } = req.body;
    try {
        const user = await AdminModel.findOne({ email });
        if (user) {
            res.status(400).json({ msg: "User is already Registered....!" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newUser = new AdminModel({ ...req.body, password: hash });

                await newUser.save();

                res
                    .status(200)
                    .json({ msg: "Admin has been Registerd", admin: req.body });
            });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// login
adminRouter.post("/admin-login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await AdminModel.findOne({ email });
        console.log(user);
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ role: "Admin" }, process.env.secret);

                    // To send in body
                    res.status(200).json({
                        msg: "Login Successfull....!",
                        token: token,
                    });

                    // To send in headers
                    // res.header('Authorization', `Bearer ${token}`).status(200).json({ msg: "Login Successful....!", token: token });
                } else res.status(400).json({ msg: "Wrong Credentials" });
            });
        } else {
            res.status(400).json({ msg: "User not Exist" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// get
adminRouter.get("/", async (req, res) => {
    try {
        const admin = await AdminModel.find();
        res.json({ msg: "Admin List", admin });
    } catch (error) {
        res.json({ error: error.message });
    }
});
module.exports = {
    adminRouter,
};
