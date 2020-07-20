
const fs = require("fs-extra");
const path = require("path");

const fsTool = {
    folder:{
        deleteFolder:path=>{
            if(fs.existsSync(path)) {
                fs.removeSync(path);
                return true;
            }else{
                return false;
            }
        },
        createFolder:dirname=>{
            fs.ensureDirSync(dirname);
        },
    },
    file:{
        copy:(source, target)=>{
            fs.copyFileSync(source, target);
        },
        createFile:(path)=>{
            // this.deleteFile(path);
            fs.createFileSync(path);
        },
        deleteFile:(path)=>{
            fs.removeSync(path);
        },
        readFile:(path)=>{
            let str =  fs.readFileSync(path ,"utf8");
            return str;
        },
        writeFile:(path,data)=>{
            fs.outputFileSync(path, data);
        },
    },
    exists:(path) => {
        return fs.pathExistsSync(path)
    }
}


module.exports = fsTool;