const express = require('express');
const routes = express.Router();
const apiRoutes = require('../controllers/handler');

routes.get('/ep1', apiRoutes.endPoint1);
routes.post('/ep2', apiRoutes.endPoint2);
routes.get('/ep3', apiRoutes.endPoint3);

module.exports = { routes };