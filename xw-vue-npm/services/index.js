

const express = require('express');
const controller = require('./api.js');

const router = express.Router();

router.post("/create",controller.create);

module.exports = router;