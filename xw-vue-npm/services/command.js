
const child_process = require('child_process');

let Command = {
    gitPath:"/usr/local/lib/node_modules/lev2-vue/xw-vue-git",
    nodePath:"/usr/local/lib/node_modules/lev2-vue/xw-vue-npm",
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
        promises.push(this.run(`cnpm i`,{cwd : this.gitPath}));
        promises.push(this.run(`cnpm i`,{cwd : this.nodePath}));
        return promises;
    },
    startGitServer(){
        return this.run('npm run dev',{cwd : this.gitPath});
    }
}

module.exports = Command;