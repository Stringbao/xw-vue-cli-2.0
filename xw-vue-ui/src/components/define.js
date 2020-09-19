
import tool from "./leCompsTool.js";

let TREE_CONFIG = {
    /**
     * @description 初始化数据源，添加自定义属性，根节点__parentId:-1，初始化__level:1
     * @param data:需要初始化的数据源数组，必填
     * @param currentNode:当前节点，根节点时传入null
     * @param isRoot:是否根节点
     */
    ASYNINITATTRIBUTE(data,currentNode,isRoot){
        if(data && data instanceof Array && data.length != 0){
            data.forEach(element=>{
                element.__tmpId = tool._idSeed.newId();
                element.__children = [];
                element.__cls = "fa-caret-right";
                element.__level = isRoot?1:currentNode.__level + 1;
                element.__expand = false;
                element.__parentNode = isRoot?null:currentNode;
                element.__parentId = isRoot?-1:currentNode.__tmpId;//根节点的__parentId:-1
                element.__color = "";
                element.__checkboxStatus = 2;
            })
            return data;
        }
        return [];
    },
    /**
     * @description 每个操作的KEY
     * @param OPEN: 当前节点有children的情况下，展开事件
     * @param UPDATECHILDREN: 当前节点的无children的情况下，请求ajax事件
     * @param SELECTEDITEM: 当前项选中事件，执行callback
     * @param CHECKBOX: checkbox状态变化事件
     */
    ACTIONKEY:{
        OPEN:"open",
        UPDATECHILDREN:"updateChilden",
        SELECTEDITEM:"selectedItem",
        CHECKBOX:"checkbox"
    }
}

let BUTTON_CONFIG = {
    "search":{cls:"search",iCls:"fa-search-plus"}, //搜索
    "create":{cls:"create",iCls:"fa-plus-square"}, //新增
    "download":{cls:"download",iCls:"fa-download"}, //下载
    "update":{cls:"update",iCls:"fa-pencil"},  //更新
    "remove":{cls:"remove",iCls:"fa-trash"},   //删除
    "approve":{cls:"approve",iCls:"fa-check-square-o"},//审核
    "reject":{cls:"reject",iCls:"fa-times-circle"}, //决绝 
    "start":{cls:"start",iCls:"fa-check-square"},//启用
    "stop":{cls:"stop",iCls:"fa-minus-circle"},//停用
    "info":{cls:"info",iCls:"fa-file-text"},//详情
    "reset":{cls:"reset",iCls:"fa-repeat"},//重置
    "up":{cls:"up",iCls:"fa-arrow-circle-up"},//上架
    "down":{cls:"down",iCls:"fa-arrow-circle-down"},//下架
    "publish":{cls:"publish",iCls:"fa-paper-plane"},//发布
    "cancelPublish":{cls:"cancelPublish",iCls:"fa-window-close"},//取消发布
    "import":{cls:"import",iCls:"fa-cloud-download"},//导入
    "export":{cls:"export",iCls:"fa-cloud-upload"},//导出
    "upload":{cls:"upload",iCls:"fa-upload"},//上传
    "review":{cls:"review",iCls:"fa-eye"},//预览
    "batch":{cls:"batch",iCls:"fa-th-large"},//批量操作
    "copy":{cls:"copy",iCls:"fa-clone"},//复制
    "setting":{cls:"setting",iCls:"fa-cog"},//设置
    "decorate":{cls:"decorate",iCls:"fa-wrench"},//装修页面
    "prevPage":{cls:"prevPage",iCls:""},//上一页
    "nextPage":{cls:"nextPage",iCls:""},//下一页 
    "confirm":{cls:"confirm",iCls:""},//确定
    "save":{cls:"save",iCls:""},//保存
    "back":{cls:"back",iCls:"fa-long-arrow-left"},//返回
    "cancel":{cls:"cancel",iCls:""},//取消
    "choose":{cls:"choose",iCls:""},//请选择XXXX
    "holdSave":{cls:"holdSave",iCls:""},//暂存
    "prev":{cls:"prev",iCls:""},//上一步
    "next":{cls:"next",iCls:""},//下一步
    "default":{cls:"default",iCls:""},//默认
    "warning":{cls:"warning",iCls:"fa-exclamation-circle"},//警告
    // "down":{cls:"down",iCls:"fa-cloud-download"},
    // "upload":{cls:"upload",iCls:"fa-cloud-upload"},
    // "create":{cls:"add",iCls:"fa-file"},
    // "delete":{cls:"delete",iCls:"fa-trash-o fa-lg"},
    // "submit":{cls:"submit",iCls:"fa-check"},
    // "back":{cls:"back",iCls:"fa-rotate-left"},
    // "search":{cls:"search",iCls:"fa-search"},
    // "edit":{cls:"edit",iCls:"fa-edit"},
    // "play":{cls:"play",iCls:"fa-play"},
    // "enable":{cls:"enable",iCls:"fa-play-circle"},
    // "disable":{cls:"disable",iCls:"fa-ban"},
    // "publish":{cls:"publish",iCls:"fa-bolt"},
    // "stop":{cls:"stop",iCls:"fa-stop"},
    // "info":{cls:"info",iCls:"fa-info-circle"},
    // "setting":{cls:"setting",iCls:"fa-cog"},
    // "default":{cls:"default",iCls:""},
    
    // "close":{cls:"close",iCls:"fa-times"},
}

