
const fsTool = require("../tool/fsapi.js");

let str = fsTool.file.readFile("./test.txt");

let arr = str.split('展台 Booth');

arr.forEach(item=>{
    
    if(item != ""){
        item = '展台 Booth' + item;
        var result = /展台.*\s+(.*)\s+.*\s+电话 Tel.: ([\s\d]*)[\S\D]+网址 Website: ([\w.]*).*/g.exec(item);
        if(result){
            debugger
            var name=result[1];
            var tel=result[2];
            var site=result[3]
        }else{
            debugger
        }
    }
})