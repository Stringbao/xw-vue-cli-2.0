

const gitDownload = require('./download.js');
const command = require("./command.js");
const NPath = require("./pathStore.js");
const log = require('../tool/log.js');
const ora = require('ora');
const webServer = require("../index.js");
const Util = require("../tool/util.js");

async function startServer() {
    await gitDownload(NPath.get());
    log.success("项目download Success");
    // install all the packages for git and node
    let _promise = command.installPackages();

    const spinner = ora('Installing package').start();
    spinner.start();
    Promise.all(_promise).then(x=>{
        spinner.stop();
        log.success("git and npm packages install completed!");
        //start web server
        webServer();
        //start npm dev mode
        command.startGitServer();
    })
}

if(!Util.getConfigPath()){
    return;
}


startServer();