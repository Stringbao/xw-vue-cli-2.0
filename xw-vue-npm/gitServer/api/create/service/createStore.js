const _config = require("../../pathConfig");
const ejsTool = require("../../ejs/ejsapi");
const path = require("path");
const fsTool = require("../../fs/fsapi");

module.exports = {
    /* 创建store index */
    createStore(projectPath,data){
        let storePath = projectPath + "/" + _config.storePath.store + "/index.js";
        let ejsPath = path.resolve(__dirname,_config.storePath.ejs + "index.ejs");
        fsTool.createFile(storePath);
        let ejsStr = fsTool.readFile(ejsPath);
        let ejsData = {
            data:data
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData)
        fsTool.writeFile(storePath,_data);
        console.log("写入store index成功");
    },
    // 创建store module
    createStoreModule(projectPath,moduleName,data){
        let storePath = projectPath + "/" + _config.storePath.store + "modules/"+moduleName+".js";
        let ejsPath = path.resolve(__dirname,_config.storePath.ejs + "module.ejs");
        fsTool.createFile(storePath);
        let ejsStr = fsTool.readFile(ejsPath);
        let ejsData = {
            data:data,
            moduleName,
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData)
        fsTool.writeFile(storePath,_data);
        console.log("写入storeModule成功")
    },
}