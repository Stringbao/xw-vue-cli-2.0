import {cloneDeep, isEqual, isEmpty, filter, dropWhile, uniqWith, unionWith,findIndex,orderBy,groupBy, chunk} from "lodash-es";

const EventPublisher = function(){

    this.eventCallbackDictionary = {};

    this.on = function(eventName,callback){
        this.eventCallbackDictionary[eventName] = callback;
    }

    this.broadcast = function(eventName,data){
        for(let i in this.eventCallbackDictionary){
            if(i == eventName && this.eventCallbackDictionary[eventName]){
                this.eventCallbackDictionary[eventName](data);
                //this.eventCallbackDictionary[eventName] = null;
            }
        }
    }
}

const $cookie = {
    removeCookie(name){
        this.setCookie(name,"",new Date(0));
    },
    getCookie(name){
        let cookie = document.cookie;
        let cookieName = encodeURIComponent(name) + "=",
            cookieStart = cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            let cookieEnd = cookie.indexOf(';',cookieStart);
            if(cookieEnd == -1){
                cookieEnd = cookie.length;
            }
            cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length,cookieEnd));
        }
        return cookieValue;
    },
    setCookie(name,value,expires){
        let cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText += "; expires=" + expires.toGMTString();
        }else{
            cookieText += "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        }
        document.cookie = cookieText+";path=/;domain="+document.domain;
    }
}

const $idSeed = {
    id:100000,
    newId:()=>{
        return this.id++;
    }
}

const $date = {
    date:function(val){
        if(!val){return "";}
        if(new Date(val) == "Invalid Date"){
            return "invalid time format";
        }
        let d = new Date(val);
        let m = d.getMonth()+1;
        m = m>=10?m:"0"+m;
        let day = d.getDate();
        day = d.getDate()>=10?d.getDate():"0"+d.getDate();
        return d.getFullYear() + "-" + m + "-" + day;
    },
    time:function(val){
        if(!val){return "";}
        if(new Date(val) == "Invalid Date"){
            return "invalid time format";
        }
        let d = new Date(val);
        let h = d.getHours() >=10?d.getHours():"0"+d.getHours();
        let m = d.getMinutes() >=10?d.getMinutes():"0"+d.getMinutes();
        let s = d.getSeconds() >=10?d.getSeconds():"0"+d.getSeconds();
        return h + ":" + m + ":" +s;
    },
    dateTime:function(val){
        if(!val){
            return "";
        }
        if(new Date(val) == "Invalid Date"){
            return "invalid time format";
        }
        return this.date(val) + " " + this.time(val);
    },
    compareData(one,two){
        if(new Date(one) == "Invalid Date" || new Date(two) == "Invalid Date"){
            throw new Error("invalid time format");
        }else{
            return new Date(one).getTime() > new Date(two).getTime()?true:false;
        }
    }
}

const $obj = {
    clone(source){
        if(!source){
            return null;
        }
        return cloneDeep(source);
    },
    isEqual(source, target){
        return isEqual(source, target);
    },
    assign(source, target){
        let cloneSource = this.clone(source);
        return cloneSource && Object.assign(cloneSource, target);
    },
    isEmpty(obj){
        return isEmpty(obj);
    }
}

const $array = {
    filter(arr, condition){
        return filter(arr, condition);
    },
    removeItem(arr, condition){
        return dropWhile(arr, condition);
    },
    uniq(arr1){
        return uniqWith(arr1, isEqual);
    },
    union(arr1, arr2){
        return unionWith(arr1, arr2, isEqual);
    },
    findIndex(arr, condition){
        return findIndex(arr, condition);
    },
    sort(arr, field, desc = true){
        let descStr = desc?'asc':'desc';
        if(isEmpty(arr)){
            return [];
        }
        let temp = arr[0][field];
        let tmpSortKey = "__sort__"+field;
        
        arr.forEach(x => {
            if(!isNaN(temp)){
                x[tmpSortKey] = x[field]/1;
            }
            else if(new Date(temp) != 'Invalid Date'){
                x[tmpSortKey] = new Date(x[field]).getTime();
            }else{
                x[tmpSortKey] = x[field];
            }
        });
        
        
        return orderBy(arr, [tmpSortKey], [descStr]);
    },
    groupByField(arr, field){
        return groupBy(arr, field);
    },
    groupBySize(arr, size){
        return chunk(arr, size);
    }
}

const $event_publisher = new EventPublisher();

export {
    $cookie,
    $idSeed,
    $event_publisher,
    $obj,
    $array,
    $date
}

export default {
    $cookie,
    $idSeed,
    $event_publisher,
    $obj,
    $array,
    $date
}