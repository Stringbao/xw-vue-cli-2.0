const ejs = require("ejs");

const api = {
    renderEjsTemplate:(str,data)=>{
        
        let res = ejs.compile(str,)(data);
        return res;
    }
}

module.exports = api;