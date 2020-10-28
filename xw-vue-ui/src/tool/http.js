import { isPlainObject } from "lodash-es";

let ajaxTool = {
    JsonToSearchParams(params){
        if (isPlainObject(params)) {
            const formData = new URLSearchParams();
            for (let key in params) {
                let value = params[key];
                formData.append(key, value);
            }
            return formData;
        } else {
            throw new Error("the param is a plain Object");
        }
    },
    JsonToFormData(params){
        if (isPlainObject(params)) {
            const formData = new FormData();
            for (let key in params) {
                let value = params[key];
                formData.append(key, value);
            }
            return formData;
        } else {
            throw new Error("the param is a plain Object");
        }
    },
    serializeUrl(url, params) {
        if (!url) { throw new Error("the first param is url") };
        if (!url.includes("?")) { url += "?" };
        if (isPlainObject(params)) {
            for (let key in params) {
                let value = params[key];
                if (url.endsWith("?")) {
                    url += `${key}=${value}`;
                } else {
                    url += `&${key}=${value}`;
                }
            }
        } else {
            throw new Error("the second param is a plain Object");
        }
        return url;
    },
    checkStatus(response) {
        if(response.status == 200){
            return response;
        }else if (response.status > 200 && response.status < 500) {
            return Promise.reject({status:response.status,msg:response.statusText})
        }else{
            return Promise.reject({status:response.status,msg:"系统接口报错("+response.status+")，请重试！"})
        }
    },
    checkCode(response) {
        let { status,data,msg } = response;
        switch (status/1) {
            case 701:
                // window.top.window.location.href = "//" +  window.top.document.domain + "/login.html";
                return Promise.reject(response);
            case 200:
                return Promise.resolve({ status, data, msg });
            default:
                return Promise.reject({ status, data, msg });
        }
    },
    parseJSON(response) {
        return response.json();
    }
}

    const get = (url, params = {})=> {
        const options = {
            method: "GET",
            headers: {
                'credentials': 'same-origin'
            }
        }
        url = ajaxTool.serializeUrl(url, params);
        url = `${url}${url.endsWith("?")?"":"&"}ran=${Math.random()}`;
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err) );
    }
    const post = (url, params = {})=> {
        const options = {
            body: JSON.stringify(params),
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'credentials': 'same-origin',
            }
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err));
    }
    const upload = (url, formData)=> {
        // const formData = ajaxTool.JsonToFormData(params);
        const options = {
            body: formData,
            method: 'POST',
            headers: {
                // 'content-type': 'multipart/form-data',
                'credentials': 'same-origin',
            }
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err));
    }
    const all = (promises)=> { 
        return Promise.all(promises);
    }
    const postFormData = (url, params = {})=> {
        const formData = ajaxTool.JsonToSearchParams(params);
        const options = {
            body: formData,
            method: 'POST',
            headers: {
                'credentials': 'same-origin',
            }
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err));
    }

export{
    get,
    post,
    upload,
    all,
    postFormData
}

export default{
    get,
    post,
    upload,
    all,
    postFormData
}