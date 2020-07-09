const _config = require("../../pathConfig");
const ejsTool = require("../../ejs/ejsapi");
const path = require("path");
const fsTool = require("../../fs/fsapi");

module.exports = (projectPath,data) => {
    let proxyPath = projectPath + "/" + _config.apiPath.api + "/proxyUrl.js";
    let proxyEjsPath =  path.resolve(__dirname, _config.apiPath.proxyUrlEjs);
    fsTool.createFile(proxyPath);
    let ejsStr = fsTool.readFile(proxyEjsPath);
    let ejsData = {
        data:data
    };
    let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);
    fsTool.writeFile(proxyPath,_data);
    console.log("写入proxyUrl成功");
}