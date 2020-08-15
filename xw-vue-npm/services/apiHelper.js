
const fsTool = require("../tool/fsapi.js");
const NPath = require("path");
const ProjectPathTool = require("./pathStore.js");
const _ = require("lodash");
const Util = require("../tool/util.js");

const helper = require("./helper/helper.js");
const modelHelper = require("./helper/model.js");
const routerHelper = require("./helper/router.js");
const serviceHelper = require("./helper/service.js");
const storeHelper = require("./helper/store.js");

let APIhelper = {
    //处理View文件的更新和修改
    viewDeal(data, tag, commonStore){
        const projectPath = ProjectPathTool.get();
        let routers = [];
        let storeKeys = [];
        data.forEach(item => {
            let pages = item.Pages;
            let moduleName = item.ModuleName;
            let folerPath = projectPath + "/src/pages/views/" + Util.firstChatUpperLower(moduleName, false);
            storeKeys.push(moduleName);
            pages.forEach(x=>{
                x.moduleName = moduleName;
            })
            Array.prototype.push.apply(routers, pages);

            if(tag == "update"){
                if(!fsTool.exists(folerPath)){
                    modelHelper.createModelFile(projectPath, item);
                    serviceHelper.createServiceFile(projectPath, item);
                    helper.createHelperFile(projectPath, moduleName);
                    storeHelper.createStoreFile(projectPath, item);
                    this.createView(projectPath, item, commonStore);
                }
            }else{
                modelHelper.createModelFile(projectPath, item);
                serviceHelper.createServiceFile(projectPath, item);
                helper.createHelperFile(projectPath, moduleName);
                storeHelper.createStoreFile(projectPath, item);
                this.createView(projectPath, item, commonStore);
            }
        });
        
        if(tag == "update"){
            this.updateStoreIndex(projectPath, storeKeys, commonStore);
            this.updateRouter(projectPath, routers);
        }else{
            storeHelper.writeStoreIndex(projectPath, storeKeys, commonStore);
            routerHelper.writeRouter(projectPath, routers);
        }
    },
    //处理SearchModel
    convertSearchModel(models){
        let str = [];
        models.forEach(x=>{
            str.push(x.field + "=${this.searchModel."+x.field+"}");
        })
        return str.join('&');
    },
    checkDialog(modulePath, page, data){
        if(page.hasDialog){
            let vuePath = modulePath + "/dialog.vue";
            fsTool.file.createFile(vuePath);
            let ejsPath = "../ejstemplates/view/dialog.ejs";
            let _data = Util.compileByData(ejsPath, {data: data});
            fsTool.file.writeFile( modulePath + "/dialog.vue", _data);
        }
    },
    //创建view文件，并且准备数据(维度：Module)
    createView(projectPath, module, commonStore){
        let pages = module.Pages;
        let moduleName = module.ModuleName;
        let filePath = projectPath + "/src/pages/views";
        
        let modulePath = filePath + "/" + Util.firstChatUpperLower(moduleName, false);
        //创建Module文件夹
        fsTool.folder.createFolder(modulePath);

        console.log("ready to create vue file");
        pages.forEach(x=>{
            let vuePath = modulePath + "/" + Util.firstChatUpperLower(x.pageName, false);
            //创建vue文件
            console.log(vuePath,99999);
            fsTool.file.createFile(vuePath);
            console.log("create vue completed;")
            
            let pageData = this.dataForListView(x, module, commonStore);
            let ejsPath = x.type == "list"?"../ejstemplates/view/list.ejs":"../ejstemplates/view/save.ejs";
            let includeFormPath = NPath.resolve(__dirname, "../ejstemplates/view/form.ejs");
            pageData.includeFormPath = includeFormPath;
            
            let _data = Util.compileByData(ejsPath, {data:pageData});
            fsTool.file.writeFile( modulePath + "/" + x.pageName, _data);
            this.checkDialog(modulePath, x, pageData);
        })
    },
    //创建Core services
    createCommonServices(data){
        const projectPath = ProjectPathTool.get();
        let filePath = projectPath + "/src/services/commonServices.js";
        fsTool.file.createFile(filePath);

        let maps = [];
        data.forEach(x=>{
            if(x.url){
                maps.push({name:x.name, model:[], url:x.url, isEnum: x.type =='enum',fnName: "get"+Util.firstChatUpperLower(x.name, true), isGetReq:x.reqType?x.reqType:"get"});
            }
        })
        
        let resJson = {map:[], fns:[]};
        maps.forEach(x=>{
            if(!x.isEnum){
                resJson.map.push(x);
            }
            resJson.fns.push({fnName:x.fnName, url:x.url,mapKey:x.name, isEnum: x.isEnum, isGetReq:x.isGetReq});
        })
        //write content to file by ejs
        let _data = Util.compileByData("../ejstemplates/common/service.ejs",{data: resJson});
        fsTool.file.writeFile(filePath, _data);
    },
    //创建Core store
    createCommonStore(storeItems){
        const projectPath = ProjectPathTool.get();
        let filePath = projectPath + "/src/store/modules/commonStore.js";
        fsTool.file.createFile(filePath);

        let stateKeys = [];
        let mutations = [];
        let actions = [];
        let servicesClassName = "CommonServices";
        let servicesPath =  "commonServices.js";
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
        let _data = Util.compileByData("../ejstemplates/common/store.ejs",{data: data});
        fsTool.file.writeFile(filePath, _data);
    },
    //处理当前页面数据
    dataForListView(page, module, commonStore){
        
        let moduleName = module.ModuleName;
        let services = module.Services;
        let stores = module.Store;

        let hasCommonStore = commonStore.length == 0?false:true;
        let pageTitle = page.pageTitle?page.pageTitle:"";
        let templateSearchModel = page.config && page.config.searchModel?_.chunk(page.config.searchModel, 3):[];
        let searchModel = page.config && page.config.searchModel;
        let toolbar = page.config?page.config.toolbar:[];
        let actionDefaultServices = serviceHelper.getDefaultService(services);
        let hasCreateArray = actionDefaultServices.filter(x=>{
            return x.key == "create";
        })
        let pageOpts = {
            isCheckbox:false,
            isRadio:false,
            url:"",
            map:"",
            sizeKey:"",
            indexKey:""
        };
        if(page.config && page.config.table){
            let t = page.config.table;
            let urlSuff = t.url.indexOf('?') == -1?'?':"&";
            pageOpts = {
                isCheckbox:t.showCK == 'checkbox'?true:false,
                isRadio:t.showCK =="radio"?true:false,
                url:"`"+ t.url + urlSuff + this.convertSearchModel(searchModel)+"`",
                map:t.map,
                sizeKey:t.page.pageSize,
                indexKey:t.page.currentPage,
                actionServices:actionDefaultServices
            }
        }
        let tableTitle = Util.firstChatUpperLower(moduleName, true)+ " " + Util.firstChatUpperLower(Util.getFileName(page.pageName),true) + " Table";
        let componentName = Util.firstChatUpperLower(moduleName,true) + Util.firstChatUpperLower(Util.getFileName(page.pageName),true);
        
        let storeKeys = storeHelper.getStoreInPage(page, module);
        let hasStore = false;
        let storeName = "";
        let storeActions = [];
        
        storeKeys = storeHelper.getStoreKeysInSelfStore(storeKeys, stores);
        if(storeKeys.length > 0){
            hasStore = true;
            storeName = Util.firstChatUpperLower(moduleName, true) + "Store";
            storeKeys.forEach(x=>{
                storeActions.push("get" + Util.firstChatUpperLower(x,true));
            })
        }
        let hasModel = true;
        let hasDialog = page.hasDialog;
        let modelArray = modelHelper.getModelByModelName(module.modelList, page.model);
        
        if(page.type == "list" && modelArray.length == 0){
            hasModel = false;
        }

        let commonStores = [];
        if(hasCommonStore){
            commonStore.forEach(x=>{
                let tmp = {name:x.name, fnName:"get" + Util.firstChatUpperLower(x.name,true)};
                commonStores.push(tmp);
            })
        }
        let serviceFileName = Util.firstChatUpperLower(moduleName, false) + "Services.js";
        let serviceClassName = Util.firstChatUpperLower(moduleName, true) + "Services";
        let modelFileName = Util.firstChatUpperLower(page.model, false)  + "Model.js";
        let modelClassName = Util.firstChatUpperLower(page.model, true) + "Model";
        let modelDataName = Util.firstChatUpperLower(page.model,false) + "Model";
        
        let data = {
            pageTitle,
            hasCreate:hasCreateArray.length == 1?true:false,
            templateSearchModel,
            searchModel,
            pageOpts,
            tableTitle,
            toolbar,
            componentName,
            hasDialog,
            hasCommonStore,
            commonStores,
            hasStore,
            store:{
                storeKeys,
                storeName,
                storeActions
            },
            service:{
                serviceFileName,
                serviceClassName
            },
            hasModel,
            model:{
                modelFileName,
                modelClassName,
                modelDataName,
                modelArray
            }
        }
        
        return data;
    },
    updateStoreIndex(projectPath, storeKeys, commonStore){
        let filePath = projectPath + "/src/store/index.js";
        let targetPath = projectPath + "/src/store/index_copy.js";
        fsTool.file.copy(filePath, targetPath);
        storeHelper.writeStoreIndex(projectPath, storeKeys, commonStore);
    },
    updateRouter(projectPath, pages){
        let filePath = projectPath + "/src/route/index.js";
        let targetPath = projectPath + "/src/route/index_copy.js";
        fsTool.file.copy(filePath, targetPath);
        routerHelper.writeRouter(projectPath, pages);
    }
}


module.exports = APIhelper;