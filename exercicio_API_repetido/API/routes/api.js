const e = require('express');
const routes = e.Router();
const {endPoint1, users, new_user, tasks, new_task, task_complete} = require('../controllers/handlers');

routes.get('/ep1', endPoint1);
routes.get('/users', users);
routes.post('/new_user', new_user);
routes.get('/tasks', tasks);
routes.post('/new_task', new_task);
routes.put('/task_complete', task_complete)

module.exports = { routes };