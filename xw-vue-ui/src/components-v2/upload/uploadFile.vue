<template>
    <div class="form-item upaload">
        <div style="display: flex;">
            <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="on != undefined?'required':''">{{label}}</label>

            <div style="flex:1">
                <span :class="{'readonlyIcon':readonlyFlag}" class="input-file">Please select a file
                <input :disabled="readonlyFlag" :multiple="multipleTag" @change="change" type="file" :ref="fkey" class="imgFile" /></span>
                <img v-show="showLoading" src="//p3-nec.static.pub/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
                <span class="rules">{{tipStr}}</span>
                <div class="fileList" v-show="srcs.length>0">
                    <div v-if="noResultTag">
                        <span class="noResult">
                            <a>Upload successful</a>
                        </span>
                    </div>
                    <div v-else>
                        <div>
                            <span class="fileContent" v-for="(item,index) in srcs" :key="index">
                                <a target="_blank" :href="item.name">{{"attachment_" + item.idx}}</a>
                                <i v-show="!readonlyFlag" @click="removeItem(item)" class="fa fa-times"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <p class="promptMsg" v-show="state.showError">{{state.errorMsg}}</p>
            </div>
        </div>
    </div>
</template>

    
<script>
    import Constant from "../contant/index.js";
    import { $idSeed,$util,$obj,$event_publisher } from "../leCompsTool.js";
    // import Ajax from "../../tool/http.js";
    export default {
        components: {},
        props: {
            on: {
                type: Boolean | String,
                default: false,
            },
            label: {
                type: String
            },
            options: {
                type: Object 
            },
            value: {
                type: String 
            },
            readonly: {
                type: Boolean | String,
                default: false,
            },
            required :{
                type : Boolean | String,
                default :false 
            }
        },
        inject: {
            leForm:{
                default: ""
            }
        },
        name: "LeUploadFile",
        data(){
            return {
                validataComponentType:"FileUpload",
                fkey:$idSeed.newId(),
                showLoading:false,
                srcs:[],
                state: {
                    showError: false,
                    errorMsg: "",
                },
                formLabelWidth:"0"
            }
        },
        computed:{
            labelWidthVal() {
                return (
                    this.labelWidth || this.leForm.labelWidth || Constant.UPLOADFILE.LABEL_WIDTH
                );
            },
            readonlyFlag() {
                if (this.readonly === "" || this.readonly) {
                    return true;
                }
                return false;
            },

            tipStr(){
                return this.options.tip?this.options.tip:"";
            },
            multipleTag(){
                if(this.options.multiple!=undefined){
                    if(this.options.multiple === false){
                        return false;
                    }
                    return true;
                }
                return false;
            },
            noResultTag(){
                if(this.options.noResult != undefined){
                    if(this.options.noResult === false){
                        return false;
                    }
                    return true;
                }
                return false;
            },
            fname(){
                return this.options.fname;
            },
            url(){
                return this.options.url;
            },
            completedCallback(){
                return this.options.completedCallback;
            },
            vtype(){
                return this.options.vtype?this.options.vtype:"";
            },
            size(){
                if(this.options.size){
                    let re = /^[0-9]+.?[0-9]*$/;
                    if (!re.test(this.options.size)) {
                        return 0;
            　　     }
                    return parseFloat(this.options.size);
                }else{
                    return 0;
                }
            },
           
            fileType(){
                let _fileType = "";
                if(this.vtype){
                    if(this.vtype.indexOf('jpg') != -1 || this.vtype.indexOf('png') != -1 || this.vtype.indexOf('gif') != -1 || this.vtype.indexOf('icon') != -1){
                        _fileType = Constant.UPLOADFILETYPE.IMAGE;
                    }
                    if(this.vtype.indexOf('pdf') != -1){
                        _fileType = Constant.UPLOADFILE.PDF;
                    }
                    if(this.vtype.indexOf('doc') != -1 || this.vtype.indexOf('docx') != -1){
                        _fileType = Constant.UPLOADFILE.WORD;
                    }
                    if(this.vtype.indexOf('xls') != -1 || this.vtype.indexOf('xlsx') != -1){
                        _fileType = Constant.UPLOADFILE.EXCEL;
                    }
                }
                return _fileType;
            }
        },
        watch:{
            value(val){
                this.setValue(val);
            }
        },
        methods:{
            change(){
                let val = this.$refs[this.fkey].value;
                this.upload();
            },
           
            reloadFileInput(){
                this.$refs[this.fkey].value = "";
            },
            checkSuffix(fileList){
                // if(!this.vtype){
                //     return true;
                // }
                let count = 0;
                for(let i=0;i<fileList.length;i++){
                    let fileName = fileList[i].name;
                    let suffix = fileName.substring(fileName.lastIndexOf('.')+1);
                    if(this.vtype && this.vtype.indexOf(suffix) == -1){
                        count = count + 1;
                    }
                    if(suffix.indexOf('jpg') !== -1 || suffix.indexOf('png') !== -1 || suffix.indexOf('gif') !== -1 || suffix.indexOf('icon') !== -1){
                        return false
                    }
                }
                if(count != 0){
                    return false;
                }
                return true;
            },
            checkSize(fileList){
                if(this.size == 0){
                    return true;
                }
                let count = 0;
                for(let i=0;i<fileList.length;i++){
                    let fileSize = fileList[i].size;
                    if(fileSize > this.size * 1024 *1024){
                        count++;
                    }
                }
                if(count != 0){
                    return false;
                }
                return true;
            },
           
            upload(){
                if(!this.url || !this.fname){
                    this.alert.showAlert("error","URL and fname is mandatory!");
                    this.reloadFileInput();
                    return;
                }
                
                let dom = this.$refs[this.fkey];
                let fileList = dom.files;
                let formData = new FormData();
                for(let i=0;i<fileList.length;i++){
                    formData.append(this.fname,fileList[i]);
                }
                
                //控制格式
                if(!this.checkSuffix(fileList)){
                    if(this.vtype){
                        this.alert.showAlert("error","Extension must be "+ this.vtype);
                    }else{
                        this.alert.showAlert("error","The current component cannot upload images,please reupload");
                    }
                    this.reloadFileInput();
                    return;
                }
                //控制大小
                if(!this.checkSize(fileList)){
                    this.alert.showAlert("error","File size must less than "+ this.size + "MB");
                    this.reloadFileInput();
                    return;
                }
                //控制规格,仅支持图片规格
                if(this.fileType !== Constant.UPLOADFILE.IMAGE){
                    this.doUploadAjax(formData);
                }else{
                    this.alert.showAlert("error","The current component cannot upload images,please reupload");
                }
                this.reloadFileInput();
            },
            doUploadAjax(formData){
                this.showLoading = true;
                let that = this;
                debugger
                this.ajax.upload(this.url,formData).then((result) => {
                    // this.srcs = [];
                    let src = this.options.analysis?this.options.analysis(result):result;
                    this.alert.showAlert("success","Upload successful");
                    //多文件上传
                    if(this.multipleTag){
                        src && src.split(',').forEach(x=>{
                            this.srcs.push({name:x,idx:this.getMaxIndex()});
                        })
                    }else{
                        this.srcs = [{name:src,idx:1}];
                    }
                    this.$emit('input',this.getNames(this.srcs));
                    this.showLoading = false;
                    // if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                    //     this.$attrs.setVerifyCompState();
                    // }
                    this.leForm.verifySubComponentAfterEmit(this);
                    this.completedCallback&&this.completedCallback({success:true,data:result});
                }).catch((err) => {
                    that.showLoading = false;
                    that.showError = true;
                    that.alert.showAlert("error","Upload exception");
                    that.completedCallback&&this.completedCallback({success:false,data:err});
                });
            },
            getValue(){
                return this.getNames(this.srcs);
            },
            getMaxIndex(name){
                let tmp = [];
                this.srcs.forEach(x=>{
                    tmp.push(x.idx);
                })
                if(tmp.length != 0){
                    tmp.sort((a,b)=>{
                        return b - a;
                    })
                    return tmp[0] + 1;
                }else{
                    return 1;    
                }         
            },
            setValue(srcs){
                if(!srcs){
                    return;
                }
                if(this.srcs.length == 0){
                    srcs.split(',').forEach((x,idx)=>{
                        this.srcs.push({name:x,idx:(this.srcs.length+1)});
                    })
                }
                this.leForm.verifySubComponentAfterEmit(this);
            },
            getNames(data){
                let res = [];
                data && data.forEach(x=>{
                    res.push(x.name);
                })
                return res.join(',');
                this.leForm.verifySubComponentAfterEmit(this);
            },
            removeItem(item){
                if(this.readonlyFlag){
                    return;
                }
                let tmp = [];
                this.srcs.forEach(x=>{
                    if(x.name != item.name){
                        tmp.push(x);
                    }
                })
                this.srcs = tmp;
                this.$emit('input',this.getNames(this.srcs));
                this.leForm.verifySubComponentAfterEmit(this);
            },
            //单独重写reset方法,不调用父组件的reset
            reset(){
                this.$emit('input',"");
                this.leForm.verifySubComponentAfterEmit(this);
                this.srcs = [];
            }
        },
        created(){
            let that = this;
            $event_publisher.on(that._uid,(data)=>{
                this.formLabelWidth = data;
            });
        },
        mounted(){
            this.setValue(this.value);
        }
    }
