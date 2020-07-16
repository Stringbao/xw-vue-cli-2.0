import {isPlainObject} from "lodash";

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
        if (response.status >= 200 && response.status < 500) {
            return response
        }
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error)
    },
    checkCode(response) {
        let { status,data,msg } = response;
        switch (status) {
            case 701:
                // window.location.href = "";
                return Promise.reject(response);
            case 200:
                return Promise.resolve({status,data,msg});
            default:
                return Promise.reject({status,data,msg});
        }
    },
    parseJSON(response) {
        return response.json();
    }
}

class Ajax {
    get(url, params = {}) {
        url = ajaxTool.serializeUrl(url, params);
        url = `${url}${url.endsWith("?")?"":"&"}ran=${Math.random()}`;
        return fetch(url)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) =>  Promise.reject(err) )
    }
    post(url, params = {}) {
        const options = {
            body: JSON.stringify(params),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err))
    }
    upload(url, params = {}) {
        const formData = ajaxTool.JsonToFormData(params);
        const options = {
            body: formData,
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err))
    }
    all(promises) { 
        return Promise.all(promises);
    }
    postFormData(url, params = {}) {
        const formData = ajaxTool.JsonToSearchParams(params);
        const options = {
            body: formData,
            method: 'POST',
        }
        return fetch(url, options)
            .then(ajaxTool.checkStatus)
            .then(ajaxTool.parseJSON)
            .then(ajaxTool.checkCode)
            .catch((err) => Promise.reject(err))
    }
}

export default new Ajax()