const download = require('download-git-repo')
const path = require('path');
const ora = require('ora');
const fsExtra = require('fs-extra');
const log = require('./log');
/**
 * 下载git项目
 * @param {*} projectName 项目名称
 */

function gitDownload(projectName){
    //本地临时目录
    projectName = path.join(path.dirname(__dirname), 'tempFolder', projectName);
    fsExtra.removeSync(projectName);
    
    let projectUrl = "Stringbao/xw-vue-seed";

    //loading进度圈
    const spinner = ora(`Download`).start();
    return new Promise((resolve, reject) => {
        // 下载 git 模板
        spinner.start();
        download(projectUrl,
            projectName, {}, (err) => {
                if (err) {
                    reject(err)
                } else {
                    spinner.stop();
                    log.success("Download Success");
                    resolve(projectName);
                }
            })
    })
}

module.exports = gitDownload;