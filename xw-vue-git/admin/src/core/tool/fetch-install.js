
import Q from "q";
import _this from "../../main";

let param = function(obj) {
    let query = '';
    let name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        } else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        } else if (value !== undefined && value !== null) {
            query += encodeURIComponent(name) + '='
            + encodeURIComponent(value) + '&';
        }
        // else if(value===null){
        //     query += encodeURIComponent(name) + '=null&'
        // }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
};

export default {
    install:function(Vue){
        Vue.prototype.ajax = {
            getFetch:function(url){
                if(!url){
                    return;
                }
                let symbol = url.indexOf('?') == -1?"?":"&";
                url = url + symbol + "ran="+Math.random();
                let defer = Q.defer();
                let headers = {
                    'Content-Type': 'application/json; charset=UTF-8'
                };
                const controller = new AbortController()
                const signal = controller.signal;
                let options = {
                    method:"get",
                    credentials:'include',
                    headers:headers,
                    signal
                };
                
                fetch(url,options).then(d =>d.json()).then( (data)=> {
                    let code = data.status;
                    let message = data.msg;
                    let d = data.data?data.data:data.result;
                    if(code == "200" || code == "0"){
                        defer.resolve({data:d,params:data.params});
                    }else if(code == "701"){
                        _this.$router.push({path:"/"});
                        defer.resolve({data:d,params:data.params});
                    }else{
                        defer.reject({data: message});
                    }
                }).catch((err)=> {
                    defer.reject({data: err});
                });
                // return {controller:controller,promise:defer.promise};
                return defer.promise;
            },
            postFetch:function(url,data){
                if(!url){
                    return;
                }
                let symbol = url.indexOf('?') == -1?"?":"&";
                url = url + symbol + "ran="+Math.random();
                let defer = Q.defer();
                let headers = {
                    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Content-Type': 'application/json; charset=UTF-8'
                };
                let options = {
                    method:"post",
                    credentials:'include',
                    headers:headers
                };
                if(data){
                    // options.body = param(data);
                    options.body = JSON.stringify(data);
                }
                fetch(url,options).then(d =>d.json()).then((data)=> {
                    let code = data.status;
                    let message = data.msg;
                    let d = data.data?data.data:data.result;
                    if(code == "200" || code == "0"){
                        defer.resolve({data:d,params:data.params});
                    }else if(code == "701"){
                        _this.$router.push({path:"/"});
                        defer.resolve({data:d,params:data.params});
                    }else{
                        defer.reject({data: message});
                    }
                }).catch(function(err) {
                    defer.reject({data: err});
                });
                return defer.promise;
            },
            postFormData:function(url,data){
                if(!url){
                    return;
                }
                let symbol = url.indexOf('?') == -1?"?":"&";
                url = url + symbol + "ran="+Math.random();
                let defer = Q.defer();
                let headers = {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    // 'Content-Type': 'application/json; charset=UTF-8'
                };
                let options = {
                    method:"post",
                    credentials:'include',
                    headers:headers
                };
                if(data){
                    options.body = param(data);
                    // options.body = JSON.stringify(data);
                }
                fetch(url,options).then(d =>d.json()).then((data)=> {
                    let code = data.status;
                    let message = data.msg;
                    let d = data.data?data.data:data.result;
                    if(code == "200" || code == "0"){
                        defer.resolve({data:d,params:data.params});
                    }else if(code == "701"){
                        window.top.window.location.href = "//" +  window.top.document.domain + "/login.html";
                        defer.resolve({data:d,params:data.params});
                    }else{
                        defer.reject({data: message});
                    }
                }).catch(function(err) {
                    defer.reject({data: err});
                });
                return defer.promise;
            },
            uploadFetch:function(url,data){
                if(!url){
                    return;
                }
                let symbol = url.indexOf('?') == -1?"?":"&";
                url = url + symbol + "ran="+Math.random();
                
                let defer = Q.defer();
                
                let options = {
                    method:"post",
                    credentials:'include'
                };
                if(data){
                    options.body = data;
                }
                fetch(url,options).then(d =>d.json()).then( (data)=> {
                    let code = data.status;
                    let message = data.msg;
                    let d = data.data?data.data:data.result;
                    if(code == "200" || code == "0"){
                        defer.resolve({data:d,params:data.params});
                    }else if(code == "701"){
                        _this.$router.push({path:"/"});
                        defer.resolve({data:d,params:data.params});
                    }else{
                        defer.reject({data: message});
                    }
                }).catch(function(err) {
                    defer.reject({data: err});
                });
                return defer.promise;
            },
            fetchAll:function(promises){
                return Q.all(promises);
            }
        }
    }
}