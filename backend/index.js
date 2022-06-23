require("dotenv").config()
const express = require('express')
const cors = require('cors')
const connectToDatabase = require("./db/connect")
const isTokenValid = require("./middleware/isTokenValid")

const generateToken = require("./middleware/generateToken")
const todoRoute = require("./routes/todos")
const taskRoute = require("./routes/tasks")
const adminRoute = require('./routes/admin')
const isAdmin = require("./middleware/isAdmin")

let port = process.env.PORT || 3000

const app = express()


app.use(cors())
app.use(express.json())

app.use('/get_token/:user', generateToken)
app.use('/api/todos', isTokenValid, todoRoute)
app.use('/api/tasks', isTokenValid, taskRoute)
app.use('/admin', isAdmin, adminRoute)


async function startServer() {
    await connectToDatabase()
        .then(() => {
            console.log("Connected to database")
        })
        .catch(err => {
            console.log("Failed to connect to database\n",err)
        })

    app.listen(port, () => {
        console.log("Server is running on port", port)
    })
}

startServer()