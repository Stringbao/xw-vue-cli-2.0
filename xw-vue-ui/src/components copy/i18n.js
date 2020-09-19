
import tool from "./leCompsTool.js";

let i18n = {
    comps:{
        "取消":{
            "zh":"取消",
            "en":"cancel"
        },
        "提示":{
            "zh":"提示",
            "en":"hint"
        },
        "确定":{
            "zh":"确定",
            "en":"OK"
        },
    }
}

let lang18n = (key)=>{
    let lang = tool.cookie.getCookie("lang");
    if(!lang){
        lang = "zh";
    }
    if(!i18n.comps[key]){
        return key;
    }
    return i18n.comps[key][lang];
}

export default lang18n;