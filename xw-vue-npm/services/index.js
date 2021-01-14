

const express = require('express');
const controller = require('./api.js');
const path = require("path");
const fsTool = require("../tool/fsapi.js");

const router = express.Router();

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let tempFolder= path.resolve(__dirname, "../temp");
        if(!fsTool.exists(tempFolder)){
            fsTool.folder.createFolder(tempFolder);
        }
        cb(null, tempFolder);
    }, 
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage:storage
});

router.post("/create", controller.create);
router.post("/update", controller.update);
router.get("/getConfigPath", controller.getConfigPath);
router.post("/setConfigPath", controller.setConfigPath);
router.post("/upload", upload.single('file'), controller.upload);

module.exports = router;