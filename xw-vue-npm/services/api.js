
const path = require("path");
const APIhelper = require("./apiHelper.js");
const ProjectPathTool = require("./pathStore.js");
const fsTool = require("../tool/fsapi.js");
let _test_data = require("../project.js");
const Util = require("../tool/util.js");

const api = {
    upload(req, res){
        console.log(fsTool.exists(path.resolve(__dirname, "../temp")),5555);
        let NPath =  path.resolve(__dirname, "../temp/project.json");
        console.log(fsTool.exists(NPath),666);
        let _res = fsTool.file.readFile(NPath);
        _res = eval("("+_res+")");
        ProjectPathTool.set(_res.absoultePath);

        return res.status(200).json({data:_res.Modules, status:200,msg:"success"});
    },
    update(req, res){
        let modules = req?req.body.Modules:_test_data.Modules;
        let commonStore = req?req.body.commonStore:_test_data.commonStore;
        APIhelper.viewDeal(modules,"update",commonStore);
        APIhelper.createCommonServices(commonStore);
        APIhelper.createCommonStore(commonStore);
        Util.writeProjectJson(modules, commonStore, ProjectPathTool.get());
        return res && res.status("200").json({status:200, data:null,msg:"update success"});
    },
    create(req,res){
        let modules = req?req.body.Modules:_test_data.Modules;
        let commonStore = req?req.body.commonStore:_test_data.commonStore;
        
        APIhelper.viewDeal(modules,"create",commonStore);
        APIhelper.createCommonServices(commonStore);
        APIhelper.createCommonStore(commonStore);
        
        Util.writeProjectJson(modules, commonStore, ProjectPathTool.get());
        return res && res.status("200").json({status:200, data:null,msg:"create success"});
    },
    getConfigPath(){
        let _path = Util.getConfigPath();
        return res && res.status("200").json({status:200, data:_path,msg:"get path success"});
    },
    setConfigPath(){
        let _path = "C:/Users/wupeng5/AppData/Roaming/npm/node_modules/lev2-vue";
        Util.setConfigPath(_path);
        return res && res.status("200").json({status:200, data:null,msg:"set path success"});
    }
}

// api.create();
// api.setConfigPath();

module.exports = api;