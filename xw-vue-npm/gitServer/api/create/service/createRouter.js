const _config = require("../../pathConfig");
const ejsTool = require("../../ejs/ejsapi");
const fsTool = require("../../fs/fsapi");
const path = require("path");
module.exports = (projectPath, data,isLayoutModule) => {
    let routerPath = projectPath + "/" + _config.routerPath.router;
    let routerEjsPath = path.resolve(__dirname, _config.routerPath.ejs);
    fsTool.createFile(routerPath);
    let ejsStr = fsTool.readFile(routerEjsPath);
    let _data = ejsTool.renderEjsTemplate(ejsStr,{
        data:data,
        isLayoutModule,
    });
    fsTool.writeFile(routerPath,_data);
    console.log("写入router成功");
}