let ALERT_CONFIG = {
    SHOW_ALERT_CLS_TYPE:{
        "success":{cls:"msgSucces",iCls:"fa fa-check-circle"},
        "warning":{cls:"msgWarning",iCls:"fa fa-exclamation-circle"},
        "info":{cls:"msgInfo",iCls:"fa fa-info-circle"},
        "error":{cls:"msgError",iCls:"fa fa-times-circle"},
        "default":{cls:"msgSucces",iCls:"fa fa-check-circle"}
    },
    SHOW_NOTICE_CLS_TYPE:{
        "success":{cls:"noticeSucces",iCls:"fa fa-check-circle"},
        "warning":{cls:"noticeWarning",iCls:"fa fa-exclamation-circle"},
        "info":{cls:"noticeInfo",iCls:"fa fa-info-circle"},
        "error":{cls:"noticeError",iCls:"fa fa-times-circle"},
        "default":{cls:"noticeSucces",iCls:"fa fa-check-circle"}
    },
    ALERT_CLOSE_TIME:2000,
    NOTICE_CLOSE_TIME:3000
}

let DATE_TIME_PICKER_CONFIG = {
    WEEK:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    HOUR:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""}],
    MINUTE:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}],
    SECOND:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}]

}

let INPUT_VALIDATA_TYPES = {
    TYPES:{
        //自然数，包含0和正整数
        "natureNum":/^[\+]?(([1-9]\d*)|\d)$/,
        // 数字 ---- 正负 小数整数都可以
        "decimals":/^[+-]?(?!\.)(\d*)(\.)*(\d+)$/,
        // 数字  ---- 正负 整数
        "number":/^[+-]?[0-9]*$/,
        // 正整数 
        "positive":/^[+]?[0-9]*[1-9][0-9]*$/,
        //正小数
        "positiveDecimals":/^[+]?(?!\.)(\d*)(\.)+(\d+)$/,
        // 正数
        "positiveNumber":/^[+]?(?!\.)(\d*)(\.)*(\d+)$/,
        //负数
        "negativeNumber":/^[-]+(?!\.)(\d+)(\.)*(\d+)$/,
        //负小数
        "negativeDecimals":/^[-]+(?!\.)(\d+)(\.)+(\d+)$/,
        //负整数
        "negative":/^[-]?[0-9]*[1-9][0-9]*$/,
        //汉字
       //  "characters":'/\p{Unified_Ideograph}/u',
        //emai
        "email":/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        //url
        "url":/^((https|http)?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i,
        "https":/^((https)?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i,
        "http":/^((http)?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i,
        //身份证
        "id":/[1-9]\d{13,16}[a-zA-Z0-9]{1}/,
        //手机号 不包含固话
        "phone":/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-9])|(147))\d{8}$/,
        //密码, 字母开头 长度6-18，只能包含字符 数字 和 下划线
        // "password":/^[a-zA-Z]\w{5,17}$/,
        "password":"",
        //电话号 包含固话 手机
        "tel":/^(^[1][\d]{10}$)|^([0\+]\d{2,3}-?)?(\d{7,8})(-?(\d{1,6}))?$/,
   }
}

let EDITOR_MENUS = {
    DEFAULT_MENU : [
        'head',  // 标题
        'bold',  // 粗体
        // 'fontSize',  // 字号
        // 'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ],

    DEFAULT_COLOR: [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff',
        '#e1140a',
    ]

}

let PLACEHOLDER = {
    SELECT:"",
    INPUT:"",
    DATE:"",
    TIME:"",
    DATETIME:""
}

let LABELWIDTH = 100;

let UPLOADFILETYPE = {
    IMAGE:"image",
    WORD:"word",
    PDF:"pdf",
    EXCEL:"excel"
}

let DEFINE_KEY = {
    TREE_CONFIG:TREE_CONFIG,
    BUTTON_CONFIG:BUTTON_CONFIG,
    ALERT_CONFIG:ALERT_CONFIG,
    DATE_TIME_PICKER_CONFIG:DATE_TIME_PICKER_CONFIG,
    INPUT_VALIDATA_TYPES:INPUT_VALIDATA_TYPES,
    EDITOR_MENUS:EDITOR_MENUS,
    PLACEHOLDER:PLACEHOLDER,
    LABELWIDTH:LABELWIDTH,
    UPLOADFILETYPE:UPLOADFILETYPE
}

export default DEFINE_KEY;