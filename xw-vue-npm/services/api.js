
const path = require("path");
const APIhelper = require("./apiHelper.js");
const ProjectPathTool = require("./pathStore.js");
const fsTool = require("../tool/fsapi.js");
let _test_data = require("../project.js");

const api = {
    test(req,res){
        api.update(
            {body:{
                Modules:_test_data.Modules
            }}
        );
        
        return res.status(200).json({data:"options.data"});
    },
    update(req, res){
        let data = req.body.Modules;
        const projectPath = ProjectPathTool.get();
        let routers = [];
        let storeKeys = [];
        data.forEach(item => {
            let moduleName = item.ModuleName;
            let folerPath = projectPath + "/src/pages/views/" + APIhelper.firstChatUpperLower(moduleName, false);
            
            let pages = item.Pages;
            let services = item.Services;
            let stores = item.Store;
            storeKeys.push(moduleName);
            pages.forEach(x=>{
                x.moduleName = moduleName;
            })
            Array.prototype.push.apply(routers, pages);

            if(!fsTool.exists(folerPath)){
                api.createModel(projectPath, pages, moduleName);
                api.createServices(projectPath, services, stores, moduleName, pages);
                api.createHelper(projectPath, moduleName);
                api.createStore(projectPath, stores.state, moduleName);
                api.createView(projectPath, pages, moduleName);
            }
        });
        
        api.updateStoreIndex(projectPath, storeKeys);
        api.updateRouter(projectPath, routers);

        //创建project.json到项目root目录
        let projectJSON = {
            Modules:data,
            absoultePath:projectPath
        }
        
        fsTool.file.writeFile(projectJSON.absoultePath+ "/project.json", JSON.stringify(projectJSON));

        return res.status("200").json({status:200, data:null,msg:"update success"});
    },
    upload(req, res){
        console.log(fsTool.exists(path.resolve(__dirname, "../temp")),5555);
        let NPath =  path.resolve(__dirname, "../temp/project.json");
        console.log(fsTool.exists(NPath),666);
        let _res = fsTool.file.readFile(NPath);
        _res = eval("("+_res+")");
        ProjectPathTool.set(_res.absoultePath);

        return res.status(200).json({data:_res.Modules, status:200,msg:"success"});
    },
    create(req,res){
        // let data = req.body.Modules;
        let data = req?req.body.Modules:_test_data.Modules;
        const projectPath = ProjectPathTool.get();
        console.log(projectPath,7777777);
        //create all the files by module (one by one)
        let routers = [];
        let storeKeys = [];
        data.forEach(item => {
            let pages = item.Pages;
            let moduleName = item.ModuleName;
            let services = item.Services;
            let stores = item.Store;

            api.createModel(projectPath, pages, moduleName);
            console.log('model completed;');
            api.createServices(projectPath, services, stores, moduleName, pages);
            console.log('services completed;');
            api.createHelper(projectPath, moduleName);
            console.log('helper completed;');
            api.createStore(projectPath, stores.state, moduleName);
            console.log('store completed;');
            api.createView(projectPath, pages, moduleName, services);
            console.log('view completed;');

            storeKeys.push(moduleName);
            pages.forEach(x=>{
                x.moduleName = moduleName;
            })
            Array.prototype.push.apply(routers,pages);
        });
        
        api.writeStoreIndex(projectPath, storeKeys);
        api.writeRouter(projectPath, routers);

        //创建project.json到项目root目录
        let projectJSON = {
            Modules:data,
            absoultePath:projectPath
        }
        
        fsTool.file.writeFile(projectJSON.absoultePath+ "/project.json", JSON.stringify(projectJSON));

        return res && res.status("200").json({status:200, data:null,msg:"create success"});
    },
    createModel(projectPath, pages, moduleName){
        //create file and write data for model
        APIhelper.createModelFile(projectPath, pages, moduleName);
    },
    createServices(projectPath, services, stores, moduleName, pages){
        //create file and write data for services
        APIhelper.createServiceFile(projectPath, services, stores.state, moduleName, pages);
    },
    createHelper(projectPath, moduleName){
        //create file and write data for helper
        APIhelper.createHelperFile(projectPath, moduleName);
    },
    createStore(projectPath, storeItems, moduleName){
        APIhelper.createStoreFile(projectPath, storeItems, moduleName);
    },
    //write all store keys to store.index.js
    writeStoreIndex(projectPath, storeKeys){
        APIhelper.writeStoreIndex(projectPath, storeKeys);
    },
    writeRouter(projectPath, pages){
        APIhelper.writeRouter(projectPath, pages);
    },
    createView(projectPath, pages, moduleName, services){
        APIhelper.createView(projectPath, pages, moduleName, services);
    },
    updateStoreIndex(projectPath, storeKeys){
        APIhelper.updateStoreIndex(projectPath, storeKeys);
    },
    updateRouter(projectPath, pages){
        APIhelper.updateRouter(projectPath, pages);
    }, 
}

api.create();

module.exports = api;