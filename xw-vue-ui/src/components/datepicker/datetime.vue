<template>
    <div class = "form-item current">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>
        <div class = "form-item-div dataTimePicker" :class="state.successIcon" :_body_tag="dateTimeKey" v-bodyClick="closeDateTimePicker">
            <!-- 日期 -->
            <i class="icon-date fa fa-calendar"></i>
            <div class = "date-box">
                <!-- 展示文字的地方 -->
                <!-- <div class = "dateTimeText" :_body_tag="dateKey" :class="{readonlyIcon:readonlyFlag}" @click.stop="showDateTimePickerHandle" >
                    {{dateTimeStr}}
                </div> -->
                <input @blur="blurdate($event)" :placeholder="placeholderStr" class = "dateTimeText" :_body_tag="dateTimeKey" :readonly="true" :class="{readonlyIcon:readonlyFlag}" @click="showDateTimePickerHandle" v-model='dateTimeStr'/>
                <!-- 展开日期下拉 -->
                <div class="picker-box" v-show="showDateTimePicker">
                    <div class="picker-header" style = "height:272px;">
                        <div class = "ipt" >
                            <le-date-picker :splitKey="splitStr" :ref='dateKey' is-datetime-picker :datetime-picker-key="dateTimeKey"></le-date-picker>
                        </div>
                        <div class = "ipt" style = "margin-left:10px;">
                            <le-time-picker :ref='timeKey' is-datetime-picker :datetime-picker-key="dateTimeKey"></le-time-picker>
                        </div>
                    </div>
                    <div @click.stop class="picker-bottom" style="border-top:1px solid #f2f2f2;background:#fff;height:40px;margin-top:10px">
                        <span @click.stop="getDateTimeStr">Confirm</span>
                        <span class="text" @click.stop="getNow">Now</span>
                        <span class="text" @click.stop="clear">Clear</span>
                        <div style="clear:both;"></div>
                    </div>
                </div>
            </div>
            <!-- 时间 -->
            <i v-show="showClear" class="fa fa-times-circle clearTime" @click="clear"></i>
            <p class="promptMsg" v-show="state.showError">{{msg}}</p>
            <p class="tip" v-show="!state.showError">{{$attrs.tip}}</p>
        </div>
    </div>
</template>
<script>

import LeDatePicker from "./date.vue";
import LeTimePicker from "./time.vue";
import define from "../define.js";
import tool from "../leCompsTool.js";

