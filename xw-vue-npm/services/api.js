
const fsTool = require("../tool/fsapi.js");
const resEntity = require("../tool/responseEntity");
const path = require("path");
const APIhelper = require("./apiHelper.js");

const data = require("../project.js");

const projectPath = '/Users/wupeng/Documents/aaa';

const api = {
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

            storeKeys.push(moduleName);
        });
        
        this.writeStoreIndex(projectPath, storeKeys);
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
    createView(){

    }
}

api.create();

module.exports = api;