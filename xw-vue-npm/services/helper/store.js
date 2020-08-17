
const Util = require("../../tool/util.js");
const fsTool = require("../../tool/fsapi.js");
const modelHelper = require("./model.js");

let Store = {
    createStoreFile(projectPath, module){
        let storeItems = module.Store;
        let moduleName = module.ModuleName;
        let path = projectPath + "/src/store/modules/";
        let filePath = path + Util.firstChatUpperLower(moduleName, false) + ".js"; 
        fsTool.file.createFile(filePath);

        let stateKeys = [];
        let mutations = [];
        let actions = [];
        let servicesClassName = Util.firstChatUpperLower(moduleName, true) + "Services";
        let servicesPath = Util.firstChatUpperLower(moduleName, false) + "Services.js";
        storeItems.forEach(x=>{
            let upName = Util.firstChatUpperLower(x.name ,true);
            stateKeys.push(x.name);
            mutations.push({fnName:"set"+upName, stateKey:x.name});
            actions.push({fnName:"get"+upName, stateKey:x.name,commitFnName:"set"+upName, serviceFnName:'get'+upName});
        })
        let data = {
            servicesClassName,
            servicesPath,
            stateKeys,
            mutations,
            actions
        }
        //write content to file
        let _data = Util.compileByData("../ejstemplates/store/store.module.ejs",{data: data});
        fsTool.file.writeFile(filePath, _data);
    },
    //write index.js (store)
    writeStoreIndex(projectPath, storeKeys, commonStore){
        let filePath = projectPath + "/src/store/index.js";

        let imports = [];
        storeKeys.forEach(x=>{
            imports.push({className:Util.firstChatUpperLower(x, true) + "Store",filePath:Util.firstChatUpperLower(x, false) + ".js"});
        })
        let hasCommonStore = commonStore.length == 0?false:true;

        let _data = Util.compileByData("../ejstemplates/store/store.ejs",{data:{ imports : imports,hasCommonStore:hasCommonStore}});
        fsTool.file.writeFile(filePath, _data);
    },
    //get all store which item has dataSource property
    getStoreInPage(page, module){
        let storeKeys = [];
        if(page.type == "list"){
            //check searchModel
            let searchModels = page.config.searchModel;
            searchModels.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
            let model = modelHelper.getModelByModelName(module.modelList, page.model);
            model.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
        }else{
            let model = modelHelper.getModelByModelName(module.modelList, page.model);
            model.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
        }
        return Array.from(new Set(storeKeys));
    },
    //获取当前页面在自身store的keys
    getStoreKeysInSelfStore(keys, stores){
        let res = [];
        keys.forEach(x=>{
            stores.forEach(xx =>{
                if(xx.name == x){
                    res.push(x);
                }
            })
        })
        return res;
    },
}

module.exports = Store;