const express = require('express');
const router = express.Router();
const { endPoint1, endPoint2, endPoint3, endPoint4, endPoint5 } = require('../controllers/handler');

router.get('/ep1', endPoint1);
router.post('/ep2', endPoint2);
router.get('/ep3', endPoint3);
router.post('/ep4', endPoint4);
router.get('/ep5', endPoint5);

module.exports = router;