import Util from "../core/tool/commonUtil.js";
let vueContext = Util.getVueInstance();
let _map = {
    resetConfig:"/comp/resetConfig",
    saveModule:"/comp/createModuleFolder",
    createModule:"/comp/createGlobalFile",
    createModuleFile:"/comp/createModuleFile",
    getProjects:"/comp/getProjects",
    savePage:"/comp/savePage",
    saveProxy:"/comp/saveProxy"
}
export default {
    resetConfig(t){
        vueContext.ajax.postFetch(_map.resetConfig)
            .then((d)=>{
                t.cb(d);
            })
            .catch(e => {
                vueContext.alert.showAlert("error",e.data);
            })
    },
    saveModule(t){
        vueContext.ajax.postFetch(_map.saveModule,t.params)
            .then((d)=>{
                t.cb(d);
            })
            .catch(e => {
                vueContext.alert.showAlert("error",e.data);
            })
    },
    createModule(t){
        vueContext.ajax.postFetch(_map.createModule,t.params)
            .then((d)=>{
                t.cb(d);
            })
            .catch(e => {
                vueContext.alert.showAlert("error",e.data);
            })
    },
    createModuleFile(t){
        vueContext.ajax.postFetch(_map.createModuleFile,t.params)
            .then((d)=>{
                t.cb(d);
            })
            .catch(e => {
                vueContext.alert.showAlert("error",e.data);
            })
    },
    getProjects(t){
        vueContext.ajax.getFetch(_map.getProjects,t.params)
            .then((d)=>{
                t.cb(d);
            })
            .catch(e => {
                vueContext.alert.showAlert("error",e.data);
            })
    },
    savePage(t){
        vueContext.ajax.postFetch(_map.savePage,t.params)
            .then((d)=>{
                t.cb(d);
            })
            .catch(e => {
                vueContext.alert.showAlert("error",e.data);
            })
    },
    saveProxy(t){
        vueContext.ajax.postFetch(_map.saveProxy,t.params)
            .then((d)=>{
                t.cb(d);
            })
            .catch(e => {
                vueContext.alert.showAlert("error",e.data);
            })
    },
}