const download = require('download-git-repo')
const path = require('path');
const ora = require('ora');
const log = require('../tool/log.js');

/**
 * 下载git项目
 * @param {*} projectName 项目名称
 */

function gitDownload(projectName){
    let projectUrl = "Stringbao/xw-vue-seed-2.0";
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

gitDownload('/aaa');


module.exports = gitDownload;