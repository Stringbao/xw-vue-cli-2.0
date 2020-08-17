
const path = require("path");
const fsTool = require("../tool/fsapi.js");
const os = require('os');
const ejs = require("ejs");

let Util = {
    //是否是windows
    isWindows(){
        console.log(os.type());
        return os.type() == "Darwin"?false:true;
    },
    //首字母大写
    firstChatUpperLower(str,flag){
        if(!str){
            return "";
        }
        let first  = str.substring(0,1);
        let other = str.substring(1);
        if(flag){
            return first.toUpperCase() + other;
        }else{
            return first.toLowerCase() + other;
        }
        
    },
    //获取文件名(去掉后缀)
    getFileName(str){
        if(!str){
            return "";
        }
        return str.substring(0,str.indexOf('.'));
    },
    //获取系统配置路径
    getConfigPath(){
        let configPath = path.resolve(__dirname, "../data.json");
        let data = fsTool.file.readFile(configPath);
        let obj = eval("("+data+")");
        return obj.configPath;
    },
    //设置系统配置路径
    setConfigPath(pathData){
        let configPath = path.resolve(__dirname, "../data.json");
        let data = fsTool.file.readFile(configPath);
        let obj = eval("("+data+")");
        obj.configPath = pathData;
        fsTool.file.writeFile(configPath,JSON.stringify(obj));
    },
    //ejs编译模板
    compileByData(ejsPath, data){
        let _path = path.resolve(__dirname, ejsPath);
        let ejsStr = fsTool.file.readFile(_path);
        return ejs.compile(ejsStr)(data);
    },
    //创建project.json到项目root目录
    writeProjectJson(modules, commonStore, path){
        let projectJSON = {
            Modules:modules,
            commonStore:commonStore,
            absoultePath:path,
        }
        
        fsTool.file.writeFile(projectJSON.absoultePath+ "/project.json", JSON.stringify(projectJSON));
    }
}

module.exports = Util;