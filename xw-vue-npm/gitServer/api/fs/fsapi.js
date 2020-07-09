
const fs = require("fs-extra");
const path = require("path");

const fsTool = {
    /**
     * @method fsapi
     * @param {path} 文件夹路径:/a/b/c
     * @return success
     */
    deleteFolder:path=>{
        if(fs.existsSync(path)) {
            fs.removeSync(path);
            return true;
        }else{
            return false;
        }
    },
    /**
     * @method fsapi
     * @param {dirname} 文件夹名称:/a/b/c
     * @return 存在：不改变，不存在：创建
     */
    createFolder:dirname=>{
        fs.ensureDirSync(dirname);
    },
    /**
     * @method fsapi
     * @param {path} a/b/c.vue
     * @param {name} 文件名称
     * @return sucess
     */
    createFile:(path)=>{
        fsTool.deleteFile(path);
        fs.createFileSync(path);
    },
    deleteFile:(path)=>{
        fs.removeSync(path);
    },
    /**
     * @method fsapi
     * @param {path} 文件路径 a/b.vue
     * @return 读取文件后的字符串
     */
    readFile:(path)=>{
        let str =  fs.readFileSync(path ,"utf8");
        return str;
    },
    /**
     * @method fsapi
     * @param {path} 文件路径 a/b.vue
     * @param {data} 内容 字符串
     * @return 每次写入都会覆盖掉原有的内容
     */
    writeFile:(path,data)=>{
        fs.outputFileSync(path, data);
    },
    /**
     * @description 读取客户端项目地址,多个项目(绝对路径)
     * @returns string
     */
    getProjectsPath:()=>{
        let _info = path.join(__dirname,"../../projectPath.json");
        let str = fsTool.readFile(_info);
        str == ""?str="[]":str;
        return str;
    },
    exists:(path) => {
        return fs.pathExistsSync(path)
    }
}


module.exports = fsTool;