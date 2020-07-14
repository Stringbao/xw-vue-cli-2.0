
const fsTool = require("../tool/fsapi.js");
const resEntity = require("../tool/responseEntity");
const path = require("path");

const data = require("../project.js");

const projectPath = '/Users/wupeng/Documents/aaa';

const api = {
    create(req,res){
        //create all the files by module (one by one)
        data.Modules.forEach(item => {
            
        });
    },
    createModel(){

    },
    createServices(){

    },
    createStore(){

    },
    createView(){

    }
}


module.exports = api;