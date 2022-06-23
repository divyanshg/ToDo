const router = require('express').Router();
const TodoList = require('../models/TodoList')

function getTodaysDate(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function getNextDaysDate(){
    let today = new Date();
    let dd = String(today.getDate() + 1).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

router.get('/due_today', async (req, res) => {
    try{
        let todos = await TodoList.find({ dueDate: getTodaysDate(), user: req.userId })
        todos = todos.sort((a, b) => Number(a.completed) - Number(b.completed));
        res.status(200).json(todos)
    }catch(error){
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.get('/due_tomorrow', async (req, res) => {
    try{
        let todos = await TodoList.find({ dueDate: getNextDaysDate(), user: req.userId })
        todos = todos.sort((a, b) => Number(a.completed) - Number(b.completed));
        res.status(200).json(todos)
    }catch(error){
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.get('/overdue', async(req, res) => {
    try{
        let todos = await TodoList.find({ dueDate: { $lt: getTodaysDate() }, user: req.userId })
        todos = todos.sort((a, b) => Number(a.completed) - Number(b.completed));
        res.status(200).json(todos)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.get('/all', async(req, res) => {
    try{
        let todos = await TodoList.find({completed: false, user: req.userId})
        // todos = todos.sort((a, b) => Number(a.completed) - Number(b.completed));
        res.status(200).json(todos)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.get('/archive', async(req, res) => {
    try{
        let todos = await TodoList.find({completed: true, user: req.userId})
        res.status(200).json(todos)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

module.exports = router;