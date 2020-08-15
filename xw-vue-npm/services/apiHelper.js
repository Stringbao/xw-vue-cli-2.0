
const fsTool = require("../tool/fsapi.js");
const ejs = require("ejs");
const NPath = require("path");
const ProjectPathTool = require("./pathStore.js");
const _ = require("lodash");
const Util = require("../tool/util.js");

let APIhelper = {
    //处理View文件的更新和修改
    viewDeal(data, tag, commonStore){
        const projectPath = ProjectPathTool.get();
        let routers = [];
        let storeKeys = [];
        data.forEach(item => {
            let pages = item.Pages;
            let moduleName = item.ModuleName;
            let services = item.Services;
            let stores = item.Store;
            let folerPath = projectPath + "/src/pages/views/" + Util.firstChatUpperLower(moduleName, false);
            storeKeys.push(moduleName);
            pages.forEach(x=>{
                x.moduleName = moduleName;
            })
            Array.prototype.push.apply(routers, pages);

            if(tag == "update"){
                if(!fsTool.exists(folerPath)){
                    this.createModelFile(projectPath, item);
                    this.createServiceFile(projectPath, item);
                    this.createHelperFile(projectPath, moduleName);
                    this.createStoreFile(projectPath, item);
                    this.createView(projectPath, item, commonStore);
                }
            }else{
                this.createModelFile(projectPath, item);
                this.createServiceFile(projectPath, item);
                this.createHelperFile(projectPath, moduleName);
                this.createStoreFile(projectPath, item);
                this.createView(projectPath, item, commonStore);
            }
        });
        
        if(tag == "update"){
            this.updateStoreIndex(projectPath, storeKeys, commonStore);
            this.updateRouter(projectPath, routers);
        }else{
            this.writeStoreIndex(projectPath, storeKeys, commonStore);
            this.writeRouter(projectPath, routers);
        }
    },
    //创建project.json到项目root目录
    writeProjectJson(modules,commonStore){
        let projectJSON = {
            Modules:modules,
            commonStore:commonStore,
            absoultePath:ProjectPathTool.get()
        }

        fsTool.file.writeFile(projectJSON.absoultePath+ "/project.json", JSON.stringify(projectJSON));
    },
    //根据页面名称获取当前页面的Model
    getModelByModelName(modelList, modelName){
        let res = [];
        modelList.forEach(x=>{
            if(x.name == modelName){
                res = x.props;
            }
        })
        return res;
    },
    //处理SearchModel
    convertSearchModel(models){
        let str = [];
        models.forEach(x=>{
            str.push(x.field + "=${this.searchModel."+x.field+"}");
        })
        return str.join('&');
    },
    //获取固化的服务
    getDefaultService(page, services){
        let res = [];
        services.forEach(x=>{
            if(x.url && x.stype == 1){
                res.push({key:x.name,value:x.name,actionName:x.name,item:x});
            }
        })
        return res;
    },
    //为单个model.js准备数据
    getMoldeDataFromPageItem(model){
        let tmp = {className:"",data:[]};
        tmp.className = Util.firstChatUpperLower(model.name, true) + "Model";
        
        model.props.forEach(x=>{
            tmp.data.push(x.field);
        })
        return tmp;
    },
    //ejs编译模板
    compileByData(ejsPath, data){
        let path = NPath.resolve(__dirname, ejsPath);
        let ejsStr = fsTool.file.readFile(path);
        return ejs.compile(ejsStr)(data);
    },
    //创建单个Module下的Model文件, 并且写入数据
    createModelFile(projectPath, module){
        let modelList = module.modelList;
        //create model file
        let path = projectPath + "/src/model/";
        modelList.forEach(x=>{
            let filePath = path + Util.firstChatUpperLower(x.name, false) + "Model.js";
            fsTool.file.createFile(filePath);
            let res = this.getMoldeDataFromPageItem(x);
            let _data = this.compileByData("../ejstemplates/model.ejs",{data:res});
            fsTool.file.writeFile(filePath, _data);
        })
    },
    //创建单个Module下的Service文件, 并且写入数据
    createServiceFile(projectPath, module){
        //create model file
        let serviceItem = module.Services;
        let storeItems = module.Store;
        let moduleName = module.ModuleName;
        let path = projectPath + "/src/services/";
        let filePath = path + Util.firstChatUpperLower(moduleName,false) + "Services.js";
        fsTool.file.createFile(filePath);

        let maps = [];
        serviceItem.forEach(x=>{
            if(x.url){
                let model = this.getModelByModelName(module.modelList, x.model);
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
        let _data = this.compileByData("../ejstemplates/service.ejs",{data: resJson});
        fsTool.file.writeFile(filePath, _data);
    },
    //创建单个Module下的Helper文件
    createHelperFile(projectPath, moduleName){
        let path = projectPath + "/src/helper/";
        let filePath = path + Util.firstChatUpperLower(moduleName, false) + "Helper.js";
        fsTool.file.createFile(filePath);

        //write content to file
        let _data = this.compileByData("../ejstemplates/helper.ejs",{data: {}});
        fsTool.file.writeFile(filePath, _data);
    },
    //创建单个Module下的Store文件, 并且写入数据
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
        let _data = this.compileByData("../ejstemplates/store/store.module.ejs",{data: data});
        fsTool.file.writeFile(filePath, _data);
    },
    //写入Store Index入口文件
    writeStoreIndex(projectPath, storeKeys, commonStore){
        let filePath = projectPath + "/src/store/index.js";

        let imports = [];
        storeKeys.forEach(x=>{
            imports.push({className:Util.firstChatUpperLower(x, true) + "Store",filePath:Util.firstChatUpperLower(x, false) + ".js"});
        })
        let hasCommonStore = commonStore.length == 0?false:true;

        let _data = this.compileByData("../ejstemplates/store/store.ejs",{data:{ imports : imports,hasCommonStore:hasCommonStore}});
        fsTool.file.writeFile(filePath, _data);
    },
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
                let loginStr = this.compileByData("../ejstemplates/login.ejs",{path:tmp.path});
                fsTool.file.writeFile(projectPath + "/src/pages/views/login/login.vue", loginStr);
            }
            data.push(tmp);
        })
        
        let _data = this.compileByData("../ejstemplates/router.ejs",{data:data});
        fsTool.file.writeFile(filePath, _data);
    },
    checkDialog(modulePath, page, data){
        if(page.hasDialog){
            let vuePath = modulePath + "/dialog.vue";
            fsTool.file.createFile(vuePath);
            let ejsPath = "../ejstemplates/view/dialog.ejs";
            let _data = this.compileByData(ejsPath, {data: data});
            fsTool.file.writeFile( modulePath + "/dialog.vue", _data);
        }
    },
    //创建view文件，并且准备数据(维度：Module)
    createView(projectPath, module, commonStore){
        let pages = module.Pages;
        let moduleName = module.ModuleName;
        let services = module.Services;
        let stores = module.Store;
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
            
            let _data = this.compileByData(ejsPath, {data:pageData});
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
        let _data = this.compileByData("../ejstemplates/common/service.ejs",{data: resJson});
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
        let _data = this.compileByData("../ejstemplates/common/store.ejs",{data: data});
        fsTool.file.writeFile(filePath, _data);
    },
    //获取当前页面所有包含 dataSource 属性的key
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
            let model = this.getModelByModelName(module.modelList, page.model);
            model.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
        }else{
            let model = this.getModelByModelName(module.modelList, page.model);
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
        let actionDefaultServices = this.getDefaultService(page,services);
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
        
        let storeKeys = this.getStoreInPage(page, module);
        let hasStore = false;
        let storeName = "";
        let storeActions = [];
        
        storeKeys = this.getStoreKeysInSelfStore(storeKeys, stores);
        if(storeKeys.length > 0){
            hasStore = true;
            storeName = Util.firstChatUpperLower(moduleName, true) + "Store";
            storeKeys.forEach(x=>{
                storeActions.push("get" + Util.firstChatUpperLower(x,true));
            })
        }
        let hasModel = true;
        let hasDialog = page.hasDialog;
        let modelArray = this.getModelByModelName(module.modelList, page.model);
        
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
        this.writeStoreIndex(projectPath, storeKeys, commonStore);
    },
    updateRouter(projectPath, pages){
        let filePath = projectPath + "/src/route/index.js";
        let targetPath = projectPath + "/src/route/index_copy.js";
        fsTool.file.copy(filePath, targetPath);
        this.writeRouter(projectPath, pages);
    }
}


module.exports = APIhelper;