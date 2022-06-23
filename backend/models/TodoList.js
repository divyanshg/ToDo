const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    dueDate: String,
    category: String,
    user: String,
    dateCreated: {
        type: String,
        default: new Date().getDate()
    },
})

const TodoList = mongoose.model("TodoList", TaskSchema)

module.exports = TodoList