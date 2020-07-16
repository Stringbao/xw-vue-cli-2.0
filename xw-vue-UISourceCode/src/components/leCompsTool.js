/**
 * Created by wupeng5 on 2018/2/1.
 */

let FORMEventPublisher = function(){

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

let LeCompTool = {
    object:{
        equalsObject(source,target){
            let p;
            for (p in source) {
                if (typeof (target[p]) == 'undefined') {
                    return false;
                }
            }
    
            for (p in source) {
                if (source[p]) {
                    switch (typeof (source[p])) {
                        case 'object':
                            if (!this.equalsObject(source[p], target[p])) {
                                return false;
                            }
                            break;
                        case 'function':
                            if (typeof (target[p]) == 'undefined' ||
                                (p != 'equals' && source[p].toString() != target[p].toString()))
                                return false;
                            break;
                        default:
                            if (source[p] != target[p]) {
                                return false;
                            }
                    }
                } else {
                    if (target[p])
                        return false;
                }
            }
    
            for (p in target) {
                if (typeof (source[p]) == 'undefined') {
                    return false;
                }
            }
    
            return true;
        },
        cloneObj(source){
            if(source){
                return JSON.parse(JSON.stringify(source));
            }
            return null;
        },
        addPrimaryAndCk(data,ck){
            data.map(item=>{
                if(ck!=undefined){
                    if(!ck){
                        item.ck = false;
                    }else{
                        item.ck = true;
                    }
                }else{
                    item.ck = false;
                }
                item.cls = "";
                item.__tmpId = LeCompTool._idSeed.newId();
            });
            return data;
        },
        getCheckedItems(arr,field){
            let res = {items:[],vals:[]};
            arr.map(item=>{
                if(item.ck){
                    res.items.push(item);
                    if(field){
                        res.vals.push(item[field]);
                    }
                }
            })
            return res;
        },
        getInfoInArrayByField(field,vals,array){
            let res = [];
            vals.map(item=>{
                array.map(k=>{
                    if(k[vals] == item){
                        res.push(k);
                    }
                })
            })
            return res;
        },
        deepClone(obj){
            let res = {}
            if(obj instanceof Array) {
                res = obj.map(i => this.deepClone(i))
            }else {
                let keys = Object.keys(obj);
                keys.forEach(i => {
                    if(typeof obj[i] === 'object' && obj[i]) {
                        res[i] = this.deepClone(obj[i])
                    }else{
                        res[i] = obj[i]
                    }
                })
            }
            
            return res;
        }
    },
    string:{
        replaceAll:function(value,findText,replaceText){
            let regExp = new RegExp(findText, "g");
            return value.replace(regExp, replaceText);
        }
    },
    arrayServer:{
        _private:{
            getIndexByString: function (array, str) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == str) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            getIndexByObject: function (array, obj) {
                let _index = -1;
                for (let i = 0; i < array.length; i++) {
                    if (LeCompTool.object.equalsObject(array[i], obj)) {
                        _index = i;
                        break;
                    }
                }
                return _index;
            },
            removeSingleStr: function (array, str) {
                let _index = this.getIndexByString(array, str);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            removeSingleObject: function (array, item) {
                let _index = this.getIndexByObject(array, item);
                if (_index == -1) {
                    return array;
                }
                array.splice(_index, 1);
                return array;
            },
            sortByDate:function(array, field, desc){
                let _arr = LeCompTool.object.cloneObj(array);
                _arr.map(function(item){
                    item._tmpDateField = new Date(item[field]).getTime();
                })
                _arr.sort(function (a, b) {
                    if(desc){
                        return a._tmpDateField - b._tmpDateField;
                    }else{
                        return b._tmpDateField - a._tmpDateField;
                    }
                })
                return _arr;
            },
            sortByNumAndChar:function(array, field, desc){
                let _arr = LeCompTool.object.cloneObj(array);
                _arr.sort(function (a, b) {
                    if(desc){
                        return a[field] - b[field];
                    }else{
                        return b[field] - a[field];
                    }
                })
                return _arr;
            }
        },
        removeItems:function(array, items){
            if(array instanceof Array == false){
                return;
            }
            items.map(function (item) {
                if (typeof item == "object") {
                    LeCompTool.arrayServer._private.removeSingleObject(array, item);
                }
                if (typeof item == "string") {
                    LeCompTool.arrayServer._private.removeSingleStr(array, item);
                }
            })
            return array;
        },
        sortByField:function(array,field,desc){
            if(array instanceof Array == false){
                return;
            }
            if(array.length == 0){
                return array;
            }
            let res = null;
            let tmp = array[0][field];

            //check Date
            if (new Date(tmp) != "Invalid Date") {
                res = _private.sortByDate(array, field, desc);
            } else {
                res = _private.sortByNumAndChar(array, field, desc);
            }
            return res;
        }
    },
    cookie:{
        removeCookie(name){
            LeCompTool.cookie.setCookie(name,"",new Date(0));
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
        },
    },
    date:{
        date:function(val){
            if(!val){return "";}
            if(new Date(val) == "Invalid Date"){
                return "<#非法的时间格式#>";
            }
            let d = new Date(val);
            let m = d.getMonth()+1;
            m = m>=10?m:"0"+m;
            let day = d.getDate();
            day = d.getDate()>=10?d.getDate():"0"+d.getDate();
            return d.getFullYear() + "/" + m + "/" + day;
        },
        time:function(val){
            if(!val){return "";}
            if(new Date(val) == "Invalid Date"){
                return "<#非法的时间格式#>";
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
                return "<#非法的时间格式#>";
            }
            return this.date(val) + " " + this.time(val);
        },
        //当前月的第一天
        getCurrentMonthFirst(){
            let date=new Date();
            date.setDate(1);
            return this.date(date);
        },
        //当前月的最后一天
        getCurrentMonthLast(){
            let date=new Date();
            let currentMonth=date.getMonth();
            let nextMonth=++currentMonth;
            let nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
            let oneDay=1000*60*60*24;
            return this.date(new Date(nextMonthFirstDay-oneDay));
        },
        //比较2个时间
        compareData(one,two){
            let res = {success:false,data:false};
            if(new Date(one) == "Invalid Date" || new Date(two) == "Invalid Date"){
                res.success = false;
            }else{
                res.success = true;
                let time_one = new Date(one).getTime();
                let time_two = new Date(two).getTime();
                if(time_one > time_two){
                    res.data = true;
                }else{
                    res.data = false;
                }
            }
            return res;
        }
    },
    _idSeed:{
        id:90000,
        newId:()=>{
            return LeCompTool._idSeed.id++;
        }
    },
    _form_event_publisher:new FORMEventPublisher()
}

export default LeCompTool;