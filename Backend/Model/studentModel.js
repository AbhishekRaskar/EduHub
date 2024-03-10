const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String},
    contact: { type: Number, required: true },
    course: { type: String }
}, {
    versionKey: false
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = {
    studentModel
};
