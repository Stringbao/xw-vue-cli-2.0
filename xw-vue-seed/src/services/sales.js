

import Ajax from "@util/http.js";

export default {
    getSalesRoute(){
        return new Promise((resolve,reject)=>{
            Ajax.get('/productAPI/index/queryList/190').then(x=>{
                resolve(x.data);
            }).catch(err=>{
                reject(err);
            })
        })
    },
    save(model){
        return new Promise((resolve,reject)=>{
            let url = "/productAPI/necSalesRoute/saveOrUpdate";
            let params = {
                channelCode:model.channelCode,
                materialNumber:model.materialNumber
            };
            model.code? params.code = model.code:"";
            Ajax.postFormData(url, params).then(x=>{
                resolve(x);
            }).catch(err=>{
                reject(err);
            })
        })
    }
}