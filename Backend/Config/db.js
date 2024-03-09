const mongoose = require("mongoose")
require("dotenv").config()

const Connection = mongoose.connect(process.env.MongoURL)


module.exports = {
    Connection
}