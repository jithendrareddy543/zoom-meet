const express = require('express');
const router = express.Router();
const zoomController = require('../controllers/zoomController')

router.get('/zoomAuth', zoomController.zoomAuth)
router.post('/scheduleMeet', zoomController.scheduleMeet)

module.exports = router;
