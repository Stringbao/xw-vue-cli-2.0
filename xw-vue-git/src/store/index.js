import Enum from "./enum.js";
import { unionBy } from "lodash-es"
export default {
    state: {
        project: "",
        modules: [

        ],
        existedModules: [],
        currentModule: null,
        dataSource: {
            storeType: Enum.storeType,
            requestType: Enum.requestType,
            isCommon: Enum.isCommon
        },
        pagesDatasource: {
            searchModelTypes: Enum.searchModelTypes,
            toolbarType: Enum.toolbarType,
            dialogFieldType: Enum.dialogFieldType,
            tableShowCK: Enum.tableShowCK,
            vtypeList: Enum.vtypeList,
            dialogValidateType: Enum.dialogValidateType,
            dataSourceType: Enum.dataSourceType,
            dataSourceReqType: Enum.dataSourceReqType,
        }
    },
    mutations: {
        addModules(state, data) {
            let idx = state.modules.findIndex(item => item.ModuleName == data.ModuleName);
            if (idx < 0) {
                state.modules.push(data);
            } else {
                alert("the module name is unique,this module is exist");
                return;
            }
        },
        addExistedModules(state, data) {
            let arr = unionBy(state.existedModules, data, 'ModuleName');
            state.existedModules = arr;
        },
        removeModules(state, data) {
            let idx = state.modules.findIndex(item => item.ModuleName == data);
            if (idx >= 0) {
                state.modules.splice(idx, 1);
            }
        },
        changeModules(state, data) {
            state.currentModule = data;
        },
        //创建page
        addPages(state, data) {
            let idx = state.currentModule.Pages.findIndex(item => item.pageName == data.pageName);
            if (idx < 0) {
                state.currentModule.Pages.push(data)
            } else {
                alert("the page name is unique,this page name is exist");
                return;
            }
        },
        removePages(state, data) {
            state.currentModule.Pages.splice(data, 1)
        },
        updatePages(state, data) {
            state.currentModule.Pages[data.idx] = data.page
        },
        //创建stores
        addStore(state, data) {
            state.currentModule.Store.push(data);
        },
        removeStore(state, data) {
            state.currentModule.Store.splice(data, 1)
        },
        updateStore(state, data) {
            state.currentModule.Store[data.idx] = data.data;
        },

        addModel(state, data) {
            state.modelList.push(data);
        },
        removeModel(state, data) {
            state.modelList.splice(data, 1)
        },
        updateModel(state, data) {
            state.modelList[data.idx] = data.data;
        },
        //创建services
        addService(state, data) {
            let idx = state.currentModule.Services.findIndex(item => item.name == data.name && item.reqType == data.reqType);
            if (idx < 0) {
                state.currentModule.Services.push(data)
            } else {
                alert("there had been exited a same service")
            }
        },
        removeService(state, data) {
            state.currentModule.Services.splice(data, 1)
        },
        updateService(state, data) {

            state.currentModule.Services[data.idx] = data.data;
        },
    },
    actions: {
        addExistedModules({ commit, state }, data) {
            commit("addExistedModules", data);
        },
        addModules({ commit, state }, ModuleName) {
            commit("addModules", {
                ModuleName: ModuleName,
                Pages: [],
                Services: [
                    { name: "create", reqType: "post", isCommon:false, url: "", pageName: "", stype: 1 },
                    { name: "update", reqType: "post", isCommon:false, url: "", pageName: "", stype: 1 },
                    { name: "remove", reqType: "post", isCommon:false, url: "", pageName: "", stype: 1 },
                    { name: "detail", reqType: "get", isCommon:false, url: "", pageName: "", stype: 1 }
                ],
                Store: [],
                modelList:[]
            });
        },
        removeModules({ commit, state }, ModuleName) {
            commit("removeModules", ModuleName)
        },
        changeModules({ commit, state }, module) {
            commit("changeModules", module)
        },

        addPages({ commit, state }, data) {
            commit("addPages", data)
        },
        removePages({ commit, state }, data) {
            commit("removePages", data)
        },
        updatePages({ commit, state }, data) {
            commit("updatePages", data)
        },

        addModel({ commit, state }, data) {
            let idx = state.modelList.findIndex(item => item.name == data.name);
            if (idx < 0) {
                commit("addModel", data);
                return Promise.resolve();
            } else {
                return Promise.reject({ msg: "there had been exited a same model" });
            }
        },
        updateModel({ commit, state }, data) {
            commit("updateModel", data);
            return Promise.resolve();
        },
        removeModel({ commit, state }, data) {
            commit("removeModel", data);
        },

        addStore({ commit, state }, data) {
            let idx = state.currentModule.Store.findIndex(item => item.name == data.name);
            if (idx < 0) {
                commit("addStore", data);
                return Promise.resolve();
            } else {
                return Promise.reject({ msg: "there had been exited a same store" });
            }
        },
        updateStore({ commit, state }, data) {
            commit("updateStore", data);
            return Promise.resolve();
        },
        removeStore({ commit, state }, data) {
            commit("removeStore", data);
        },

        addService({ commit, state }, data) {
            data.stype = 2;
            commit("addService", data);
        },
        removeService({ commit, state }, data) {
            commit("removeService", data);
        },
        updateService({ commit, state }, data) {
            commit("updateService", data);
        }
    }
}