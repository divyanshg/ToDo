class Task{
    constructor(task){
        this.id = task.id;
        this.title = task.title;
        this.completed = task.completed;
        this.dueDate = task.dueDate;
        this.user = task.user;
        this.category = task.category;
    }
}

module.exports = Task;