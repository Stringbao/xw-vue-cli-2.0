
const fsTool = require("../tool/fsapi.js");
const ejs = require("ejs");
const NPath = require("path");
const ProjectPathTool = require("./pathStore.js");
const _ = require("loadsh");

let APIhelper = {
    //处理View文件的更新和修改
    viewDeal(data, tag){
        const projectPath = ProjectPathTool.get();
        let routers = [];
        let storeKeys = [];
        data.forEach(item => {
            let pages = item.Pages;
            let moduleName = item.ModuleName;
            let services = item.Services;
            let stores = item.Store;
            let folerPath = projectPath + "/src/pages/views/" + APIhelper.firstChatUpperLower(moduleName, false);
            storeKeys.push(moduleName);
            pages.forEach(x=>{
                x.moduleName = moduleName;
            })
            Array.prototype.push.apply(routers, pages);

            if(tag == "update"){
                if(!fsTool.exists(folerPath)){
                    this.createModelFile(projectPath, pages, moduleName, services);
                    this.createServiceFile(projectPath, services, stores.state, moduleName, pages);
                    this.createHelperFile(projectPath, moduleName);
                    this.createStoreFile(projectPath, stores.state, moduleName);
                    this.createView(projectPath, pages, moduleName, services);
                }
            }else{
                this.createModelFile(projectPath, pages, moduleName, services);
                this.createServiceFile(projectPath, services, stores.state, moduleName, pages);
                this.createHelperFile(projectPath, moduleName);
                this.createStoreFile(projectPath, stores.state, moduleName);
                this.createView(projectPath, pages, moduleName, services);
            }
        });
        
        if(tag == "update"){
            this.updateStoreIndex(projectPath, storeKeys);
            this.updateRouter(projectPath, routers);
        }else{
            this.writeStoreIndex(projectPath, storeKeys);
            this.writeRouter(projectPath, routers);
        }
        
        //创建project.json到项目root目录
        let projectJSON = {
            Modules:data,
            absoultePath:projectPath
        }
        
        fsTool.file.writeFile(projectJSON.absoultePath+ "/project.json", JSON.stringify(projectJSON));
    },
    //根据页面名称获取当前页面的Model
    getModelByPageName(pages, pageName){
        let pageNames = pageName.split(',');
        let res = [];
        pageNames.forEach(page=>{
            pages.forEach(x=>{
                if(x.pageName == page && x.model.length != 0){
                    Array.prototype.push.apply(res,x.model);
                }
            })
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
    //获取文件名(去掉后缀)
    getFileName(str){
        if(!str){
            return "";
        }
        return str.substring(0,str.indexOf('.'));
    },
    //首字母大写
    firstChatUpperLower(str,flag){
        if(!str){
            return "";
        }
        let first  = str.substring(0,1);
        let other = str.substring(1);
        if(flag){
            return first.toUpperCase() + other;
        }else{
            return first.toLowerCase() + other;
        }
        
    },
    //检测当前页面是否在服务页面里面
    checkPageName(page, pages){
        let res = pages.split(',').filter(x=>{
            return x == page;
        })
        return res.length>0?true:false;
    },
    //获取固化的服务
    getDefaultService(page, services){
        let res = [];
        services.forEach(x=>{
            if(x.url && x.stype == 1 && this.checkPageName(page.pageName, x.pageName)){
                res.push({key:x.name,value:x.name,actionName:x.name,item:x});
            }
        })
        return res;
    },
    //为单个model.js准备数据
    getMoldeDataFromPageItem(item, moduleName, actionDefaultServices){
        let tmp = {className:"",data:[]};
        let pageName = item.pageName;
        tmp.className = this.firstChatUpperLower(moduleName, true) + this.firstChatUpperLower(this.getFileName(pageName),true) + "Model";
        if(actionDefaultServices){
            tmp.data = ["id"];
        }else{
            item.model.forEach(x=>{
                tmp.data.push(x.field);
            })
        }
        return tmp;
    },
    compileByData(ejsPath, data){
        let path = NPath.resolve(__dirname, ejsPath);
        let ejsStr = fsTool.file.readFile(path);
        return ejs.compile(ejsStr)(data);
    },
    //创建单个Module下的Model文件, 并且写入数据
    createModelFile(projectPath, pages, moduleName, services){
        //create model file
        let path = projectPath + "/src/model/";
        pages.forEach( item => {
            let pageName = item.pageName;
            let filePath = path + this.firstChatUpperLower(moduleName,false) + this.firstChatUpperLower(this.getFileName(pageName), true) + "Model.js";
            if(item.model && item.model.length >0){
                fsTool.file.createFile(filePath);
                let res = this.getMoldeDataFromPageItem(item, moduleName);
                let _data = this.compileByData("../ejstemplates/model.ejs",{data:res});
                fsTool.file.writeFile(filePath, _data);
            }else{
                let actionDefaultServices = this.getDefaultService(item, services);
                if(actionDefaultServices.length > 0){
                    fsTool.file.createFile(filePath);
                    let res = this.getMoldeDataFromPageItem(item, moduleName, actionDefaultServices);
                    let _data = this.compileByData("../ejstemplates/model.ejs",{data:res});
                    fsTool.file.writeFile(filePath, _data);
                }
            }
        });
    },
    //创建单个Module下的Service文件, 并且写入数据
    createServiceFile(projectPath, serviceItem, storeItems, moduleName, pages){
        //create model file
        let path = projectPath + "/src/services/";
        let filePath = path + this.firstChatUpperLower(moduleName,false) + "Services.js";
        fsTool.file.createFile(filePath);

        let maps = [];
        serviceItem.forEach(x=>{
            if(x.url){
                let model = this.getModelByPageName(pages, x.pageName);
                maps.push({name:x.name, model:model, url:x.url, isEnum:false, fnName:x.name,isGetReq:x.reqType?x.reqType:"get"});
            }
        })
        storeItems.forEach(x=>{
            if(x.url){
                maps.push({name:x.name, model:[], url:x.url, isEnum: x.type =='enum',fnName: "get"+this.firstChatUpperLower(x.name, true), isGetReq:x.reqType?x.reqType:"get"});
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
        let filePath = path + this.firstChatUpperLower(moduleName, false) + "Helper.js";
        fsTool.file.createFile(filePath);

        //write content to file
        let _data = this.compileByData("../ejstemplates/helper.ejs",{data: {}});
        fsTool.file.writeFile(filePath, _data);
    },
    //创建单个Module下的Store文件, 并且写入数据
    createStoreFile(projectPath, storeItems, moduleName){
        let path = projectPath + "/src/store/modules/";
        let filePath = path + this.firstChatUpperLower(moduleName, false) + ".js"; 
        fsTool.file.createFile(filePath);

        let stateKeys = [];
        let mutations = [];
        let actions = [];
        let servicesClassName = this.firstChatUpperLower(moduleName, true) + "Services";
        let servicesPath = this.firstChatUpperLower(moduleName, false) + "Services.js";
        storeItems.forEach(x=>{
            let upName = this.firstChatUpperLower(x.name ,true);
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
    writeStoreIndex(projectPath, storeKeys){
        let filePath = projectPath + "/src/store/index.js";

        let imports = [];
        storeKeys.forEach(x=>{
            imports.push({className:this.firstChatUpperLower(x, true) + "Store",filePath:this.firstChatUpperLower(x, false) + ".js"});
        })
        
        let _data = this.compileByData("../ejstemplates/store/store.ejs",{data:{ imports : imports}});
        fsTool.file.writeFile(filePath, _data);
    },
    //写入Route Index入口文件
    writeRouter(projectPath, pages){
        let filePath = projectPath + "/src/route/index.js";

        let data = [];
        pages.forEach((x,index)=>{
            let moduleName = this.firstChatUpperLower(x.moduleName, false);
            let tmp = {
                path:"/"+ moduleName + this.firstChatUpperLower(this.getFileName(x.pageName),false),
                name: moduleName +this.firstChatUpperLower(this.getFileName(x.pageName),false),
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
    //创建view文件，并且准备数据(维度：Module)
    createView(projectPath, pages, moduleName, services){
        let filePath = projectPath + "/src/pages/views";
        let modulePath = filePath + "/" + this.firstChatUpperLower(moduleName, false);
        //创建Module文件夹
        fsTool.folder.createFolder(modulePath);

        console.log("ready to create vue file");
        pages.forEach(x=>{
            let vuePath = modulePath + "/" + this.firstChatUpperLower(x.pageName, false);
            //创建vue文件
            console.log(vuePath,99999);
            fsTool.file.createFile(vuePath);
            console.log("create vue completed;")
            
            let pageData = this.dataForListView(x, moduleName, services);
            let ejsPath = "../ejstemplates/view/list.ejs";
            if(x.type != "list"){
                ejsPath = "../ejstemplates/view/save.ejs";
            }
            let includeFormPath = NPath.resolve(__dirname, "../ejstemplates/view/form.ejs");
            pageData.includeFormPath = includeFormPath;
            
            let _data = this.compileByData(ejsPath, {data:pageData});
            
            fsTool.file.writeFile( modulePath + "/" + x.pageName, _data);
        })
    },
    getStoreInPage(page){
        let storeKeys = [];
        if(page.type == "list"){
            //check searchModel
            let searchModels = page.config.searchModel;
            searchModels.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
            let models = page.model ? page.model : [];
            models.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
        }else{
            let models = page.model;
            models.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
        }
        return Array.from(new Set(storeKeys));
    },
    dataForListView(page, moduleName, services){
        let pageTitle = page.pageTitle?page.pageTitle:"";
        let templateSearchModel = page.config && page.config.searchModel?_.chunk(page.config.searchModel, 3):[];
        let searchModel = page.config && page.config.searchModel;
        let toolbar = page.config?page.config.toolbar:[];
        let actionDefaultServices = this.getDefaultService(page,services);
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
        let tableTitle = this.firstChatUpperLower(moduleName, true)+ " " + this.firstChatUpperLower(this.getFileName(page.pageName),true) + " Table";
        let componentName = this.firstChatUpperLower(moduleName,true) + this.firstChatUpperLower(this.getFileName(page.pageName),true);

        let storeKeys = this.getStoreInPage(page);
        let hasStore = false;
        let storeName = "";
        let storeActions = [];
        if(storeKeys.length != 0){
            hasStore = true;
            storeName = this.firstChatUpperLower(moduleName, true) + "Store";
            storeKeys.forEach(x=>{
                storeActions.push("get" + this.firstChatUpperLower(x,true));
            })
        }
        let hasModel = true;
        let hasDialog = true;
        if(page.type == "list" && page.model && page.model.length  == 0 && actionDefaultServices.length ==0){
            hasModel = false;
        }
        if(page.type == "list" && page.model && page.model.length  == 0){
            hasDialog = false;
        }

        let serviceFileName = this.firstChatUpperLower(moduleName,false) + "Services.js";
        let serviceClassName = this.firstChatUpperLower(moduleName,true) + "Services";
        let modelFileName = this.firstChatUpperLower(moduleName,false) + this.firstChatUpperLower(this.getFileName(page.pageName), true) + "Model.js";
        let modelClassName = this.firstChatUpperLower(moduleName,true) + this.firstChatUpperLower(this.getFileName(page.pageName), true) + "Model";
        let modelDataName = this.firstChatUpperLower(modelClassName,false);
        let modelArray = [];
        if(page.type == "save" || hasDialog){
            modelArray = page.model;
        }
        if(!hasDialog && hasModel){
            modelArray = ["id"];
        }
        
        let data = {
            pageTitle,
            templateSearchModel,
            searchModel,
            pageOpts,
            tableTitle,
            toolbar,
            componentName,
            hasStore,
            hasModel,
            hasDialog,
            store:{
                storeKeys,
                storeName,
                storeActions
            },
            service:{
                serviceFileName,
                serviceClassName
            },
            model:{
                modelFileName,
                modelClassName,
                modelDataName,
                modelArray
            }
        }
        
        return data;
    },
    updateStoreIndex(projectPath, storeKeys){
        let filePath = projectPath + "/src/store/index.js";
        let targetPath = projectPath + "/src/store/index_copy.js";
        fsTool.file.copy(filePath, targetPath);
        this.writeStoreIndex(projectPath, storeKeys);
    },
    updateRouter(projectPath, pages){
        let filePath = projectPath + "/src/route/index.js";
        let targetPath = projectPath + "/src/route/index_copy.js";
        fsTool.file.copy(filePath, targetPath);
        this.writeRouter(projectPath, pages);
    }
}


module.exports = APIhelper;