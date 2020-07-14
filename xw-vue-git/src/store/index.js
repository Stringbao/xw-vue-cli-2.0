import Enum from "./enum.js";
export default {
    state:{
        project:"",
        modules:[

        ],
        currentModule:null,
        dataSource:{
            storeTypeUrl:Enum.storeTypeUrl,
            storeType:Enum.storeType
        },
        storeArr:[],
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
        addPages(state,data){
            console.log(data)
        },
        addStore(state,data){
            console.log(data)
        },
        //创建store的方法
        addStore(state,data){
            let idx = state.storeArr.findIndex(item=>item.state.name == data.state.name);
            if(idx < 0){
                state.storeArr.push(data);
            }else{
                alert("the module name is unique,this module is exist");
                return;
            }
        }
    },
    actions:{
        addModules({commit,state},ModuleName){
            commit("addModules",{
                ModuleName:ModuleName,
                Pages:[],
                Services:{
                    create: {
                        url: ""
                    },
                    update: {
                        url: ""
                    },
                    remove: {
                        url: ""
                    },
                    detail: {
                        url: ""
                    },
                    list: {
                        url: ""
                    }
                },
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
        }
    }
}