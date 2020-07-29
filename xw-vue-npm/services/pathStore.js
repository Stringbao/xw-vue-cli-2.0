

const Util = require("../tool/util.js");

module.exports = {
    projectPath:"",
    set(path){
        this.projectPath = path;
    },
    get(){
        if(!this.projectPath){
            if(Util.isWindows()){
                return "d:/aaa";
            }
            return "/Users/wupeng/Documents/aaa";
        }
        return this.projectPath;
    }
}