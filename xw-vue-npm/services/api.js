

const resEntity = require("../tool/responseEntity");
const path = require("path");
const APIhelper = require("./apiHelper.js");

const data = require("../project.js");

const projectPath = '/aaa';

const api = {
    test(req,res){
        debugger
    },
    create(req,res){
        //create all the files by module (one by one)
        let routers = [];
        let storeKeys = [];
        data.Modules.forEach(item => {
            let pages = item.Pages;
            let moduleName = item.ModuleName;
            let services = item.Services;
            let stores = item.Store;

            this.createModel(projectPath, pages, moduleName);
            this.createServices(projectPath, services, stores, moduleName);
            this.createHelper(projectPath, moduleName);
            this.createStore(projectPath, stores.state, moduleName);
            this.createView(projectPath, pages, moduleName);

            storeKeys.push(moduleName);
            pages.forEach(x=>{
                x.moduleName = moduleName;
            })
            Array.prototype.push.apply(routers,pages);
        });
        
        this.writeStoreIndex(projectPath, storeKeys);
        this.writeRouter(projectPath, routers);
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