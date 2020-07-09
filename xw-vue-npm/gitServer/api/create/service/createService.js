const _config = require("../../pathConfig");
const ejsTool = require("../../ejs/ejsapi");
const path = require("path");
const fsTool = require("../../fs/fsapi");

module.exports = (projectPath,moduleName,data) => {
    let servicePath = projectPath + "/" + _config.servicePath.service + "/"+moduleName+".js";
    let ejsPath = path.resolve(__dirname,_config.servicePath.ejs);
    fsTool.createFile(servicePath);
    let ejsStr = fsTool.readFile(ejsPath);
    let ejsData = {
        data:data,
        moduleName
    };
    let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

    fsTool.writeFile(servicePath,_data);
    console.log("写入service成功")
}