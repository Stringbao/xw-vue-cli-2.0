const express = require('express');
const fs = require('fs');
const consolidate = require('consolidate');

let server = express();
server.listen(3000);

server.engine('html',consolidate.ejs);

server.set('view engine','ejs');

server.set('views','./view');

server.get('/router',(req,res)=>{
    let resultJson = fs.readFileSync('./router.json' ,"utf8");
    if (resultJson) {
        resultJson = JSON.parse(resultJson)
    }
    res.render('index',{data: resultJson})
});

server.get('/service',(req,res)=>{
    let resultJson = fs.readFileSync('./service.json' ,"utf8");
    if (resultJson) {
        resultJson = JSON.parse(resultJson)
    }
    res.render('module',{data: resultJson})
});

server.get('/store/index',(req,res)=>{
    let resultJson = fs.readFileSync('./store.json' ,"utf8");
    if (resultJson) {
        resultJson = JSON.parse(resultJson)
    }
    res.render('index',{data: resultJson})
});

server.get('/store/module',(req,res)=>{
    let resultJson = fs.readFileSync('./storeModule.json' ,"utf8");
    if (resultJson) {
        resultJson = JSON.parse(resultJson)
    }
    res.render('module',{data: resultJson})
});

server.get('/list',(req,res)=>{
    let resultJson = fs.readFileSync('./list.json' ,"utf8");
    if (resultJson) {
        resultJson = JSON.parse(resultJson);
    }

    res.render('list',{data: resultJson})
});

server.get('/save',(req,res)=>{
    let resultJson = fs.readFileSync('./list.json' ,"utf8");
    if (resultJson) {
        resultJson = JSON.parse(resultJson);
    }

    res.render('save',{data: resultJson})
});



server.get('/model',(req,res)=>{
    let resultJson = fs.readFileSync('./model.json' ,"utf8");
    if (resultJson) {
        resultJson = JSON.parse(resultJson);
    }

    res.render('module',{data: resultJson})
});