
import {isEmpty, isNumber, toString} from "lodash-es";
import Contant from "./contant.js";

export default {
    verifyIsOn(comp){
        if(comp.on ==="" || comp.on){
            return true;
        }
        return false;
    },
    verifyRequire(){
        return function(value){
            return !isEmpty(value);
        }
    },
    verifyMax(maxNum){
        return function(value){
            if(!isNaN(maxNum)){
                if(isNumber(value)){
                    return toString(value).length <= maxNum;
                }else{
                    return value.length <= maxNum;
                }
            }else{
                return false;
            }
        }
    },
    verifyMin(minNum){
        return function(value){
            if(!isNaN(minNum)){
                if(isNumber(value)){
                    return toString(value).length >= minNum;
                }else{
                    return value.length >= minNum;
                }
            }else{
                return false;
            }
        }
    },
    verifyVtype(vtype){
        return function(value){
            const reg = Contant.INPUT_VALIDATA_TYPES[vtype];
            if(reg){
                return new RegExp(reg).test(value);
            }else{
                return false;
            }
        }
    },
    
    getErrorMsg(compoent, key){
        let msg = compoent.msg;
        if(msg){
            if(typeof msg === "string"){
                return msg;
            }else if(msg instanceof Array == false && typeof msg == "object"){
                return msg[key];
            }else{
                return "";
            }
        }else{
            return "msg must be setted";
        }
    }
}