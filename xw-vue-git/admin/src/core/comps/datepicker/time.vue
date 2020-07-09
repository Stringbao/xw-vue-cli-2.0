
<template>
    <div class="form-item timeContent" :name="KEYS.ROOTDOM" :isDatetimePicker="isDatetimePicker" v-bodyClick="closePicker" :_body_tag="__DatetimePickerKey">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div" :class="state.successIcon">
            <div class="searchBar">
                <i class="fa fa-clock-o clock"></i>
                <input :_body_tag="__DatetimePickerKey" v-model="timeStr" :isDatetimePicker="isDatetimePicker" :placeholder="placeholderStr" class="timeInput" readonly :class="{readonlyIcon:readonlyFlag}" :name="KEYS.timeInputDomKey" @click="open"/>
                <div v-show="showClear" class="fa fa-times-circle clearTime" :name="KEYS.clearTimeDomKey" @click.stop="clear"></div>
                <p class="promptMsg" v-show="state.showError">{{msg}}</p>
                <p class="tip" v-show="!state.showError">{{$attrs.tip}}</p>
            </div>
            <div class="timePicker" @click.stop :name="KEYS.timePanelDomKey">
                <div class="timePanel">
                    <div class="hour">
                        <ul :name="KEYS.hourDomKey"></ul>
                    </div>
                    <div class="minute">
                        <ul :name="KEYS.minDomKey"></ul>
                    </div>
                    <div class="seconds">
                        <ul :name="KEYS.secDomKey"></ul>
                    </div>
                </div>
                <div class="timeBtnGroup">
                    <span id="cancel" @click.stop="closePicker"><#关闭#></span>
                    <span id="confirm" @click.stop="ok"><#确定#></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import $ from "jquery";
import define from "../define.js";
import tool from "../leCompsTool.js";

