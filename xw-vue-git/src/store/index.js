import Enum from "./enum.js";
export default {
    state:{
        project:"",
        modules:[

        ],
        currentModule:null,
        dataSource:{
            storeType:Enum.storeType,
            requestType:Enum.requestType
        },
    },
    mutations:{
        //创建modules的方法
        addModules(state,data){
            let idx = state.modules.findIndex(item=>item.ModuleName == data.ModuleName);
            if(idx < 0){
                state.modules.push(data);
            }else{
                alert("the module name is unique,this module is exist");
                return;
            }
        },
        removeModules(state,data){
            let idx = state.modules.findIndex(item=>item.ModuleName == data); 
            if(idx >= 0){
                state.modules.splice(idx,1);
            }
        },
        changeModules(state,data){
            state.currentModule = data;
        },
        //创建pages
        addPages(state,data){
            console.log(data)
        },
        //创建stores
        addStore(state,data){
            let idx = state.currentModule.Store.state.findIndex(item=>item.name == data.name);
            if(idx<0){
                state.currentModule.Store.state.push(data)
            }else{
                alert("there had been exited a same store")
            }
        },
        removeStore(state,data){
            state.currentModule.Store.state.splice(data,1)
        },
        changeStore(state,data){
            state.currentModule.Store.state = data;
        },
        updateStore(state,data){

        },
        //创建services
        addService(state,data){
            let idx = state.currentModule.Services.findIndex(item=>item.name == data.name && item.reqType == data.reqType);
            if(idx<0){
                state.currentModule.Services.push(data)
            }else{
                alert("there had been exited a same service")
            }
        },
        removeService(state,data){
            state.currentModule.Services.splice(data,1)
        },
        getServiceId(state,data){
            console.log(data);
            state.currentModule = data;
        },
        updateService(state,data){
            // todo 
        },
    },
    actions:{
        addModules({commit,state},ModuleName){
            commit("addModules",{
                ModuleName:ModuleName,
                Pages:[],
                Services:[
                    { name:"create",reqType:"post",url:""},
                    { name:"update",reqType:"post",url:""},
                    { name:"remove",reqType:"post",url:""},
                    { name:"detail",reqType:"get",url:""},
                    { name:"list",reqType:"get",url:""}
                ],
                Store:{
                  state:[]  
                }
            });
        },
        removeModules({commit,state},ModuleName){
            commit("removeModules",ModuleName)
        },
        changeModules({commit,state},module){
            commit("changeModules",module)
        },

        addPages({commit,state},data){
            commit("addPages",data)
        },

        addStore({commit,state},data){
            commit("addStore",data)
        },
        updateStore({commit,state},data){
            commit("updateStore",data)
        },
        removeStore({commit,state},data){
            commit("removeStore",data);
        },
        
        addService({commit,state},data){
            commit("addService",data);
        },
        removeService({commit,state},data){
            commit("removeService",data);
        },
        updateService({commit,state},data){
            commit("updateService",data);
        }
    }
}