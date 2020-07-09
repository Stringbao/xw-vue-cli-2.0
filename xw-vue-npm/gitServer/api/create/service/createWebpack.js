const _config = require("../../pathConfig");
const ejsTool = require("../../ejs/ejsapi");
const path = require("path");
const fsTool = require("../../fs/fsapi");

module.exports = (projectPath,data) => {
    let webpackPath = projectPath + "/" + _config.webpackPath.webpack;
    let webpackEjsPath =  path.resolve(__dirname, _config.webpackPath.ejs);
    fsTool.createFile(webpackPath);
    let ejsStr = fsTool.readFile(webpackEjsPath);
    console.log(data);
    let ejsData = {
        data:data
    };
    let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);
    fsTool.writeFile(webpackPath,_data);
    console.log("写入webpack成功");
}