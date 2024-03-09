const express = require("express");
const { lectureModel } = require("../Model/lectureModel");
const { auth } = require("../Middlewares/authMiddleware");

const lectureRouter = express.Router();
// lectureRouter.use(auth);

// To Add a new lecture
lectureRouter.post("/add", async (req, res) => {
    try {
        const lecture = new lectureModel(req.body);
        await lecture.save();
        res.json({ msg: "New Lecture has been added", lecture: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// To Get all lectures
lectureRouter.get("/", async (req, res) => {
    try {
        const lectures = await lectureModel.find();
        res.json({ msg: "List of Lectures", lectures });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// To Update a lecture
lectureRouter.patch("/update/:lectureID", async (req, res) => {
    const { lectureID } = req.params;

    try {
        const lecture = await lectureModel.findByIdAndUpdate(
            { _id: lectureID },
            req.body
        );

        if (lecture) {
            res.json({ msg: `${lecture.name} has been updated`, lecture });
        } else {
            res.status(404).json({ msg: "Lecture not found" });
        }
    } catch (error) {
        console.error("Error updating lecture:", error);
        res.status(500).json({ error: error.message });
    }
});

// To Delete a lecture
lectureRouter.delete("/delete/:lectureID", async (req, res) => {
    const { lectureID } = req.params;

    try {
        const lecture = await lectureModel.findByIdAndDelete(lectureID);

        if (lecture) {
            res.json({ msg: `${lecture.name} has been deleted`, lecture });
        } else {
            res.status(404).json({ msg: "Lecture not found" });
        }
    } catch (error) {
        console.error("Error deleting lecture:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    lectureRouter
};
