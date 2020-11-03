

<template>
    <div class="form-item" >
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="on != undefined?'required':''">{{label}}</label>
        <div class="form-item-div dataPicker" :isDatetimePicker="isDatetimePicker" :_body_tag="__DatetimePickerKey" v-bodyClick="closePicker" :class="{ 'fa-times-circle-o': state.showError }" style="display:inline-block;position:relative;">
            <!-- 添加current激活input current样式  去掉则是默认样式 -->
            <div class="div-box current" >
                <i class="icon-date fa fa-calendar"></i>
                <input @blur="blurdate($event)" :placeholder="placeholder" :isDatetimePicker="isDatetimePicker" type="text" :class="{readonlyIcon:readonlyFlag}" class="form-item-input date" :readonly="true" :value="selectDayStr" :_body_tag="__DatetimePickerKey" @click="showPicker"/>
                <i v-show="showClear" class="fa fa-times-circle icon-del" @click.stop="clear"></i>
                <p class="promptMsg" @click.stop v-show="state.showError">{{state.errorMsg}}</p>
                <p class="tip" @click.stop v-show="!state.showError">{{tip}}</p>
            </div>
            <!-- 展开下拉 -->
            <div class="picker-box" v-show="isShowPicker" @click.stop>
                <div class="picker-header">
                    <span>
                        <i class="fa fa-angle-double-left" @click.stop="prevYear"></i>
                    </span>
                    <span>
                        <i class="fa fa-angle-left" @click.stop="prevMonth"></i>
                    </span>
                    <div class="hearderText">
                        {{current.currentYear}}/{{current.currentMonth}}
                    </div>
                    <span>
                        <i class="fa fa-angle-right" @click.stop="nextMonth"></i>
                    </span>
                    <span>
                        <i class="fa fa-angle-double-right" @click.stop="nextYear"></i>
                    </span>
                </div>
                <div class="picker-body">
                    <table>
                        <tr>
                            <th v-for="(item,index) in Weeks" :key="index">{{item}}</th>
                        </tr>
                        
                        <tr v-for="(item,index) in data" :key="index">
                            <td :class="x.cls" v-for="(x,idx) in item" :key="idx" @click.stop="selectItem(x)">{{x?x.day:""}}</td>
                        </tr>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

let _tool = {
    /**
     * @description 根据年月获取当前月有多少天
     * @param year:年份
     * @param month:月份
     * @returns 天数:int
     */
    getDays(year,month){
        let date = new Date(year,month,0);
        return date.getDate();
    },
    /**
     * @description 根据年月获取当前月的第一天是星期几
     * @param year:年份
     * @param month:月份
     * @returns 第一天是周几:int
     */
    getWeek(year,month){
        let str = year + "  " + month + "/" + "01";
        let data = new Date(str);
        return data.getDay();
    },
    /**
     * @description 根据当前月份的总天数
     * @param year:年份
     * @param month:月份
     * @returns days:int
     */
    getCurrentDays(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        return _tool.getDays(year,month);
    },
    /**
     * @description 根据月份获取上个月的年月日数据
     * @param year:年份
     * @param month:月份
     * @returns json:{year:0,month:0,days:0}
     */
    getPrevMonthDays(year,month){
        let res = {year:0,month:0,days:0};
        if(month == 1){
            res.year = parseInt(year) - 1;
            res.month = 12;
            res.days = this.getDays(res.year,res.month);
        }else{
            res.year = year;
            res.month = parseInt(month) - 1;
            res.days = this.getDays(res.year,res.month);
        }
        return res;
    },
    /**
     * @description 根据月份获取下个月的年月日数据
     * @param year:年份
     * @param month:月份
     * @returns json:{year:0,month:0,days:0}
     */
    getNextMonthDays(year,month){
        let res = {year:0,month:0,days:0};
        if(month == 12){
            res.year = parseInt(year) + 1;
            res.month = 1;
            res.days = this.getDays(res.year,res.month);
        }else{
            res.year = year;
            res.month = parseInt(month) + 1;
            res.days = this.getDays(res.year,res.month);
        }
        return res;
    },
    
    /**
     * @description 数组分组
     * @param data:42个数据源，分为6个数组
     * @returns Array
     */
    groupArray(data){
        let res = [];
        for(let i=0;i<6;i++){
            let tmp = [];
            for(let k=0;k<7;k++){
                tmp.push(data[i*7 + k]);
            }
            res.push(tmp);
        }
        return res;
    }
}

import Constant from "../contant/index.js";
import { $idSeed,$util,$obj } from "../leCompsTool.js";

