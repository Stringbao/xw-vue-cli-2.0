

let FormConstant = {
    INPUT:{
        PLACEHOLDER:"",
        LABEL_WIDTH:100
    },
    TEXTAREA:{
        WIDTH:"100%",
        HEIGHT:100,
        PLACEHOLDER:"",
        LABEL_WIDTH:100
    },
    CHECKBOX:{
        LABEL_WIDTH:100
    },
    RADIO:{
        LABEL_WIDTH:100,
    },
    DATE_PICKER: {
        DATE: {
            LABEL_WIDTH: 100,
            PLACEHOLDER: ""
        },
        TIME: {
            LABEL_WIDTH: 100,
            PLACEHOLDER: ""
        },
        DATE_TIME: {
            LABEL_WIDTH: 100,
            PLACEHOLDER: ""
        },
        DATE_TIME_PICKER_CONFIG: {
            WEEK:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
            HOUR:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""}],
            MINUTE:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}],
            SECOND:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}]
        }
    },
    LOCAL_UPLOAD:{
        LABELWIDTH:100,
        IMAGE:"image",
        WORD:"word",
        PDF:"pdf",
        EXCEL:"excel"
    },
    UPLOADFILE:{
        LABEL_WIDTH:100,
        IMAGE:"image",
        WORD:"word",
        PDF:"pdf",
        EXCEL:"excel"
    },
    BUTTON:{
        ICON_CONFIG:{
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
        }
    },
    DATE_TIME_PICKER_CONFIG : {
        WEEK:["<#日#>","<#一#>","<#二#>","<#三#>","<#四#>","<#五#>","<#六#>"],
        HOUR:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""}],
        MINUTE:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}],
        SECOND:[{"name":"00","cls":""},{"name":"01","cls":""},{"name":"02","cls":""},{"name":"03","cls":""},{"name":"04","cls":""},{"name":"05","cls":""},{"name":"06","cls":""},{"name":"07","cls":""},{"name":"08","cls":""},{"name":"09","cls":""},{"name":"10","cls":""},{"name":"11","cls":""},{"name":"12","cls":""},{"name":"13","cls":""},{"name":"14","cls":""},{"name":"15","cls":""},{"name":"16","cls":""},{"name":"17","cls":""},{"name":"18","cls":""},{"name":"19","cls":""},{"name":"20","cls":""},{"name":"21","cls":""},{"name":"22","cls":""},{"name":"23","cls":""},{"name":"24","cls":""},{"name":"25","cls":""},{"name":"26","cls":""},{"name":"27","cls":""},{"name":"28","cls":""},{"name":"29","cls":""},{"name":"30","cls":""},{"name":"31","cls":""},{"name":"32","cls":""},{"name":"33","cls":""},{"name":"34","cls":""},{"name":"35","cls":""},{"name":"36","cls":""},{"name":"37","cls":""},{"name":"38","cls":""},{"name":"39","cls":""},{"name":"40","cls":""},{"name":"41","cls":""},{"name":"42","cls":""},{"name":"43","cls":""},{"name":"44","cls":""},{"name":"45","cls":""},{"name":"46","cls":""},{"name":"47","cls":""},{"name":"48","cls":""},{"name":"49","cls":""},{"name":"50","cls":""},{"name":"51","cls":""},{"name":"52","cls":""},{"name":"53","cls":""},{"name":"54","cls":""},{"name":"55","cls":""},{"name":"56","cls":""},{"name":"57","cls":""},{"name":"58","cls":""},{"name":"59","cls":""}]
    },
    
    DEFINE_KEY : {
        // TREE_CONFIG:TREE_CONFIG,
        // BUTTON_CONFIG:BUTTON_CONFIG,
        // ALERT_CONFIG:ALERT_CONFIG,
        // DATE_TIME_PICKER_CONFIG:this.DATE_TIME_PICKER_CONFIG,
        // INPUT_VALIDATA_TYPES:INPUT_VALIDATA_TYPES,
        // EDITOR_MENUS:EDITOR_MENUS,
        // PLACEHOLDER:PLACEHOLDER,
        // LABELWIDTH:LABELWIDTH,
        // UPLOADFILETYPE:UPLOADFILETYPE
    }
    
}

export default FormConstant;