export default {
    name:"LeTimePicker",
    props:["msg","value","readonly","isDatetimePicker","DatetimePickerKey"],
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data(){
        return {
            //validataHOC组件属性
            validataComponentType:"TimePicker",
            //验证组件需要的错误信息提示
            state:{
                showError:false,
                successIcon:""
            },
            //每次组件初始化都会赋上唯一的key
            KEYS:{
                ROOTDOM:tool._idSeed.newId(),
                hourDomKey:tool._idSeed.newId(),
                minDomKey:tool._idSeed.newId(),
                secDomKey:tool._idSeed.newId(),
                timeKey:tool._idSeed.newId(),
                timeInputDomKey:tool._idSeed.newId(),
                timePanelDomKey:tool._idSeed.newId(),
                clearTimeDomKey:tool._idSeed.newId()
            },
            //计算滚动时候的下个位置的li的索引
            nextSelect:0,
            timeStr:"",
            formLabelWidth:"0"
        }
    },
    computed:{
        __DatetimePickerKey(){
            if(this.DatetimePickerKey){
                return this.DatetimePickerKey;
            }
            return this.timeKey;
        },
        labelWidthVal(){
            if(this.$attrs.labelWidth){
                return this.$attrs.labelWidth;
            }
            if(this.formLabelWidth != 0){
                return this.formLabelWidth;
            }
            return define.LABELWIDTH;
        },
        placeholderStr(){
            if(this.$attrs.placeholder){
                return this.$attrs.placeholder;
            }
            return define.PLACEHOLDER.TIME;
        },
        readonlyFlag(){
            if(this.readonly == undefined){
                return false;
            }
            if(this.readonly === ""){
                return true;
            }
            if(this.readonly === false){
                return false;
            }
            return true;
        },
        showClear(){
            if(this.isDatetimePicker != undefined){
                return false;
            }
            if(this.readonlyFlag){
                return false;
            }
            if(this.timeStr && this.timeStr.length >0){
                return true;
            }
            return false;
        },
    },
    watch:{
        value(val){
            this.setValue(val);
        }
    },
    methods:{
        //确定
        ok(){
            let res = [];
            this.getJQDom(this.KEYS.timePanelDomKey).find("li.active").each((idx,el) => {
                res.push(el.innerText);
            });
            let result = res.join(':');
            this.getJQDom(this.KEYS.timePanelDomKey).hide();
            this.$emit("input",result);
            this.$emit("change",result);
            this.timeStr = result;
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        },
        //关闭
        closePicker(){
            this.getJQDom(this.KEYS.timePanelDomKey).hide();
        },
        //显示选择层,并且滚动
        open(){
            if(this.readonlyFlag){
                return;
            }
            this.getJQDom(this.KEYS.timePanelDomKey).show();
            let index = this.getCurrentHMSIndex();
            this.getJQDom(this.KEYS.hourDomKey).scrollTop(index[0]*30);
            this.getJQDom(this.KEYS.minDomKey).scrollTop(index[1]*30);
            this.getJQDom(this.KEYS.secDomKey).scrollTop(index[2]*30);
        },
        //3个ul的滚动事件
        scrollFun(dom){
            let sHeight = $(dom).scrollTop();
            let curSelectLi =Math.floor(sHeight / 30) ;
            let yu = sHeight % 30;
            if(curSelectLi == 0){
                if(yu <10){
                   this. nextSelect = 0;
                 }else{
                    this.nextSelect = 1;
                }
            }else if( curSelectLi > 0){ //当余数刚好为0的时候，则选中下一个，否则选中上一个
                if(yu > 10){
                    this.nextSelect = curSelectLi + 1;
                }else{
                    this.nextSelect = curSelectLi;
                }
            }else{
                this.nextSelect = 0;
            };
            let nextDom = $(dom).children('li')[this.nextSelect];
            $(nextDom).addClass('active').siblings().removeClass('active');
        },
        //设置值
        setValue(str){
            //给dom赋值
            // str?this.getJQDom(this.KEYS.timeInputDomKey).val(str):this.getJQDom(this.KEYS.timeInputDomKey).val("");
            str?this.timeStr = str:this.timeStr="";

            let hourDom = $("div [name="+this.KEYS.hourDomKey+"]");
            let minDom = $("div [name="+this.KEYS.minDomKey+"]");
            let secDom = $("div [name="+this.KEYS.secDomKey+"]");

            if(!str){
                let h = new Date().getHours()>=10?new Date().getHours():"0"+new Date().getHours();
                let m = new Date().getMinutes()>=10?new Date().getMinutes():"0"+new Date().getMinutes();
                let s = new Date().getSeconds()>=10?new Date().getSeconds():"0"+new Date().getSeconds();
                str = h + ":" + m + ":" + s;
            }
            let currentHour = str.split(':')[0];
            let currentMin = str.split(':')[1];
            let currentSec = str.split(':')[2];
            //小时
            let hourHtml = "";
            for(let i =0;i<24;i++){
                let tmp = i<10?"0"+i:i;
                if(i == currentHour){
                    hourHtml += "<li class='active'>"+ tmp +"</li>";
                }else{
                    hourHtml += "<li>"+ tmp +"</li>";
                }
            }
            //分钟
            let minHtml = "";
            for(let i =0;i<60;i++){
                let tmp = i<10?"0"+i:i;
                if( i == currentMin){
                    minHtml += "<li class='active'>"+tmp+"</li>";
                }else{
                    minHtml += "<li>"+ tmp +"</li>";
                }
            }
            //秒
            let secHtml = "";
            for(let i =0;i<60;i++){
                let tmp = i<10?"0"+i:i;
                if( i == currentSec){
                    secHtml += "<li class='active'>"+ tmp +"</li>";
                }else{
                    secHtml += "<li>"+ tmp +"</li>";
                }
            }
            $(hourDom).html($(hourHtml));
            $(minDom).html($(minHtml));
            $(secDom).html($(secHtml));
        },
        //获取值
        getValue(){
            return this.timeStr;
            // return this.getJQDom(this.KEYS.timeInputDomKey).val();
        },
        //获取当前的时分秒索引
        getCurrentHMSIndex(){
            let res = this.getValue();
            if(!res){
                let h = new Date().getHours()>=10?new Date().getHours():"0"+new Date().getHours();
                let m = new Date().getMinutes()>=10?new Date().getMinutes():"0"+new Date().getMinutes();
                let s = new Date().getSeconds()>=10?new Date().getSeconds():"0"+new Date().getSeconds();
                return [parseInt(h),parseInt(m),parseInt(s)];
            }
            return [parseInt(res.split(':')[0]),parseInt(res.split(':')[1]),parseInt(res.split(':')[2])];
        },
        //获取jq对象
        getJQDom(key){
            return $("div [name="+key+"]");
        },
        clear(){
            if(this.readonlyFlag){
                return;
            }
            this.$emit("input","");
            this.$emit("change","");
            window.setTimeout(()=>{
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            },0)
        },
        //时间点击选中
        clickSelectTiem(dom){
            $(dom).on("click","li",function(e){
                let houtTop = $(this)[0].offsetTop;
                let scrollTop = (houtTop - 80) / 30 * 30;
                $(dom).scrollTop(scrollTop);
                e.stopPropagation();
            });
        }
    },
    created(){
        let that = this;
        tool._form_event_publisher.on(that._uid,(data)=>{
            this.formLabelWidth = data;
        });
    },
    mounted(){
        if(this.isDatetimePicker == undefined){
            this.setValue(this.value);
        }
        //为3个ul添加滚动事件
        $(this.getJQDom(this.KEYS.hourDomKey)).off("scroll").on("scroll",e=>{
            this.scrollFun(e.target);
        })
        $(this.getJQDom(this.KEYS.minDomKey)).off("scroll").on("scroll",e=>{
            this.scrollFun(e.target);
        })
        $(this.getJQDom(this.KEYS.secDomKey)).off("scroll").on("scroll",e=>{
            this.scrollFun(e.target);
        })

        let hourDom = $("div [name="+this.KEYS.hourDomKey+"]");
        let minDom = $("div [name="+this.KEYS.minDomKey+"]");
        let secDom = $("div [name="+this.KEYS.secDomKey+"]");
        this.clickSelectTiem(hourDom);
        this.clickSelectTiem(minDom);
        this.clickSelectTiem(secDom);
    },
    beforeDestroy(){
        $(this.getJQDom(this.KEYS.hourDomKey)).off("scroll");
        $(this.getJQDom(this.KEYS.minDomKey)).off("scroll");
        $(this.getJQDom(this.KEYS.secDomKey)).off("scroll");

        $(this.getJQDom(this.KEYS.hourDomKey)).off("click");
        $(this.getJQDom(this.KEYS.minDomKey)).off("click");
        $(this.getJQDom(this.KEYS.secDomKey)).off("click");
    }
}
</script>

