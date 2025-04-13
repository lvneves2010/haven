const database = require('../data/memory');
const usersList = database.users;
const taskList = database.tasks;

const endPoint1 = (req,res) => {
    res.status(200).send('request OK');
};

const users = (req,res) => {
    try{
        // usersList.sort((a, b) => a.name.localeCompare(b.name));
        usersList.sort((a, b) => b.age - a.age);
        res.status(200).send(usersList);

    } catch (error) {
        res.status(500).send('error retrieving users list');
    }
}

const new_user = (req, res) => {
    try{
            
        let newId = 1;

        if(usersList.length > 0){
            usersList.map((u) => {
                let lastId =1
                if(u.id >= lastId){
                    lastId = u.id;
                    newId = lastId + 1;
                };
            });
        };

        const newUser = {
            id : newId,
            name: req.body.name,
            age: req.body.age
        };

        usersList.push(newUser);

        res.status(201).send(`success creating user ${newUser.name}`);

    } catch (error) {
        res.status(500).send('error creating new user');
    };

}

const tasks = (req,res) => {
    try{
        taskList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        res.status(200).send(taskList);

    } catch (error) {
        res.status(500).send('error retrieving task list');
    }
}

const new_task = (req, res) => {
    try{
        const { title, dueDate } = req.body;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Invalid or missing "title"' });
        }

        const due = new Date(dueDate);
        if (isNaN(due.getTime()) || due < new Date()) {
            return res.status(400).json({ error: 'Invalid or past "dueDate"' });
        }

        let newId = 1;

        if(taskList.length > 0){
            taskList.map((u) => {
                let lastId =1
                if(u.id >= lastId){
                    lastId = u.id;
                    newId = lastId + 1;
                };
            });
        };

        const newTask = {
            id : newId,
            title: req.body.title,
            dueDate: req.body.dueDate,
            done: false
        };

        taskList.push(newTask);

        res.status(201).send(`success creating task ${newTask.title}`);

    } catch (error) {
        res.status(500).send('error creating new task');
    };

}

const task_complete = (req, res) => {
    try{
        taskList.map((t) => {
            if(t.id == req.body.id) {
                t.done = true;
                res.status(200).send(`task ${t.title} now completed`);
                return
            }
        })
    } catch (error) {
        res.status(500).send('error updating task');
    }
}

module.exports = { endPoint1, users, new_user, tasks, new_task, task_complete };