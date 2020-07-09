const commonUtil = require("./common.js");
const fsTool = require("../../fs/fsapi");
const path = require("path");

module.exports = {
    isHasDialogTag : "1",//1包含 ，2不包含
    /**
     * @description 是否包含dialog判断
     * @param {String} tag 
     * @returns Boolean
     */
    isHasDialog(tag){
        return tag == this.isHasDialogTag;
    },
    /**
     * @description 处理pagejson里面的数据 进行组装
     * @param {String} str
     * @returns  组装好的数据
     */
    dealPageData(str){
        let data =commonUtil.cloneObj(JSON.parse((str && str!="") ? str : "[]"));
        let routerData = [];
        let pageOption = [];
        let storeModuleNameList = [];
        data.map(item => {
            storeModuleNameList = commonUtil.concatArr(storeModuleNameList,[item.subName]);
            item.routerData.type = item.pageType;
            routerData = commonUtil.concatArr(routerData,[item.routerData]);
            pageOption = commonUtil.concatArr(pageOption,[item.pageOption]);
        })
        return {
            routerData,pageOption,storeModuleNameList

        }

    },
    /**
     * 处理storeJSON数据
     * @param {Object} data 
     * @returns 处理好的data
     */
    dealStoreData(data){
        return {
            state:{
                dataSource:commonUtil.concatArr([],data.state.dataSource),
                entity:commonUtil.concatArr([],data.state.entity),
            },
            action:commonUtil.concatArr([],data.action),
            mutation:commonUtil.concatArr([],data.mutation),
        }
    },
    /**
     * @description 组合两个名字或者一个名字
     * @param {String} path 
     * @param {String} name 
     * @example 
     * path = a/a name = b/b => a_a_b_b
     * path = a/a name = null => a_a
     */
    getCompName(path,name){
        path = path.split("/").join("_");
        return name ? (path + "_" + name) : path
    },
    /**
     * @description 截取window绝对路径 转换为 ejs可用路径
     * @param {String} winPath 
     */
    getWindowsPath(winPath){
        let str = winPath.split(":");
        let resultStr = "";
        str.forEach((item,index) => {
            if(index != 0){
                resultStr += ":"+item;
            } 
        })
        return resultStr.substring(1).replace("\\","/");
    },
     /**
     * @description 编写page的history
     * @param {String} dataStr 
     */
    writePageHistory(moduleName,dataStr){
        let tempFolderPath = path.resolve(__dirname,"../../../../tempFolder/"+moduleName + "/page.json");
        if(!fsTool.exists(tempFolderPath)){
            fsTool.createFile(tempFolderPath);
        }
        let _dataJsonHistoryStr = fsTool.readFile(tempFolderPath);
        let _dataJsonHistoryJson = JSON.parse(_dataJsonHistoryStr != "" ? _dataJsonHistoryStr : "[]");
        let __dataJson = JSON.parse((dataStr && dataStr!="") ? dataStr : "[]");
        let fileStr = {
        }
        if(__dataJson.length>0){
            fileStr.subName = __dataJson[0].subName;
            fileStr.data = __dataJson;
        }
        _dataJsonHistoryJson.push(fileStr);
        fsTool.writeFile(tempFolderPath,JSON.stringify(_dataJsonHistoryJson,null,"\t"))
    },
    /**
     * @description 编写global的history
     * @param {String} dataStr 
     */
    writeGlobalHistory(moduleName,dataStr){
        let tempFolderPath = path.resolve(__dirname,"../../../../tempFolder/"+moduleName + "/global.json");
        if(!fsTool.exists(tempFolderPath)){
            fsTool.createFile(tempFolderPath);
        }
        fsTool.writeFile(tempFolderPath,dataStr)
    },
    /**
     * @description 编写store的history
     * @param {String} dataStr 
     */
    writeStoreHistory(moduleName,dataJson,subName){
        let tempFolderPath = path.resolve(__dirname,"../../../../tempFolder/"+moduleName + "/store.json");
        if(!fsTool.exists(tempFolderPath)){
            fsTool.createFile(tempFolderPath);
        }
        let _storeJsonHistoryStr = fsTool.readFile(tempFolderPath);
        let _storeJsonHistoryJson = JSON.parse(_storeJsonHistoryStr != "" ? _storeJsonHistoryStr : "[]");
        let fileStr = {
        }
        if(dataJson && dataJson!=""){
            fileStr.subName = subName;
            fileStr.data = dataJson;
        }
        console.log("fileStr",fileStr);
        _storeJsonHistoryJson.push(fileStr);
        fsTool.writeFile(tempFolderPath,JSON.stringify(_storeJsonHistoryJson,null,"\t"))
    },
    /**
     * @description 编写api的history
     * @param {String} dataStr 
     */
    writeApiHistory(moduleName,dataJson,subName){
        let tempFolderPath = path.resolve(__dirname,"../../../../tempFolder/"+moduleName + "/api.json");
        if(!fsTool.exists(tempFolderPath)){
            fsTool.createFile(tempFolderPath);
        }
        let _apiJsonHistoryStr = fsTool.readFile(tempFolderPath);
        let _apiJsonHistoryJson = JSON.parse(_apiJsonHistoryStr != "" ? _apiJsonHistoryStr : "[]");
        let __dataJson = ((dataJson && dataJson!="") ? dataJson : []);
        let fileStr = {
        }
        if(__dataJson.length>0){
            fileStr.subName = subName;
            fileStr.data = __dataJson;
        }
        _apiJsonHistoryJson.push(fileStr);
        fsTool.writeFile(tempFolderPath,JSON.stringify(_apiJsonHistoryJson,null,"\t"))
    },
    writeProxyHistory(moduleName,dataStr){
        let tempFolderPath = path.resolve(__dirname,"../../../../tempFolder/"+moduleName + "/proxy.json");
        if(!fsTool.exists(tempFolderPath)){
            fsTool.createFile(tempFolderPath);
        }
        fsTool.writeFile(tempFolderPath,dataStr)
    },
    
}