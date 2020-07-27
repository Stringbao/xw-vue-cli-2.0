
import "./alert.css";
import $ from "jquery";
import DEFINE_KEY from "../define.js";
import tool from "../leCompsTool.js";

let _le_alert = {
    showMessage:(type,msg)=>{
        let zIndex = tool._idSeed.newId();
        if(!type){
            type = "default";
        }
        if(!msg){
            msg = "NULL!";
        }
        let res = DEFINE_KEY.ALERT_CONFIG.SHOW_ALERT_CLS_TYPE[type];
        if(!res){
            res = DEFINE_KEY.ALERT_CONFIG.SHOW_ALERT_CLS_TYPE["default"];
        }

        let parentDiv = $("<div style='z-index:"+zIndex+";top:-50px;opacity:0;' class='le_alert content'></div>");
        let html = "<div class='msgBox "+res.cls+"' style='opacity:1'>";
        html += "<i class='left "+res.iCls+"'></i>";
        html += "<p>"+msg+"</p>";
        html += "<i tag='del' class='right fa fa-times-circle closeBtn'></i>";
        html += "</div>";

        $(parentDiv).append($(html));
        $("body").append($(parentDiv));

        // $(parentDiv).on("click","i[tag=del]",function(){
        //     $(this).parents('div.le_alert').remove();
        // })

        // $(parentDiv).css({'top':'-50px','opacity':0,'z-index':zIndex});
        $(parentDiv).animate({top:'16px',opacity:1},500,()=>{
            setTimeout(()=>{
                $(parentDiv).animate({top:'-50px',opacity:0,'z-index':0},500,()=>{
                    $(parentDiv).remove();
                })
            },DEFINE_KEY.ALERT_CONFIG.ALERT_CLOSE_TIME)
        })
    },
    showConfirm:(title,cb,Vue)=>{
        let zIndex = tool._idSeed.newId();
        
        let parentDiv = $('<div style="z-index:'+zIndex+'" class="le_alert MsgAlertBox"></div>');
        let html ='<div class="Alertcontent">'+
                  '<p><#提示#><i tag="le-show-confirm-close">×</i></p>'+
                  '<div class="msgContent clearfix">'+
                  '<i class="fa fa-exclamation-circle"></i>'+
                  '<p>'+title+'</p>'+
                  '</div>'+
                  '<div class="alert_btnGroup">'+
                  '<span class="btn cancel" tag="le-show-confirm-close"><#取消#></span>'+
                  '<span class="btn confirm" tag="le-show-confirm-ok"><#确定#></span>'+
                  '</div>'+
                  '</div>';
        $(parentDiv).append($(html));
        $("body").append($(parentDiv));
        $(".MsgAlertBox").show();

        $("body").off("click","i[tag=le-show-confirm-close]").on("click","i[tag=le-show-confirm-close]",function(){
            $(this).parents("div.MsgAlertBox").remove();
        })
        $("body").off("click",'span[tag=le-show-confirm-close]').on("click","span[tag=le-show-confirm-close]",function(){
            $(this).parents("div.MsgAlertBox").remove();
        })
        $("body").off("click",'span[tag=le-show-confirm-ok]').on("click","span[tag=le-show-confirm-ok]",function(){
            if(cb){
                cb();
            }
            $(this).parents("div.MsgAlertBox").remove();
        })
    },
    showNotify:(type,msg)=>{
        let zIndex = tool._idSeed.newId();
        if(!type){
            type = "default";
        }
        if(!msg){
            msg = "NULL!";
        }
        let res = DEFINE_KEY.ALERT_CONFIG.SHOW_NOTICE_CLS_TYPE[type];
        if(!res){
            res = DEFINE_KEY.ALERT_CONFIG.SHOW_NOTICE_CLS_TYPE["default"];
        }
        let parentDiv = $('<div style="z-index:'+zIndex+'" class="le_alert notice '+res.cls+'"></div>');
        let html ='<div class="noticeTs"><i class="'+res.iCls+'"></i><#提示#></div>'+
                  '<p>'+msg+'</p>'+
                  '<span class="closeBtn" tag="le-show-notify-close">×</span>';
        $(parentDiv).append($(html));
        $("body").append($(parentDiv));
        $(parentDiv).animate({right:'16px',top:'16px'},100,()=>{
            setTimeout(()=>{
                $(parentDiv).remove();
            },DEFINE_KEY.ALERT_CONFIG.NOTICE_CLOSE_TIME)
        })

        $("body").on("click","span[tag=le-show-notify-close]",function(){
            $(this).parents("div.notice").remove();
        })
    }
}


export default {
    install:(Vue)=>{
        Vue.prototype.alert = {
            showAlert:(type,msg)=>{
                _le_alert.showMessage(type,msg,Vue);
            },
            showConfirm:(title,cb)=>{
                _le_alert.showConfirm(title,cb,Vue);
            },
            showNotify:(type,msg)=>{
                _le_alert.showNotify(type,msg,Vue);
            }
        }
    }
};