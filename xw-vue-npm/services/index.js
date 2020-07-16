

const express = require('express');
const controller = require('./api.js');

const router = express.Router();

router.post("/create",controller.create);
router.get("/test",controller.test);

module.exports = router;