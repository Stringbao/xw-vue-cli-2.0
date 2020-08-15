
const Util = require("../../tool/util.js");
const fsTool = require("../../tool/fsapi.js");

let Router = {
    //写入Route Index入口文件
    writeRouter(projectPath, pages){
        let filePath = projectPath + "/src/route/index.js";

        let data = [];
        pages.forEach((x,index)=>{
            let moduleName = Util.firstChatUpperLower(x.moduleName, false);
            let tmp = {
                path:"/"+ moduleName + Util.firstChatUpperLower(Util.getFileName(x.pageName),false),
                name: moduleName +Util.firstChatUpperLower(Util.getFileName(x.pageName),false),
                componentPath: "/" + moduleName + "/" + x.pageName
            }
            //登录完毕后默认跳转到第一个路由页面
            if(index == 0){
                let loginStr = Util.compileByData("../ejstemplates/login.ejs",{path:tmp.path});
                fsTool.file.writeFile(projectPath + "/src/pages/views/login/login.vue", loginStr);
            }
            data.push(tmp);
        })
        
        let _data = Util.compileByData("../ejstemplates/router.ejs",{data:data});
        fsTool.file.writeFile(filePath, _data);
    }
}

module.exports = Router;