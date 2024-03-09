const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: Number, required: true },
    course: { type: String, required: true }
}, {
    versionKey: false
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = {
    studentModel
};
