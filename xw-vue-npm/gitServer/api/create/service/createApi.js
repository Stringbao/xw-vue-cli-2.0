const _config = require("../../pathConfig");
const ejsTool = require("../../ejs/ejsapi");
const path = require("path");
const fsTool = require("../../fs/fsapi");

module.exports = (projectPath,moduleName,proxyDefaultKey,data) => {
    console.log("proxyDefaultKey>",proxyDefaultKey);
    let apiPath = projectPath + "/" + _config.apiPath.api + "/" + moduleName+".js";
    let apiEjsPath =  path.resolve(__dirname, _config.apiPath.ejs);
    fsTool.createFile(apiPath);
    let ejsStr = fsTool.readFile(apiEjsPath);
    let ejsData = {
        data:data,
        proxyDefaultKey,
    };
    let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);
    fsTool.writeFile(apiPath,_data);
    console.log("写入api成功");
}