<style scoped> 
ul,li{padding:0; margin: 0; list-style: none}
li{height: 32px; line-height: 32px}
.timeContent{height: auto; display: flex; margin: 5px 20px; position: relative;}
.timeContent .searchBar{ width:100%;height: 40px;position: relative; cursor: pointer;}
.timeContent .searchBar i{ position: absolute;top: 12px;color: #c0c4cc; font-weight: normal;}
.timeContent .searchBar .clock{left:10px; }
.timeContent .searchBar .clearTime{ right: 8px;position: absolute; top: 12px;color: #c0c4cc; cursor: pointer;}
.timeContent .timeInput{ 
    -webkit-appearance: none; 
    background-color: #fff; 
    background-image: none; 
    border-radius: 4px;
    border: 1px solid #dcdfe6; 
    box-sizing: border-box; 
    color: #606266;
    display: inline-block; 
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 26px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1); width:100%;
    text-align: left; 
}

.timeContent .timeInput.readonlyIcon{
    background-color: #f1f1f1;
}

.timeContent .timePicker{ 
    display: none;
    width: 199px;
    height: auto;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); border-radius: 2px;
    position: absolute;
    left: 0;
    z-index: 1000; 
    user-select: none; 
    box-sizing: content-box; 
    margin-top:3px;
}
.timeContent .timePicker .timePanel{ height: 190px;margin: 0 auto;overflow: hidden;position: relative; }
.timeContent .timePicker .timePanel::before{ 
    content: "";
    top: 41%;
    position: absolute;
    height: 32px;
    z-index: -1;
    left: 0;
    right: 0;
    box-sizing: border-box; 
    padding-top: 6px;
    text-align: left;
    border-top: 1px solid #e4e7ed; 
    border-bottom: 1px solid #e4e7ed;
    padding: 0;
}
.timeContent .timePicker .timePanel div{ 
    height: 100%;
    float: left;
    text-align: center;
    color: #606266; 
    font-weight: normal; 
    font-size: 14px; 
    width: 32%;
}
.timePicker .timePanel div li{width: 60px; height: 30px; line-height: 30px; text-align: center; color: #606266;}
.timeContent .timePicker .timePanel div ul::before{ content: "";display: block;width: 100%;height: 80px; }
.timeContent .timePicker .timePanel div ul::after{ content: "";display: block;width: 100%;height: 80px; }
.timeContent .timePicker .timePanel div ul{ height: 100%;overflow-y: scroll;}
.timeContent .timePicker .timePanel div ul::-webkit-scrollbar{ width: 0px;height: 10px;background-color:transparent;}
.timeContent .timePicker .timePanel div ul /deep/ li{ width: 60px;height: 30px;line-height: 30px;text-align: center;color: #606266; }
.timeContent .timePicker .timePanel div ul /deep/ li.active{color:#409eff; }
.timeContent .timePicker .timePanel div ul /deep/ li:hover{background-color:#f0efef;}
.timeContent .timePicker .timeBtnGroup{ height: 36px;line-height: 36px;margin: 0 auto;border-top:1px solid #e4e7ed;text-align: right; }
.timeContent .timePicker .timeBtnGroup span{ width: 46px;height: 100%;font-size: 12px;
    text-align: center;background-color: transparent; border: none;
    outline: none;
    cursor: pointer;
    padding: 0 5px; 
}
.timeContent #confirm{ color:#409eff;}
.timeContent .active{color: #409eff !important; font-size: 16px;} 
.timeButtom{text-align: right; width:100%;height:40px;border-top:1px solid #f2f2f2; margin-top:2px;}
.form-item{ text-align: left; margin:0 0 22px 0;}
.form-item .form-item-label{ height: auto;
    text-align: right; 
    vertical-align: middle; 
    display: inline-block; 
    font-size: 14px;
    color: #606266; 
    line-height: normal; 
    padding: 0;
    box-sizing: border-box; 
    margin: 0 5px 0 10px;
}
.medium .form-item .form-item-label{ line-height: normal;font-size: 14px;}
.form-item .form-item-div{min-width: 130px;flex: 1; display: inline-block; line-height: normal; width:100%; vertical-align: middle; position: relative;}
.required::before{ content: "*"; color: #f56c6c; font-size: 12px; margin-right: 2px;}
.form-item .form-item-input{
    width: 100%;
    height: 40px;
    font-size: 14px; 
    line-height: 40px;
    display: inline-block; 
    border: 1px solid #dcdfe6; 
    border-radius: 5px; 
    padding: 0 8% 0 4%; 
    color: #606266;
    outline: none; 
}
.form-item .form-item-input:focus{border: 1px solid #409eff;outline: none; }
.fa-check-circle-o .timeInput{ border: 1px solid #67c23a;}
.fa-times-circle-o .timeInput{ border: 1px solid #f56c6c;}
.picker-header .ipt .form-item .form-item-label{ display: none;}
.picker-header .medium .ipt .form-item .form-item-label{ display: none;}
.ipt .form-item .form-item-div{ width:100%;}
.ipt .timeContent .timeInput{ text-align: center} 
.timeContent .timeInput:focus{border: 1px solid #409eff;}
</style>

 