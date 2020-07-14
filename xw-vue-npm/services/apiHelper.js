
const fsTool = require("../tool/fsapi.js");

let APIhelper = {
    //获取文件名(去掉后缀)
    getFileName(str){
        if(!str){
            return "";
        }
        return str.substring(0,str.indexOf('.'));
    },
    //首字母大写
    firstChatUpperLower(str,flag){
        if(!str){
            return "";
        }
        let first  = str.substring(0,1);
        let other = str.substring(1);
        if(flag){
            return first.toUpperCase() + other;
        }else{
            return first.toLowerCase() + other;
        }
        
    },
    //为单个model.js准备数据
    getMoldeDataFromPageItem(item, moduleName){
        let tmp = {className:"",data:[]};
        let pageName = item.PageName;
        tmp.className = this.firstChatUpperLower(moduleName, true) + this.firstChatUpperLower(this.getFileName(pageName),true) + "Model";
        item.model.forEach(x=>{
            tmp.data.push(x.field);
        })
        return tmp;
    },
    //创建单个Module下的Model文件, 并且写入数据
    createModelFile(projectPath, pages, moduleName){
        //create model file
        let path = projectPath + "/src/model/";
        pages.forEach( item => {
            if(item.model){
                let pageName = item.PageName;
                
                let filePath = path + this.firstChatUpperLower(moduleName,false) + this.firstChatUpperLower(this.getFileName(pageName), true) + "Model.js";
                fsTool.file.createFile(filePath);
                
                let res = this.getMoldeDataFromPageItem(item, moduleName);
                let str = JSON.stringify(res);
                //write content to file
                fsTool.file.writeFile(filePath, str);
            }
        });
    },
    //创建单个Module下的Service文件, 并且写入数据
    createServiceFile(projectPath, serviceItem, storeItems, moduleName){
        //create model file
        let path = projectPath + "/src/services/";
        let filePath = path + this.firstChatUpperLower(moduleName,false) + "Services.js";
        fsTool.file.createFile(filePath);

        let maps = [];
        for(let i in serviceItem){
            if(serviceItem[i].url){
                maps.push({name:i, url:serviceItem[i].url, type:'services',fnName:i,reqType:serviceItem[i].reqType});
            }
        }
        storeItems.forEach(x=>{
            maps.push({name:x.name, url:x.url, type:x.type,fnName: "get"+this.firstChatUpperLower(x.name, true), reqType:x.reqType});
        })

        let resJson = {map:{},fns:[]};
        maps.forEach(x=>{
            if(x.type != 'enum'){
                resJson.map[x.name] = x.url;
            }
            if(x.url){
                resJson.fns.push({fnName:x.fnName, url:x.url,mapKey:x.name, type:x.type, reqType:x.reqType});
            }
        })
        
        let mapStr = "let map =" + JSON.stringify(resJson.map);
        let fnStr = "export default {save(model){return model.id?this.update(model):this.create(model);},";
        
        resJson.fns.forEach(x=>{
            let mapKey = x.mapKey;
            //如果是services
            if(x.type == "services"){
                if(x.reqType == "post"){
                    fnStr += x.fnName + `(model){
                        let params = {};
                        return Ajax.post(map.${mapKey}, params);
                    },`
                }else{
                    fnStr += x.fnName + `(model){
                        let params = {};
                        return Ajax.get(map.${mapKey}, params);
                    },`
                }
            }else{
                //如果是store
                if(x.type == "enum"){
                    fnStr += x.fnName + `(){
                        return ${x.url};
                    },`
                }else{
                    if(x.reqType == "post"){
                        fnStr += x.fnName + `(params){
                            return Ajax.post(map.${mapKey}, params);
                        },`
                    }else{
                        fnStr += x.fnName + `(params){
                            return Ajax.get(map.${mapKey}, params);
                        },`
                    }
                }
            }
        })
        fnStr += "}";
        //write content to file
        fsTool.file.writeFile(filePath, mapStr + "\n" + fnStr);
    },
    //创建单个Module下的Helper文件, 并且写入数据
    createHelperFile(projectPath, moduleName){
        let path = projectPath + "/src/helper/";
        let filePath = path + this.firstChatUpperLower(moduleName, false) + "Helper.js";
        fsTool.file.createFile(filePath);

        let str = "export default {}";
        //write content to file
        fsTool.file.writeFile(filePath, str);
    },
    //创建单个Module下的Store文件, 并且写入数据
    createStoreFile(projectPath, storeItems, moduleName){
        
    }
}


module.exports = APIhelper;