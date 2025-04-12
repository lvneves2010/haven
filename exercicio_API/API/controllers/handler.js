const { title } = require('process');
const database = require ('../data/memory');


const endPoint1 = (req, res) => {
    res.json({message: "Hello!!!"})
};

const endPoint2 = (req, res) => {
    try {
        const newUser = {
            user: req.body.user,
            age: req.body.age
        }

        database.users.push(newUser);
        res.status(201).send(`success adding user ${newUser.user}.`)

    } catch (error) {
        res.status(500).send('Error adding user: ' + error.message);
    }
}

const endPoint3 = (req, res) => {
    try {

        let userList = database.users
        res.status(200).send(userList)

    } catch (error) {
        res.status(500).send('Error retrieving users: ' + error.message);
    }
}

const endPoint4 = ( req, res ) => {
    try {
        const tasksInDatabase = database.tasks;
        let taskId = 1
    
        if(tasksInDatabase.length > 0) {
            let lastTaskId = 1
            tasksInDatabase.map((t) => {
                if(t.id >= lastTaskId){
                    lastTaskId = t.id
                    taskId = t.id + 1;
                }
            })
        }
        const newTask = {
            id: taskId,
            title: req.body.title,
            dueDate: req.body.dueDate,
            done: false
        }
        database.tasks.push(newTask);
        res.status(201).send(`success adding task ${newTask.title}.`)

    } catch (error) {
        res.status(500).send('Error adding task: ' + error.message);
    }
}


const endPoint5 = (req, res) => {
    try {

        let taskList = database.tasks
        res.status(200).send(taskList)

    } catch (error) {
        res.status(500).send('Error retrieving tasks: ' + error.message);
    }
}

module.exports = { endPoint1, endPoint2, endPoint3, endPoint4, endPoint5 };