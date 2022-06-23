const router = require('express').Router();
const TodoList = require('../models/TodoList')

router.get('/reports', async(req, res) => {
    try{
        let totalEntriesInLast7Days = await TodoList.find({
            "dateCreated": {
                $gte: new Date().getDate() - 7
            }
        }).countDocuments()

        let totalEntriesAWeekBefore = await TodoList.find({
            "dateCreated": {
                $gte: new Date().getDate() - 14,
                $lt: new Date().getDate() - 7
            }
        }).countDocuments()

        let averageTasksByEachUser = await TodoList.aggregate([
            { $group: { _id: "$user", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ])

        let sum = 0
        for(let i = 0; i < averageTasksByEachUser.length; i++){
            sum += averageTasksByEachUser[i].count
        }

        let averageTasksByEachUserAverage = Math.round(sum / averageTasksByEachUser.length)

        let allTasks = await TodoList.find({})

        //get unique users
        let uniqueUsers = []
        for(let i = 0; i < allTasks.length; i++){
            if(!uniqueUsers.includes(allTasks[i].user)){
                uniqueUsers.push(allTasks[i].user)
            }
        }

        //get tasks for each user
        let tasksByEachUser = []
        for(let i = 0; i < uniqueUsers.length; i++){
            let tasks = await TodoList.find({
                user: uniqueUsers[i]
            })
            tasksByEachUser.push({
                user: uniqueUsers[i],
                tasks: tasks
            })
        }

        res.json({
            totalEntriesInLast7Days,
            totalEntriesAWeekBefore,
            averageTasksByEachUserAverage,
            tasksByEachUser
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
})

module.exports = router;