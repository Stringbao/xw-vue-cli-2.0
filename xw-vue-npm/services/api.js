

const path = require("path");
const APIhelper = require("./apiHelper.js");
const ProjectPathTool = require("./projectPath.js");
const fsTool = require("../tool/fsapi.js");
// let data = require("../project.js");

const api = {
    test(req,res){
        const projectPath = ProjectPathTool.get();
        console.log(projectPath,7777777);

        return res.status(200).json({data:"options.data"});
    },
    create(req,res){
        let data = req.body.Modules;
        data = data.Modules;
        console.log("body", req.body.Modules);
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
            api.createServices(projectPath, services, stores, moduleName);
            console.log('services completed;');
            api.createHelper(projectPath, moduleName);
            console.log('helper completed;');
            api.createStore(projectPath, stores.state, moduleName);
            console.log('store completed;');
            api.createView(projectPath, pages, moduleName);

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

        return res.status("200").json({data:null,msg:"success"});
    },
    createModel(projectPath, pages, moduleName){
        //create file and write data for model
        APIhelper.createModelFile(projectPath, pages, moduleName);
    },
    createServices(projectPath, services, stores, moduleName){
        //create file and write data for services
        APIhelper.createServiceFile(projectPath, services, stores.state, moduleName);
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
    createView(projectPath, pages, moduleName){
        APIhelper.createView(projectPath, pages, moduleName);
    }   
}

api.create();

module.exports = api;