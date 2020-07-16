
const express = require("express");
const app = express();
const path = require('path');
const fs = require('./tool/fsapi.js');

//这个包非常重要，是为了解决nodejs里面post参数接受异常的问题
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./route/index.js')(app);

app.set('view options', { pretty: true });

const init = (projectPath,projectName)=>{
    app.listen(9998,d=>{

    })
}

/**
 * 发布到生产环境后需要注释init方法, 项目下载完毕后会直接启动node服务
 * 测试环境需要打开init方法，直接启动node服务
 */
// init("/Users/wupeng/Documents/aaa","aaa");

module.exports = init;