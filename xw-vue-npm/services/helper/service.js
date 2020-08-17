const Util = require("../../tool/util.js");
const fsTool = require("../../tool/fsapi.js");
const modelHelper = require("./model.js");

let Service = {
    //create service file
    createServiceFile(projectPath, module){
        let serviceItem = module.Services;
        let storeItems = module.Store;
        let moduleName = module.ModuleName;
        let path = projectPath + "/src/services/";
        let filePath = path + Util.firstChatUpperLower(moduleName,false) + "Services.js";
        fsTool.file.createFile(filePath);

        let maps = [];
        serviceItem.forEach(x=>{
            if(x.url){
                let model = modelHelper.getModelByModelName(module.modelList, x.model);
                maps.push({name:x.name, model:model, url:x.url, isEnum:false, fnName:x.name,isGetReq:x.reqType?x.reqType:"get"});
            }
        })
        storeItems.forEach(x=>{
            if(x.url){
                maps.push({name:x.name, model:[], url:x.url, isEnum: x.type =='enum',fnName: "get"+Util.firstChatUpperLower(x.name, true), isGetReq:x.reqType?x.reqType:"get"});
            }
        })
        
        let resJson = {map:[], fns:[]};
        maps.forEach(x=>{
            if(!x.isEnum){
                resJson.map.push(x);
            }
            resJson.fns.push({fnName:x.fnName, model:x.model, url:x.url,mapKey:x.name, isEnum: x.isEnum, isGetReq:x.isGetReq});
        })
        //write content to file by ejs
        let _data = Util.compileByData("../ejstemplates/service.ejs",{data: resJson});
        fsTool.file.writeFile(filePath, _data);
    },
    //get default service(create, update, detail, remove)
    getDefaultService(services){
        let res = [];
        services.forEach(x=>{
            if(x.url && x.stype == 1){
                res.push({key:x.name,value:x.name,actionName:x.name,item:x});
            }
        })
        return res;
    }
}

module.exports = Service;