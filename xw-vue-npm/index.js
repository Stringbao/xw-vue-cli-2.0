
const express = require("express");
const app = express();
const path = require('path');


//这个包非常重要，是为了解决nodejs里面post参数接受异常的问题
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

require('./route/index.js')(app);

app.set('view options', { pretty: true });

let init = function(){
    app.listen(9876,d=>{
        console.log("listen in 9876");
        // app.all('*', function (req, res, next) {
        //     // res.header("Access-Control-Allow-Origin", "*");
        //     //将Access-Control-Allow-Credentials设为true  允许携带cookie
        //     res.header('Access-Control-Allow-Credentials', true); 
        //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        //     res.header("X-Powered-By", ' 3.2.1');
        //     //返回数据格式为json字符串
        //     res.header("Content-Type", "application/json;charset=utf-8");
        //     next();
        // });
    })
}

// init();

module.exports =  init;