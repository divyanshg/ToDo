const router = require('express').Router();
const TodoList = require('../models/TodoList')
const Task = require('../models/Tasks')

router.post('/new', async(req, res) => {
    try{
        let task = await new Task({...req.body, user: req.userId})
        console.log(task)

        //save task to db
        await new TodoList(task).save()

        res.status(200).json(task)
    }catch(error){
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.post('/update/:task_id', async(req, res) => {
    try{
        let task = await TodoList.findOneAndUpdate({_id: req.params.task_id}, req.body, { returnOriginal: false })
        res.status(200).json(task)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

router.post('/delete/:task_id', async(req, res) => {
    try{
        let task = await TodoList.findOneAndDelete({_id: req.params.task_id})
        res.status(200).json(task)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

module.exports = router;