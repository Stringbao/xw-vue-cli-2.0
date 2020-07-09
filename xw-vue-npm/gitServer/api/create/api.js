
const fsTool = require("../fs/fsapi");
const resEntity = require("../responseEntity");
const path = require("path");
const business = require("./service/business.js");
const commonUtil = require("./service/common.js");
const createRouter = require("./service/createRouter.js");
const createApi = require("./service/createApi.js");
const createService = require("./service/createService.js");
const createWebpack = require("./service/createWebpack.js");
const createProxy = require("./service/createProxy.js");

const {createListView,createSaveView} = require("./service/createView.js");
const {createStore,createStoreModule} = require("./service/createStore.js");
const api = {
    // 保存代理
    saveProxy(req,res){
        let projectName = req.body.projectName;
        let projectPath = req.body.projectPath;
        let proxyArr = req.body.proxy;
        let proxyPath = path.resolve(__dirname,"../../proxy.json");
        let tempFolderPath = path.resolve(__dirname,"../../../tempFolder/"+ projectName);
        let isExistHistory = fsTool.exists(tempFolderPath);
        if(!isExistHistory){
            // 创建history文件夹
            fsTool.createFolder(tempFolderPath);
        }
        createWebpack(projectPath,proxyArr);
        createProxy(projectPath,proxyArr);
        fsTool.writeFile(proxyPath,JSON.stringify(proxyArr,null,"\t"));
        business.writeProxyHistory(projectName,JSON.stringify(proxyArr,null,"\t"))
        return resEntity.setEneity({res:res});
    },
    // 创建模块
    createModuleFolder:(req,res)=>{
        let moduleName = req.body.moduleName;
        let projectPath = req.body.projectPath;
        let isExist = fsTool.exists(projectPath + "/src/pages/" + moduleName);
        if(!isExist){
            fsTool.createFolder(projectPath + "/src/pages/" + moduleName);
        }else{
            return resEntity.setEneity({
                res,
                status:1,
                msg:"该模块已经存在",
                data:null,
            });
        }
        return resEntity.setEneity({res:res});

    },
    // 创建router和store的index等项目级文件
    createGlobalFile(req,res){
        let projectPath = req.body.projectPath;
        let projectName = req.body.projectName;
        let isLayoutModule = (req.body.isLayout && req.body.isLayout == "1")  ? true:false;
        let globalPath = path.resolve(__dirname,"../../global.json");
        let proxyPath = path.resolve(__dirname,"../../proxy.json");
        let str = fsTool.readFile(globalPath);
        let _data = JSON.parse((str && str!="") ? str : "{router:[],moduleList:[]}");
        // 创建router
        createRouter(projectPath,_data.router,isLayoutModule);
        // 创建store的index
        createStore(projectPath,_data.moduleList);
        business.writeGlobalHistory(projectName,str)
        fsTool.writeFile(proxyPath,"")
        fsTool.writeFile(globalPath,"");
        
        return resEntity.setEneity({res:res});
    }, 
    // 创建页面级文件
    createModuleFile:(req,res)=>{
        let moduleName = req.body.moduleName;
        let projectPath = req.body.projectPath;
        let projectName = req.body.projectName;
        let _interface = req.body.interface;
        let jsonDataPath = path.resolve(__dirname,"../../global.json");
        let dataPath = path.resolve(__dirname,"../../page.json");
        let apiJsonPath = path.resolve(__dirname,"../../api.json");
        let storeJsonPath = path.resolve(__dirname,"../../store.json");
        let proxyPath = path.resolve(__dirname,"../../proxy.json");
        let dataStr = fsTool.readFile(path.resolve(__dirname,dataPath));
        let _data = business.dealPageData(dataStr);
        _data.pageOption.forEach(item => {
            if(item.type == "1"){
                createListView(projectPath,moduleName,item);
            }else{
                createSaveView(projectPath,moduleName,item);
            }
        })
        
        let jsonStr = fsTool.readFile(jsonDataPath);
        let jsonData = JSON.parse(jsonStr!= "" ? jsonStr : "{}");


        let storeDataStr = fsTool.readFile(storeJsonPath);
        let defineStorePackage = {
            "state":{
                "dataSource":[],
                "entity":[]
            },
            "action":[],
            "mutation":[]
        }
        let apiDataStr = fsTool.readFile(apiJsonPath);
        let apiDataJson = JSON.parse(apiDataStr!= "" ? apiDataStr : "[]");
        let storeDataJson = (storeDataStr!= "" ? JSON.parse( storeDataStr) : defineStorePackage);
        
        _interface.forEach(item => {
            if(item.url && item.url != ""){
                storeDataJson.action.push({
                    actionName:item.key,
                    commit:item.key == "getDetail" ? "setEntity":"",
                    checkDataSource:"",
                });
                if(item.key == "getDetail"){
                    storeDataJson.mutation.push({
                        mutationName:"setEntity",
                        stateName:"entity",
                        isSelect:false,
                    });
                }
                apiDataJson.push({
                    url:item.url,
                    compName:business.getCompName(item.url.split(".")[0]),
                    servicesName : item.key,
                    type:(item.key == "getDetail" || item.key == "getList") ? "get" : "post",
                    hasParams:true,
                })
            }
        })
        storeDataJson = business.dealStoreData(storeDataJson);
        console.log("storeDataJson",JSON.stringify(storeDataJson));

        createStoreModule(projectPath,moduleName,storeDataJson);
        createService(projectPath,moduleName,commonUtil.concatArr(apiDataJson,[]));
        let proxyDefaultKey = JSON.parse(fsTool.readFile(proxyPath))[0].key;
        console.log(proxyDefaultKey);
        createApi(projectPath,moduleName,proxyDefaultKey,commonUtil.concatArr(apiDataJson,[]));
        fsTool.writeFile(apiJsonPath,"");
        fsTool.writeFile(storeJsonPath,"");
        // 创建modulelist和router
        let _json = {
            router:jsonData.router ? jsonData.router : [],
            moduleList:jsonData.moduleList ? jsonData.moduleList : [],
        }
        _json.router = commonUtil.concatArr(_json.router,_data.routerData);
        _json.moduleList = commonUtil.concatArr(_json.moduleList,_data.storeModuleNameList);
        fsTool.writeFile(jsonDataPath,JSON.stringify(_json,null,"\t"));
        business.writePageHistory(projectName,dataStr);
        business.writeStoreHistory(projectName,storeDataJson,moduleName);
        business.writeApiHistory(projectName,apiDataJson,moduleName);
        // dataStr
        fsTool.writeFile(dataPath,"");
        return resEntity.setEneity({res:res});
    },
   
    // 获取项目目录
    getProjectsPath:(req,res)=>{
        return resEntity.setEneity({res:res,data:fsTool.getProjectsPath()});
    },
    // 保存页面
    savePage:(req,res) => { 
        let _data = req.body;
        let jsonDataPath = path.resolve(__dirname,"../../page.json");
        let apiJsonPath = path.resolve(__dirname,"../../api.json");
        let storeJsonPath = path.resolve(__dirname,"../../store.json");
        let _dataJson = {
            "subName":_data.moduleName,
            "pagePath":_data.page.path,
            "pageName":_data.page.fileName + ".vue",
            "pageOption":_data.page,
            "pageType":_data.page.type, 
            "compName":_data.moduleName + (_data.page.path!="" ? "_":"") + business.getCompName(_data.page.path,_data.page.fileName),
            "routerData":{
                "routerName":_data.moduleName + commonUtil.titleCase(_data.page.fileName),
                "routerPath":_data.moduleName + "/" + _data.page.path + (_data.page.path!="" ? "/":"") + _data.page.fileName,
            },
        }
        /**
         * "serverData":{
                "store":{
                    "state":{
                        "dataSource":[],
                        "entity":[]
                    },
                    "action":[],
                    "mutation":[]
                },
                "API":[],
            }
         */
        let storeDataStr = fsTool.readFile(storeJsonPath);

        let defineStorePackage = {
            "state":{
                "dataSource":[],
                "entity":[]
            },
            "action":[],
            "mutation":[],
            
        }
        let apiDataStr = fsTool.readFile(apiJsonPath);
        let apiDataJson = JSON.parse(apiDataStr!= "" ? apiDataStr : "[]");
        let storeDataJson = (storeDataStr!= "" ? JSON.parse( storeDataStr) : defineStorePackage);
        if(_dataJson.pageType == "1"){
            _data.page.searchOpts.search.cols && _data.page.searchOpts.search.cols.forEach(item => {
                // 有datasource就必须要有url否则不添加
                if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {
                    storeDataJson.state.dataSource.push(item.dataSource)
                    storeDataJson.action.push({
                        actionName:"get" + commonUtil.titleCase(item.dataSource),
                        commit:"set" + commonUtil.titleCase(item.dataSource),
                        checkDataSource:item.dataSource,
                    })
                    storeDataJson.mutation.push({
                        mutationName:"set" + commonUtil.titleCase(item.dataSource),
                        stateName:item.dataSource,
                        isSelect:true,
                    });
                    apiDataJson.push({
                        url:item.url,
                        compName: business.getCompName(item.url.split(".")[0]),
                        servicesName : "get" + commonUtil.titleCase(item.dataSource),
                        type:"get",
                        hasParams:false,
                    });
                }
            })
            if(business.isHasDialog(_data.page.dialog.hasDialog)){
                _data.page.dialog.form.cols && _data.page.dialog.form.cols.forEach(item => {
                    if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {
                        storeDataJson.state.dataSource.push(item.dataSource)
                        storeDataJson.action.push({
                            actionName:"get" + commonUtil.titleCase(item.dataSource),
                            commit:"set" + commonUtil.titleCase(item.dataSource),
                            checkDataSource:item.dataSource,
                        })
                        storeDataJson.mutation.push({
                            mutationName:"set" + commonUtil.titleCase(item.dataSource),
                            stateName:item.dataSource,
                            isSelect:true,
                        });
                        apiDataJson.push({
                            url:item.url,
                            compName:business.getCompName(item.url.split(".")[0]),
                            servicesName : "get" + commonUtil.titleCase(item.dataSource),
                            type : "get",
                            hasParams:false
                        });
                    }
                    // 有v-model的from或者dialog
                    if(item.key){
                        storeDataJson.state.entity.push(item.key);
                    }
                })
            }
        }
        if(_dataJson.pageType == "2"){
            _data.page.form.cols && _data.page.form.cols.map(item => {
                if(item.dataSource && item.dataSource != ""  && item.url && item.url != "") {
                    storeDataJson.state.dataSource.push(item.dataSource)
                    storeDataJson.action.push({
                        actionName:"get" + commonUtil.titleCase(item.dataSource),
                        commit:"set" +  commonUtil.titleCase(item.dataSource),
                        checkDataSource:item.dataSource,
                    })
                    storeDataJson.mutation.push({
                        mutationName:"set" + commonUtil.titleCase(item.dataSource),
                        stateName:item.dataSource,
                        isSelect:true,
                    });
                    apiDataJson.push({
                        url:item.url,
                        compName:business.getCompName(item.url.split(".")[0]),
                        servicesName : "get" + commonUtil.titleCase(item.dataSource),
                        type:"get",
                        hasParams:false,
                    });
                }
                if(item.key){
                    storeDataJson.state.entity.push(item.key);
                }
            })
            
        }
        
        let jsonStr = fsTool.readFile(jsonDataPath);
        let jsonData = JSON.parse(jsonStr!= "" ? jsonStr : "[]");
        if(commonUtil.isExistItem(jsonData,"compName",_dataJson["compName"])){
            return resEntity.setEneity({
                res,
                status:1,
                msg:"该页面已经存在",
                data:null,
            });
        }
        jsonData.push(_dataJson);
        fsTool.writeFile(jsonDataPath,JSON.stringify(jsonData,null,"\t"));
        fsTool.writeFile(apiJsonPath,JSON.stringify(apiDataJson,null,"\t"));
        fsTool.writeFile(storeJsonPath,JSON.stringify(storeDataJson,null,"\t"));
        return resEntity.setEneity({res:res});
    },
    // 重置config文件
    resetConfig(req,res){
        let jsonDataPath = path.resolve(__dirname,"../../global.json");
        let dataPath = path.resolve(__dirname,"../../page.json");
        let apiJsonPath = path.resolve(__dirname,"../../api.json");
        let storeJsonPath = path.resolve(__dirname,"../../store.json");
        let proxyPath = path.resolve(__dirname,"../../proxy.json");
        fsTool.writeFile(dataPath,"");
        fsTool.writeFile(jsonDataPath,"");
        fsTool.writeFile(apiJsonPath,"");
        fsTool.writeFile(storeJsonPath,"");
        fsTool.writeFile(proxyPath,"")
        console.log("清空配置成功");
        return resEntity.setEneity({res:res});
     },
}

                        




module.exports = api;