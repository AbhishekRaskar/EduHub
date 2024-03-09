const express = require("express")
const cors = require("cors")
const { Connection } = require("./Config/db")
const { studentRouter } = require("./Routes/studentRoutes")
const { lectureRouter } = require("./Routes/lectureRoutes")
const { adminRouter } = require("./Routes/adminRoutes")
require("dotenv").config()


const app = express()

app.use(cors())
app.use(express.json());

app.use("/students", studentRouter)
app.use("/lectures", lectureRouter)
app.use("/admin", adminRouter);


app.listen(process.env.PORT, async () => {
    try {
        await Connection
        console.log(`Server is running at PORT ${process.env.PORT}`);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Something Went Wrong");
        console.log(error.message);
    }
})