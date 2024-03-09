const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
    title: { type: String, required: true },
    course: {
        type: String,
        required: true,
        enum: ['Backend', 'Frontend', 'Data Science']
    },
    startTime: { type: Date, required: true, default: Date.now },
    endTime: { type: Date, required: true, default: Date.now },
    discussions: { type: String, required: true }
}, {
    versionKey: false
});

const lectureModel = mongoose.model("lecture", lectureSchema);

module.exports = {
    lectureModel
};