/**
 * @description 日期格式  6(row)*7(col)
 * @param current.currentYear, current.currentMonth, current.currentDay控制picker弹出层的年和月的选择
 * @param selectDay控制所选择的值，也就是文本框里面的值
 * @param 这2者不可以统一用state里面的值来标识
 * @param isShowPicker控制是否显示弹出层
 * @param data:Array 根据年月日来组合需要的数据源，该数据源必须分组，也就是必须调用setPickerDateSource方法
 */

export default {
    name:"LeDatePicker",
    inject: ["leForm"],
    props: {
        isDatetimePicker: {
            type: Boolean | String
        },
        DatetimePickerKey: {
            type: String | Number
        },
        value: {
            type: String
        },
        readonly: {
            type: Boolean | String,
            default: false,
        },
        labelWidth: {
            type: Number | String,
        },
        placeholder: {
            type: String,
            default: Constant.DATE_PICKER.DATE.PLACEHOLDER
        },
        on: {
            type: Boolean | String,
            default: false,
        },
        label: {
            type: String
        },
        msg: {
            type: String
        },
        tip: {
            type: String
        },
        required: {
            type: String | Boolean,
            default: false
        }
    },
    data(){
        return {
            state: {
                showError: false,
                errorMsg: "",
            },
            componentKey: $idSeed.newId(),
            current:{
                currentYear:new Date().getFullYear(),
                currentMonth:new Date().getMonth() + 1,
                currentDay:new Date().getDate(),
            },
            data:[],
            selectDay:"",
            isShowPicker:false
        }
    },
    watch:{
        value(val){
            this.setValue(val);
        },
        data(val){
            
        }
    },
    computed:{
        __DatetimePickerKey(){
            return this.DatetimePickerKey || this.componentKey;
        },
        splitStr(){
            return "-";
        },
        labelWidthVal(){
            return (
                this.labelWidth ||
                this.leForm.labelWidth ||
                Constant.DATE_PICKER.DATE.LABEL_WIDTH
            );
            // if(this.$attrs.labelWidth){
            //     return this.$attrs.labelWidth;
            // }
            // if(this.formLabelWidth != 0){
            //     return this.formLabelWidth;
            // }
            // return Constant.DATE_PICKER.DATE.LABEL_WIDTH;
        },
        Weeks(){
            return Constant.DATE_PICKER.DATE_TIME_PICKER_CONFIG.WEEK;
        },
        selectDayStr(){
            if(this.selectDay == ""){
                return "";
            }
            let tmp = this.selectDay.split(this.splitStr);
            let y = tmp[0];
            let m = parseInt(tmp[1]);
            let d = parseInt(tmp[2]);
            m = m<10?"0"+m:m;
            d = d<10?"0"+d:d;
            return y + this.splitStr + m + this.splitStr + d;
        },
        readonlyFlag(){
            if (this.readonly === "" || this.readonly) {
                return true;
            }
            return false;
        },
        showClear(){
            if(this.isDatetimePicker != undefined){
                return false;
            }
            if(this.readonlyFlag){
                return false;
            }
            if(this.selectDayStr.length >0){
                return true;
            }
            return false;
        },
    },
    methods:{
        checkDate(str){
            if(!str){
                return false;
            }
            var expression = /^\d{4}-\d{2}-\d{2}$/;
            let objExp = new RegExp(expression);
            return objExp.test(str);
        },
        blurdate(e){
            let value = e.target.value;
            if(value){
                this.checkDate(value)?this.setValue(value):this.setValue("");
                this.$emit("input",this.selectDayStr);
            }
        },
        /**
         * @description 组装日历面板上面的 6*7 = 42天所有数据源, datepicker组件最核心的渲染方法
         * @param year:年份
         * @param month:月份
         * @returns Array[]
         */
        getFullData(year,month){
            let res = [];
            //获取当前月第一天是周几
            let week = _tool.getWeek(year,month);
            //获取当前月一起多少天
            let currentDays = _tool.getDays(year,month);
            //上个月的数据条数
            let prevDaylen = week;
            //获取上一个月有多少天
            let prevMonthDays = _tool.getPrevMonthDays(year,month);
            
            let allData = [];
            //push上个月填充的数据
            for(let i = prevDaylen;i>0;i--){
                allData.push({year:prevMonthDays.year,month:prevMonthDays.month,day:prevMonthDays.days - i + 1,cls:"disable"});
            }
            //push当前月填充的数据，控制选中日期的样式，分为2种情况
            //如果还没有选择日期
            let tmp = {y:0,m:0,d:0};
            if(this.selectDay == ""){
                tmp = {y:new Date().getFullYear(),m:new Date().getMonth() + 1,d:new Date().getDate()};
            }
            //如果选择了日期
            else{
                let _arr = this.selectDay.split(this.splitStr);
                tmp = {y:_arr[0],m:_arr[1],d:_arr[2]};
            }
            for(let i=1;i<=currentDays;i++){
                if(i == tmp.d && year == tmp.y && month == tmp.m){
                    allData.push({year:year,month:month,day:i,cls:"current"});
                }else{
                    allData.push({year:year,month:month,day:i,cls:""});
                }
            }
            
            //push下个月剩余的数据
            let nextDaysLen = 42 - (prevDaylen + currentDays);
            let nextMonthDays = _tool.getNextMonthDays(year,month);
            for(let i = 1;i<=nextDaysLen;i++){
                allData.push({year:nextMonthDays.year,month:nextMonthDays.month,day:i,cls:"disable"});
            }
            return allData;
        },
        /**
         * @description 根据年份，月份 初始化日期控件数据源
         * @param year:年份
         * @param month:月份
         * @returns
         */
        setPickerDateSource(year,month){
            let days = this.getFullData(year,month);
            this.data = _tool.groupArray(days);
        },
        /**
         * @description 清空值，并且带验证效果
         * @returns
         */
        clear(){
            if(this.readonlyFlag){
                return;
            }
            this.$emit("input","");
            this.$emit("change","");
            // form check
            this.leForm.verifySubComponentAfterEmit(this);
        },
        /**
         * @description 点击文本框显示picker选择层, 每次点击根据选中的日期来复位
         * @returns
         */
        showPicker(){
            if(this.readonlyFlag){
                return;
            }
            this.isShowPicker = true;
            this.selectDay?this.setValue(this.selectDayStr):this.setValue();
        },
        /**
         * @description 关闭选择层
         * @returns
         */
        closePicker(){
            this.isShowPicker = false;
        },
        /**
         * @description 日期弹出层选中事件
         * @param x:当前选中项，{year:0,month:0,day:0,cls:""}
         * @returns
         */
        selectItem(x){
            this.data.forEach(arr => {
                arr.forEach(element=>{
                    if(element.cls == "current"){
                        if(element.month == this.current.currentMonth){
                            element.cls = "";
                        }else{
                            element.cls = "disable";
                        }
                    }
                })
            });
            x.cls = "current";
            this.current.currentDay = x.day;
            this.selectDay = x.year + this.splitStr + x.month + this.splitStr + x.day;
            if(this.isDatetimePicker == undefined){
                this.isShowPicker = false;
            }
            this.state.showError = false;

            // form check
            this.leForm.verifySubComponentAfterEmit(this);

            this.$emit("input",this.selectDayStr);
            this.$emit("change",this.selectDayStr);
        },
        /**
         * @description 上一年切换事件
         * @returns
         */
        prevYear(){
            let year = parseInt(this.current.currentYear) - 1;
            let month = parseInt(this.current.currentMonth);
            this.current.currentYear = year;
            this.current.currentMonth = month;
            
            this.setPickerDateSource(year,month);
            this.$emit("prevYearChange",year,month,this.selectDayStr);
        },
        /**
         * @description 下一年切换事件
         * @returns
         */
        nextYear(){
            let year = parseInt(this.current.currentYear) + 1;
            let month = parseInt(this.current.currentMonth);
            this.current.currentYear = year;
            this.current.currentMonth = month;
            this.setPickerDateSource(year,month);
            this.$emit("nextYearChange",year,month,this.selectDayStr);
        },
        /**
         * @description 上一月切换事件
         * @returns
         */
        prevMonth(){
            let year = parseInt(this.current.currentYear);
            let month = parseInt(this.current.currentMonth);
            if(month == 1){
                month = 12;
                year = year - 1;
            }else{
                month = month - 1;
            }
            this.current.currentYear = year;
            this.current.currentMonth = month;
            this.setPickerDateSource(year,month);
            this.$emit("prevMonthChange",year,month,this.selectDayStr);
        },
        /**
         * @description 下一月切换事件
         * @returns
         */
        nextMonth(){
            let year = parseInt(this.current.currentYear);
            let month = parseInt(this.current.currentMonth);
            if(month == 12){
                month = 1;
                year = year + 1;
            }else{
                month = month + 1;
            }
            this.current.currentYear = year;
            this.current.currentMonth = month;
            this.setPickerDateSource(year,month);
            this.$emit("nextMonthChange",year,month,this.selectDayStr);
        },
        /**
         * @description 设置当前值
         * @param str:字符串，2019-03-25格式
         * @returns
         */
        setValue(str){
            if(!str){
                this.current.currentYear = new Date().getFullYear();
                this.current.currentMonth = parseInt(new Date().getMonth() + 1);
                this.current.currentDay = parseInt(new Date().getDate());
                
                this.selectDay = "";
                this.setPickerDateSource(this.current.currentYear,this.current.currentMonth);
            }else{
                let _arr = str && str.split(this.splitStr);
                this.current.currentYear = _arr[0];
                this.current.currentMonth = parseInt(_arr[1]);
                this.current.currentDay = parseInt(_arr[2]);
                this.selectDay = str;
                this.setPickerDateSource(_arr[0],parseInt(_arr[1]),parseInt(_arr[2]));
            }
        },
        /**
         * @description 获取当前组件的值，为validataHOC准备
         * @returns str:字符串
         */
        getValue(){
            return this.selectDayStr;
        }
    },
    mounted(){
        if(this.isDatetimePicker == undefined){
            this.setValue(this.value);
        }
    },
    beforeDestroy () {
    }
}
</script>

 <style scoped> 
 *{
    margin: 0; padding: 0;
} 
body {
    height: 10000px; 
}
form .form-item .form-item-div .div-box { 
    width:100%;
    height: 40px;
    position: relative;
    cursor: pointer;
    display: inline-block; 
}
.div-box i {
    position: absolute; 
    top: 12px;
    color: #c0c4cc; 
    font-weight: normal; 
    cursor: pointer;
}
.div-box .icon-date{ 
    left:10px;
}
.div-box .icon-del {
    right:8px; 
}
.date {
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
    text-align: center; 
}
.picker-box {
    width: 330px;
    margin-top: 4px;
    position: absolute;
    background:#fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); 
    z-index:999
}
/* 选择器器头部 */ 
.picker-header {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #aeaeae; 
    line-height: 2em;
}
.picker-header .hearderText { 
    flex: 1;
    text-align: center; 
}
.picker-header span {
    padding-left: 5px; padding-right: 5px;
    border: 0;
    background-color: transparent; outline: none;
    cursor: pointer;
}
/* 选择器器部分 */ 
.picker-body {width: 100%;display: inline-block; }
.picker-body table { text-align: center; width: 100%; line-height: 26px}
.picker-body table th { text-align: center;font-size:14px;}
.picker-body table td { cursor: pointer}
.picker-body table td.disable { background: #f0f0f0 !important; color: #cbcbcb !important;}
.picker-body table td.current { background: #4fbba0 !important; color: #fff !important;}
.picker-body table td:hover { background: #f55;color: #fff;} 
.form-item{display: flex; text-align: left; margin:0 0 22px 0}
.form-item .form-item-label{ text-align: right; vertical-align: middle; display: inline-block; font-size: 14px;
    color: #606266; line-height: normal; padding: 0;
    box-sizing: border-box; margin: 0 5px 0 10px;
}
.medium .form-item .form-item-label{ line-height: normal;font-size: 14px;}
.small .form-item .form-item-label{height: 34px; line-height: 34px; font-size: 14px;}
.mini .form-item .form-item-label{height: 28px; line-height: 28px; font-size: 12p}
.form-item .form-item-div{ display: inline-block; line-height: normal; width: 100%;flex: 1;min-width: 130px;}
.required::before{ content: "*"; color: #f56c6c; font-size: 12px; margin-right: 2px}
.form-item .form-item-input{
    width: 100%;
    height: 40px;
    cursor: pointer;
    font-size: 14px; 
    line-height: 40px;
    display: inline-block; 
    border: 1px solid #dcdfe6; 
    border-radius: 5px; 
    padding:0 25px 0 25px; 
    color: #606266;
    outline: none;
    text-align: left; 
}
form .form-item .form-item-input{ padding: 0 26px;}
.form-item .form-item-input:focus{border: 1px solid #409eff;outline: none; }
.form-item .form-item-input.readonlyIcon:focus{border-color: #dcdfe6;}
.form-item .form-item-input.readonlyIcon{background-color: #f1f1f1;cursor: text;}
.fa-times-circle-o:before{ content:'';}
.fa-check-circle-o:before{ content:'';}
.picker-header .ipt .form-item .form-item-label{ display: none;}
.picker-header .medium .ipt .form-item .form-item-label{ display: none;} 
.fa-times-circle-o .timeInput .readonlyIcon {background-color: #f1f1f1;}
.fa-times-circle-o .form-item-input{
    border: 1px solid #f56c6c;
}
.fa-check-circle-o .form-item-input{ 
    border: 1px solid #67c23a;
}
</style>
