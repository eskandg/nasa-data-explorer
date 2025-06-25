require("dotenv").config()

const express = require("express")
const router = require("./router")
const app = express()

const port = 8000

app.use("/", router())

app.listen(port, console.log(`Express server is running on port ${port}`))