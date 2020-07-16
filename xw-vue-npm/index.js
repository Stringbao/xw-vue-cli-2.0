
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

let init = function(){
    console.log(1);
    app.listen(9876,d=>{
        console.log("listen in 9876");
    })
}

module.exports =  init;