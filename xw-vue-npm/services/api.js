
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
        let data = req?req.body.Modules:_test_data.Modules;
        APIhelper.viewDeal(data,"update");
        return res && res.status("200").json({status:200, data:null,msg:"update success"});
    },
    create(req,res){
        let data = req?req.body.Modules:_test_data.Modules;
        APIhelper.viewDeal(data,"create");
        return res && res.status("200").json({status:200, data:null,msg:"create success"});
    },
}

api.create();

module.exports = api;