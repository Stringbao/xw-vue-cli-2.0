

const express = require('express');
const controller = require('./api.js');

const router = express.Router();

router.post("/createModuleFolder",controller.createModuleFolder);
router.post("/createModuleFile",controller.createModuleFile);
router.get("/getProjects",controller.getProjectsPath);
router.post("/savePage",controller.savePage);
router.post("/createGlobalFile",controller.createGlobalFile);
router.post("/resetConfig",controller.resetConfig);
router.post("/saveProxy",controller.saveProxy);

module.exports = router;