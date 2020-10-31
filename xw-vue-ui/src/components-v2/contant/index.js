

let FormConstant = {
    INPUT:{
        PLACEHOLDER:"please enter message",
        LABEL_WIDTH:100
    },
    TEXTAREA:{
        WIDTH:"100%",
        HEIGHT:100,
        PLACEHOLDER:"please enter message",
        LABEL_WIDTH:100
    },
    CHECKBOX:{
        LABEL_WIDTH:100
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
    }
}

export default FormConstant;