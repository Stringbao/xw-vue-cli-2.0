
<template>
    <div class="form-item">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>
        <div class="form-item-div fa" :class="state.successIcon">
            <span :class="{'readonlyIcon':readonlyFlag}" class="span" v-for="(item,index) in data" :key="index" @click="changeItem(item)">
                <span>{{item[displayName]}}</span>
                <span class="fa" :class="item.ck?'fa-check-square':'fa-square-o'"></span>
            </span>
            <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
            <p class="tip" v-show="!state.showError">{{$attrs.tip}}</p>
        </div>
    </div>
</template>

<script>

import tool from "../leCompsTool.js";
import define from "../define.js";

export default {
    name:"LeCheckboxList",
    props:["displayName","displayValue","value","dataSource","readonly"],
    inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
    data(){
        return {
            validataComponentType:"Checkbox",
            state:{
                successIcon:"",
                showError:false
            },
            data:[],
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
        }
    },
    watch:{
        value(val){
            this.setValue(val);
        },
        dataSource(val){
            if(val && Array.isArray(val)){
                this.init(val);
                this.setValue(this.value);
            }
        }
    },
    methods:{
        /**
         * @description 设置数据源，自动添加ck属性来控制是否选中状态
         * @returns
         */
        init(data){
            this.data = tool.object.cloneObj(tool.object.addPrimaryAndCk(data));
        },
        /**
         * @description checkbox的change事件 会触发checkboxList的change回调
         * @param item 当前的选中项
         * @returns
         */
        changeItem(item){
            if(this.readonlyFlag){
                return;
            }
            item.ck = !item.ck;
            let res = this.getCheckedItems();
            this.$emit('input',res.vals.join(','));
            this.$emit('change',res);
            if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                this.$attrs.setVerifyCompState();
            }
        },
        /**
         * @method
         * @description 传入displayValue的时候，返回对象，里面可直接取vals(为displayValue的数组)
         * @description 不传入displayValue，返回对象，里面可去items数组(为选中的项的集合)
         * @returns
         */
        getCheckedItems(){
            return tool.object.getCheckedItems(this.data,this.displayValue);
        },
        /**
         * @description 对外暴露getValue方法
         * @returns 类型:字符串,为兼容validataHOC，必须返回字符串
         */
        getValue(){
            let res = this.getCheckedItems().vals.join(',');
            return res;
        },
        /**
         * @description 回写的方法，设置checkbox选中状态
         * @param vals 必须为数组, 必须设置displayValue为需要传递的value字段，如果传入空，则重置所有
         * @return
         */
        setValue(vals = []){
            if(!vals){
                this.data.forEach(item=>{
                    item.ck = false;
                })
            }else{
                // vals = vals.toString();
                this.data.forEach(item=>{
                    let cked = false;
                    vals.split && vals.split(',').forEach(x=>{
                        if(item[this.displayValue].toString() == x.toString()){
                            cked = true;
                        }
                    })
                    if(cked){
                        item.ck = true;
                    }else{
                        item.ck = false;
                    }
                })
            }
        }
    },
    created(){
        let that = this;
        tool._form_event_publisher.on(that._uid,(data)=>{
            this.formLabelWidth = data;
        });
    },
    mounted(){
        if(this.dataSource && this.dataSource.length >0){
            this.init(this.dataSource);
        }
        this.setValue(this.value);
    }
}
</script>

<style scoped>
    .span{
        margin: 10px 20px;
        display: inline-block;
        margin-left: 0;
        cursor: pointer;
    }
    .span .fa{
        vertical-align: middle;
    }

    .form-item .form-item-div .readonlyIcon{
        color:#d3cfcf;
        background-color: #fff;
    }
</style>