</script>
<style scoped>
.upaload .imgFile{
    cursor:pointer;
}
.upaload .input-file {
    cursor:pointer;
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-align: center;
    width: auto;
    height: 26px;
    background-color: #2c7;
    border-radius: 4px;
    padding:0 5px;
    font-size: 12px;
    font-weight: normal;
    line-height: 26px;
    color: #fff;
    text-decoration: none;
    vertical-align: middle;
}
.upaload .input-file input[type="file"] {
    cursor:pointer;
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    font-size: 14px;
    background-color: #f00;
    opacity: 0;
    filter: alpha(opacity=0);
    width: 100%;
    height: 100%;
}
.upaload .loading{
    width:24px;vertical-align: middle;vertical-align: baseline;
    vertical-align: middle;
}
.upaload .fileList{
    display: block;
    width: 100%;
}
.upaload .fileList span{
    display: inline-block;
    padding: 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    box-sizing: border-box;
    border-color: transparent;
    margin: 7px 0 2px 6px;
    margin-left: 0;
    background-color: #f0f2f5;
    color: #909399;
    position: relative;
    max-width: 230px;
    overflow: hidden;
    margin-right: 5px;
}
.upaload .fileList span a{
    color: #606266;
}
.upaload .fileList span.fileContent{
    padding-right: 20px;
    padding-top: 1px;
}
.upaload .fileList span.noResult{
    padding-top: 1px;
}
.upaload .fileList span.fileContent .fa-times{
    top: 5px;
    right: 3px;
}
.upaload .fileList .fa-times{
    width: 12px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 12px;
    font-size: 12px;
    font-style: normal;
    background-color: #c8cacd;
    border-radius: 9px;
    color: #fff3f3;
    text-align: center;
    cursor: pointer;
}
.formStyle .form-item{
    text-align: left;
    flex-direction: column;
    align-items: initial;
}
.upaload label{
    text-align: right;
    display: inline-block;
    font-size: 14px;
    color: #606266;
}
.formStyle .form-item .promptMsg{
    width: 100%;
    display: block;
    float: right;
    font-size: 12px;
    color: #f56c6c;
    line-height: 20px;
    text-align: left;
    margin: 0;
}
.upaload .rules{
    font-size: 12px;
    margin-left: 5px;
    color: #3ea5d2;
}
.upaload .form-item-label{
    margin: 0 5px 0 10px;
}
.upaload .form-item-label.required::before {
    content: "*";
    color: #f56c6c;
    font-size: 12px;
    margin-right: 2px;
}
.upaload .input-file.readonlyIcon{
    opacity: 0.5;
}
</style>