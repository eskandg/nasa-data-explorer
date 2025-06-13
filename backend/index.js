const express = require("express")
const app = express()

const port = 8000

app.use("/", (req, res) => {
  res.send("Server running")
})

app.listen(port, console.log(`Express server is running on port ${port}`))