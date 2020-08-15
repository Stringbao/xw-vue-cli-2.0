const Util = require("../../tool/util.js");
const fsTool = require("../../tool/fsapi.js");

let Model = {
    //create model
    createModelFile(projectPath, module){
        let modelList = module.modelList;
        let path = projectPath + "/src/model/";
        modelList.forEach(x=>{
            let filePath = path + Util.firstChatUpperLower(x.name, false) + "Model.js";
            fsTool.file.createFile(filePath);
            let res = this.getMoldeDataFromPageItem(x);
            let _data = Util.compileByData("../ejstemplates/model.ejs",{data:res});
            fsTool.file.writeFile(filePath, _data);
        })
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
    //为单个model.js准备数据
    getMoldeDataFromPageItem(model){
        let tmp = {className:"",data:[]};
        tmp.className = Util.firstChatUpperLower(model.name, true) + "Model";
        
        model.props.forEach(x=>{
            tmp.data.push(x.field);
        })
        return tmp;
    },
}

module.exports = Model;