export default {
    name:"LeDateTimePicker",
    props:["msg","value","readonly","splitKey"],
    components: {LeDatePicker,LeTimePicker},
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data(){
        return {
            validataComponentType:"DateTimePicker",
            dateTimeKey:tool._idSeed.newId(),
            dateKey:tool._idSeed.newId(),
            timeKey:tool._idSeed.newId(),
            dateTimeStr:"",
            showDateTimePicker:false,
            state:{
                showError:false,
                successIcon:''
            },
            formLabelWidth:"0"
        }
    },
    computed:{
        labelWidthVal(){
            if(this.$attrs.labelWidth){
                return this.$attrs.labelWidth;
            }
            if(this.formLabelWidth != 0){
                return this.formLabelWidth;
            }
            return define.LABELWIDTH;
        },
        splitStr(){
            // if(!this.splitKey){
            //     return "/";
            // }
            // return this.splitKey;
            return "-";
        },
        placeholderStr(){
            if(this.$attrs.placeholder){
                return this.$attrs.placeholder;
            }
            return define.PLACEHOLDER.DATETIME;
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
            if(this.dateTimeStr && this.dateTimeStr.length >0){
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
        checkDateTime(str){
            if(!str){
                return false;
            }
            if(str.indexOf(' ') == -1){
                return false;
            }
            let date = str.split(' ')[0];
            let time = str.split(' ')[1];

            var date_expression = /^\d{4}\/\d{2}\/\d{2}$/ ;
            var time_expression = /^(?:[01]\d|2[0-3])(?::[0-5]\d){2}$/;
            let data_flag = date_expression.test(date);
            let time_flag = time_expression.test(time);
            if(data_flag && time_flag){
                return true;
            } 
            return false;
        },
        blurdate(e){
            let value = e.target.value;
            if(value){
                this.checkDateTime(value)?this.setValue(value):this.setValue("");
                this.$emit("input",this.dateTimeStr);
            }
        },
        getDateTimeStr(){
            let dateComp = this.$refs[this.dateKey];
            let timeComp = this.$refs[this.timeKey];
            let dataStr = dateComp.getValue();
            let timeStr = timeComp.getValue();
            if(!dataStr || !timeStr){
                this.dateTimeStr =  "";
            }else{
                this.dateTimeStr = dataStr + " " + timeStr;
            }
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
            dateComp.closePicker();
            timeComp.closePicker();
            this.showDateTimePicker = false;
            this.$emit("input",this.dateTimeStr);
            
            this.$emit("change",this.dateTimeStr);
        },
        showDateTimePickerHandle(){
            if(this.readonlyFlag){
                return;
            }
            this.showDateTimePicker = true;
            this.$refs[this.dateKey].showPicker();
        },
        clear(){
            if(this.readonlyFlag){
                return;
            }
            this.showDateTimePicker = false;
            this.$emit("input","");
            this.$emit("change","");
            window.setTimeout(()=>{
                if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    this.$attrs.setVerifyCompState();
                }
            },0)
        },
        initDateAndTime(){
            let y = new Date().getFullYear();
            let m = parseInt(new Date().getMonth() + 1)>10?(new Date().getMonth() + 1):"0"+(new Date().getMonth() + 1);
            let d = parseInt(new Date().getDate())>10?(new Date().getDate()):"0"+(new Date().getDate());
            let hh = new Date().getHours()>=10?new Date().getHours():"0"+new Date().getHours();
            let mm = new Date().getMinutes()>=10?new Date().getMinutes():"0"+new Date().getMinutes();
            let ss = new Date().getSeconds()>=10?new Date().getSeconds():"0"+new Date().getSeconds();
            this.$refs[this.dateKey].setValue(y + this.splitStr + m + this.splitStr + d);
            this.$refs[this.timeKey].setValue(hh + ":" + mm + ":" + ss);
        },
        getNow(){
            this.initDateAndTime();
            this.getDateTimeStr();
        },
        getValue(){
            return this.dateTimeStr;
        },
        setValue(str){
            if(!str){
                this.initDateAndTime();
                this.dateTimeStr = "";
            }else{
                this.dateTimeStr = str;
                this.$refs[this.dateKey].setValue(str.split(' ')[0]);
                this.$refs[this.timeKey].setValue(str.split(' ')[1]);
            }
        },
        closeDateTimePicker(){
            this.showDateTimePicker = false;
        }
    },
    created(){
        let that = this;
        tool._form_event_publisher.on(that._uid,(data)=>{
            this.formLabelWidth = data;
        });
    },
    mounted(){
        this.setValue(this.value);
    },
    beforeDestroy(){
    }
}   
</script>
<style scoped> 

.dataTimePicker{
    display:inline-block; 
    width: 180px;
    height: auto; 
    box-sizing: border-box; 
    position:relative;
}
.current .dataTimePicker{
    box-sizing: content-box;
    display: inline-block; 
}
.dataTimePicker .date-box,.dataTimePicker .time-box{ 
    width: 120px;
    height: 40px;
    cursor: pointer;
    float: left; 
}
.dataTimePicker .date-box .dateTimeText{ 
    background-color: #fff; background-image: none;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1); width: 100%;
    padding: 0 32px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
}

.dataTimePicker .date-box .dateTimeText:focus{
    border:1px solid #409EFF;
}

.fa-times-circle-o.dataTimePicker .date-box .dateTimeText{
    border:1px solid #f56c6c;
}

.dataTimePicker .date-box .dateTimeText.readonlyIcon{
    background-color: #f1f1f1;
}

.dataTimePicker .date-box{width: 100%;}
.icon-date{position: absolute; top: 12px;left: 10px;color: #c0c4cc; font-weight: normal;} 
.clearTime{position: absolute; top: 12px;right: 8px;color: #c0c4cc; font-weight: normal; cursor: pointer;}
.dataTimePicker /deep/ .dataPicker .picker-box{ left: 0;}
.ipt .form-item /deep/ .form-item-div .form-item-input{ text-align: center;cursor: pointer;}
.form-item /deep/ .form-item-div.dataPicker{ width: 100%;}
/* ⽇日期 */
.picker-box {
    width: 330px;
    box-sizing: border-box;
    position: absolute;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 10000;
    margin-bottom: 30px; 
}
/* 选择器器头部 */ 
.picker-header { width: 100%;line-height: 1.8em; display:flex;}
.picker-header .ipt{display: inline-block; width: 50%;margin: 10px; margin-left: 0px; position: relative; margin-right: 0;}
.picker-bottom span{ 
    float:right;
    margin-right:10px;
    font-size:12px;
    line-height:20px;
    margin-top:10px;
    background:#fff; 
    outline: none;
    border:1px solid #dcdfe6;
    border-radius:3px;
    padding: 0 5px;
}
.picker-bottom span.text{border:0px solid #fff; color:#409EFF;}
.form-item{text-align: left; margin:0 0 22px 0; display:flex;}
.form-item .form-item-label{ 
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
.form-item .form-item-div{min-width: 130px; display: inline-block; line-height: normal; width: 100%; vertical-align: middle;}
form .form-item .form-item-div{ background-color: #fff;flex: 1;}
form .form-item .form-item-div.readonlyIcon{background-color: #f1f1f1;}
.required::before{ content: "*"; color: #f56c6c; font-size: 12px; margin-right: 2px;}
.form-item .form-item-input{ 
    width: 100%;
    height: 40px;
    font-size: 14px; line-height: 40px;
    display: inline-block; border: 1px solid #dcdfe6; border-radius: 5px; padding: 0 8% 0 4%; color: #606266;
    outline: none; 
}
.form-item .form-item-input:focus{ border: 1px solid #409eff; outline: none;}
.medium .form-item .form-item-input{height: 40px; line-height: 40px; font-size: 14px;}
.form-item .promptMsg{
    margin: 0 auto; 
    font-size: 12px; 
    color: #f56c6c; 
    line-height: 20px; 
    text-align: left; 
    position: absolute; 
    top: 42px;
    left: -1px; 
}
.form-item .tip{
    margin: 0 auto;
    font-size: 12px;
    color: #3ea5d2;
    line-height: 20px;
    text-align: left; 
    position: absolute; 
    top: 42px;
    left: -1px; 
}
.fa-check-circle-o.dataTimePicker{ border: 1px solid #67c23a;}
.dataTimePicker .ipt /deep/  .timeContent .timeInput{border-color: #dcdfe6 !important;}
.fa-times-circle-o:before{ content:'';}
.fa-check-circle-o:before{ content:'';}
.picker-header .ipt .form-item{ width: 100%;}
.dataTimePicker .medium .form-item .form-item-input{ width: 100%;border: 1px solid yellowgreen;} 
.fa-times-circle-o .ipt .form-item /deep/ .form-item-input{border:1px solid #dcdfe6 !important;}
.dataTimePicker /deep/ .timeContent .timePicker{right: 2px !important;left: auto;}

</style>
