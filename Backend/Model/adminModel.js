const mongoose = require("mongoose");

// schema
const adminSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        city: { type: String, required: true },
        contact: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);

// model
const AdminModel = mongoose.model("admin", adminSchema);

module.exports = {
    AdminModel,
};
