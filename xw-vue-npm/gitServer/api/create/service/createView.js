const _config = require("../../pathConfig");
const ejsTool = require("../../ejs/ejsapi");
const path = require("path");
const business = require("./business.js");
const fsTool = require("../../fs/fsapi");
const CommonUtil = require("./common");
module.exports = {
    createListView(projectPath, moduleName, data){
        let subPath = data.path ? ("/" + data.path):"";
        let viewPath = projectPath + "/" + _config.viewPath.view + "/"+ moduleName + subPath + "/" + data.fileName + ".vue";
        let listEjsPath = path.resolve(__dirname, _config.viewPath.listEjs);
        fsTool.createFile(viewPath);
        let ejsStr = fsTool.readFile(listEjsPath);
        data.searchOpts.search.colsCount = data.searchOpts.search.colsCount ? data.searchOpts.search.colsCount : 3;
        let action = [];
        let colsList = CommonUtil.groupBy(data.searchOpts.search.cols,data.searchOpts.search.colsCount);
        colsList.forEach(row =>{
            row.forEach(col => {
                if(col.type == "select" || col.type == "radioList" || col.type == "checkboxList"){
                    action.push("get" + CommonUtil.titleCase(col.dataSource));
                }
            })
        })
        let formList = data.dialog.form ? data.dialog.form : [];
        formList.cols.forEach(col => {
            if(col.type == "select" || col.type == "radioList" || col.type == "checkboxList"){
                action.push("get" + CommonUtil.titleCase(col.dataSource));
            }
        })
        let filterAction = CommonUtil.concatArr([],action);
        let viewFolderPath = path.resolve(__dirname, _config.viewPath.viewFolderPath);
        // window的话
        if(CommonUtil.getRunningEnv() === "Windows"){
            viewFolderPath = business.getWindowsPath(viewFolderPath);
        }
        let ejsData = {
            data:{
                btn:data.searchOpts.search.btn,
                cols:colsList,
                action:filterAction,
                colsCount:data.searchOpts.search.colsCount,
                tableOptions:data.searchOpts.tableOptions,
                tableOptionsName:data.fileName.split('.')[0] + "_table_options",
                hasDialog:data.dialog.hasDialog ? data.dialog.hasDialog : "0",
                form:formList,
                viewFolderPath: viewFolderPath,
                tableTitle:data.searchOpts.tableTitle,
                pageName : moduleName + (data.path!="" ? "_":"") + business.getCompName(data.path,data.fileName.split('.')[0])
            },
            moduleName,
        };

        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);
        fsTool.writeFile(viewPath,_data);
        console.log("写入listView成功");
    },
    createSaveView(projectPath, moduleName, data){
        let viewPath = projectPath + "/" + _config.viewPath.view + "/"+ moduleName + "/" + data.path + "/" + data.fileName + ".vue";
        let saveEjsPath = path.resolve(__dirname, _config.viewPath.saveEjs);
        fsTool.createFile(viewPath);
        let ejsStr = fsTool.readFile(saveEjsPath);
        let action = [];

        let formList = data.form ? data.form : [];
        formList.cols.forEach(col => {
            if(col.type == "select" || col.type == "radioList" || col.type == "checkboxList"){
                action.push("get" + CommonUtil.titleCase(col.dataSource));
            }
        })
        let filterAction = CommonUtil.concatArr([],action);
        let viewFolderPath = path.resolve(__dirname, _config.viewPath.viewFolderPath);
         // window的话
         if(CommonUtil.getRunningEnv() === "Windows"){
            viewFolderPath = business.getWindowsPath(viewFolderPath);
        }
        let ejsData = {
            data:{
                form:formList,
                action:filterAction,
                viewFolderPath: viewFolderPath,
                pageName : moduleName + (data.path!="" ? "_":"") + business.getCompName(data.path,data.fileName.split('.')[0]),
            },
            moduleName,
        };
        let _data = ejsTool.renderEjsTemplate(ejsStr,ejsData);

        fsTool.writeFile(viewPath,_data);
        console.log("写入saveView成功");
    },
}