
const child_process = require('child_process');
const Util = require("../tool/util.js");

let Command = {
    gitPath(){
        return Util.getConfigPath() + "/xw-vue-git";
        // if(Util.isWindows()){
        //     return "C:/Users/wupeng5/AppData/Roaming/npm/node_modules/lev2-vue";
        // }else{
        //     return "/usr/local/lib/node_modules/lev2-vue";
        // }
    },
    nodePath(){
        return Util.getConfigPath();
        // if(Util.isWindows()){
        //     return "C:/Users/wupeng5/AppData/Roaming/npm/node_modules/lev2-vue";
        // }else{
        //     return "/usr/local/lib/node_modules/lev2-vue";
        // }
    },
    run(cmd, args, options){
        return new Promise((resolve, reject) => {
            child_process.exec(cmd, args,(error, stdout, stderr)=>{
                if(!error){
                    resolve();
                }else{
                    reject();
                }
            })
        })
    },
    installPackages(){
        let promises = [];
        promises.push(this.run(`cnpm i`,{cwd : this.gitPath()}));
        promises.push(this.run(`cnpm i`,{cwd : this.nodePath()}));
        return promises;
    },
    startGitServer(){
        return this.run('npm run dev',{cwd : this.gitPath()});
    }
}

module.exports = Command;