require("dotenv").config()

const express = require("express")
const router = require("./router")
const cors = require("cors")
const app = express()

const port = 8000

const allowedOrigins = [
    "http://localhost:3000",
    "https://nasa-data-explorer-web.vercel.app"
]

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true) // allowed
        }
        else {
            callback(new Error("Origin not allowed by CORS policy"))
        }
    },
    methods: ["GET"]
}

app.use(cors(corsOptions))

app.use("/", router())

app.listen(port, console.log(`Express server is running on port ${port}`))