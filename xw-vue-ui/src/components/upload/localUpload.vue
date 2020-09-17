<template>
    <div class="form-item upaload">
        <div style="display: flex;">
            <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>

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
                        <div v-if="fileType != 'image'">
                            <span class="fileContent" v-for="(item,index) in srcs" :key="index">
                                <a href="javascript:void(0);">{{item.name}}</a>
                                <!-- <a target="_blank" :href="item.name">{{"<#附件#>_" + item.idx}}</a> -->
                                <!-- <i v-show="!readonlyFlag" @click="removeItem(item)" class="fa fa-times"></i> -->
                            </span>
                        </div>
                        <div v-else>
                            <span v-for="(item,index) in srcs" :key="index" style="height:auto">
                                <a href="javascript:void(0);" style="display:block;height:100px;">
                                    <img :src="item.name" style="width:100px;height:100px">
                                </a>
                                <!-- <i v-show="!readonlyFlag" @click="removeItem(item)" class="fa fa-times"></i> -->
                            </span>
                        </div>
                    </div>
                    
                </div>
                <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
            </div>
        </div>
    </div>
</template>

    
<script>
    import define from "../define.js";
    import tool from "../leCompsTool.js";
    export default {
        components: {},
        props:["options","value","readonly"],
        name: "LeLocalUpload",
        inheritAttrs:false,
        data(){
            return {
                validataComponentType:"FileUpload",
                fkey:tool._idSeed.newId(),
                showLoading:false,
                srcs:[],
                state:{
                    showError:false,
                    successIcon:""
                },
                formLabelWidth:"0",
                allFileList:[]
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
            tipStr(){
                return this.options.tip?this.options.tip:"";
            },
            multipleTag(){
                // if(this.options.multiple!=undefined){
                //     if(this.options.multiple === false){
                //         return false;
                //     }
                //     return true;
                // }
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
            vtype(){
                return this.options.vtype?this.options.vtype:"";
            },
            width(){
                return this.options.width?this.options.width:"";
            },
            height(){
                return this.options.height?this.options.height:"";
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
            fileType(){
                let _fileType = "";
                if(this.vtype){
                    if(this.vtype.indexOf('jpg') != -1 || this.vtype.indexOf('png') != -1 || this.vtype.indexOf('gif') != -1 || this.vtype.indexOf('icon') != -1){
                        _fileType = define.UPLOADFILETYPE.IMAGE;
                    }
                    if(this.vtype.indexOf('pdf') != -1){
                        _fileType = define.UPLOADFILETYPE.PDF;
                    }
                    if(this.vtype.indexOf('doc') != -1 || this.vtype.indexOf('docx') != -1){
                        _fileType = define.UPLOADFILETYPE.WORD;
                    }
                    if(this.vtype.indexOf('xls') != -1 || this.vtype.indexOf('xlsx') != -1){
                        _fileType = define.UPLOADFILETYPE.EXCEL;
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
            /**
             * @description filechange事件
             * @returns
             */
            change(){
                let val = this.$refs[this.fkey].value;
                this.upload();
            },
            reloadFileInput(){
                this.$refs[this.fkey].value = "";
            },
            checkSuffix(fileList){
                if(!this.vtype){
                    return true;
                }
                let count = 0;
                for(let i=0;i<fileList.length;i++){
                    let fileName = fileList[i].name;
                    let suffix = fileName.substring(fileName.lastIndexOf('.')+1);
                    if(this.vtype.indexOf(suffix) == -1){
                        count++;
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
            checkSpecification(fileList){
                let that = this;
                let readerPromises = [];
                for(let i=0;i<fileList.length;i++){
                    let fileObj = fileList[i];
                    ((fileObj)=>{
                        let reader = new FileReader();
                        reader.readAsDataURL(fileObj);
                        let _reader_promsie = new Promise((resolve,reject)=>{
                            reader.onload = (e)=> {
                                let data = e.target.result;
                                let image = new Image();
                                image.src= data;
                                image.onload = ()=>{
                                    let flag = true;
                                    if(that.width && that.width != image.width){
                                        flag = false;
                                    }
                                    if(that.height && that.height != image.height){
                                        flag = false;
                                    }
                                    resolve(flag);
                                };
                                image.onerror = (e)=>{
                                    reject(e);
                                }
                            }
                            reader.onerror = (e=>{
                                reject(e);
                            })
                        })
                        readerPromises.push(_reader_promsie);
                    })(fileObj);
                }
                let resultPromise = new Promise((resResolt,resReject)=>{
                    Promise.all(readerPromises).then(xx=>{
                        let count = 0;
                        xx.forEach(f=>{
                            if(!f){
                                count++;
                            }
                        })
                        if(count == 0){
                            resResolt(true);
                        }else{
                            resResolt(false);
                        }
                    }).catch(x=>{
                        resResolt(xx);
                    })
                });
                return resultPromise;
            },
            addFileList(fls){
                if(this.multipleTag){
                    for(let k =0;k<fls.length;k++){
                        let exist = false;
                        let currentFils = fls[k];
                        for(let i=0;i<this.allFileList.length;i++){
                            if(currentFils.name == this.allFileList[i].name){
                                exist = true;
                            }
                        }
                        if(!exist){
                            this.allFileList.push(currentFils);
                        }
                    }
                }else{
                    this.allFileList = fls;
                }
            },
            getFormDataByFileList(){
                let res = {count:0,formData:new FormData()}
                for(let i=0;i<this.allFileList.length;i++){
                    res.count++;
                    res.formData.append(this.fname,this.allFileList[i]);
                }
                return res;
            },
            /**
             * @description 上传的主体方法
             * @returns
             */
            upload(){
                if(!this.fname){
                    this.alert.showAlert("error","<#上传fname必须配置#>!");
                    return;
                }
                let dom = this.$refs[this.fkey];
                let fileList = dom.files;
                
                //控制格式
                if(!this.checkSuffix(fileList)){
                    this.alert.showAlert("error","<#后缀名必须为#>:"+ this.vtype);
                    return;
                }
                //控制大小
                if(!this.checkSize(fileList)){
                    this.alert.showAlert("error","<#文件大小必须小于#>:"+ this.size + "MB");
                    return;
                }
                //控制规格,仅支持图片规格
                if(this.fileType == define.UPLOADFILETYPE.IMAGE && this.width && this.height){
                    this.checkSpecification(fileList).then(x=>{
                        if(x){
                            this.addFileList(fileList);
                            this.setSrcs();
                        }else{
                            this.alert.showAlert("error","<#图片规格必须为#>:"+ this.width + "*" + this.height);
                        }
                    }).catch(e=>{})
                }else{
                    this.addFileList(fileList);
                    this.setSrcs();
                }
            },
            setSrcs(){
                this.srcs = [];
                if(this.multipleTag){
                    this.allFileList.forEach(x=>{
                        this.srcs.push({name:x.name,idx:this.getMaxIndex()});
                    })
                }else{
                    this.srcs = [{name:this.allFileList[0].name,idx:1}];
                }

                this.options.callback && this.options.callback(this.getFormDataByFileList().formData);

                this.reloadFileInput();
                this.$emit('input',this.getNames(this.srcs));
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
            },
            getNames(data){
                let res = [];
                data && data.forEach(x=>{
                    res.push(x.name);
                })
                return res.join(',');
            },
            removeItem(item){
                if(this.readonlyFlag){
                    return;
                }
                let res = [];
                this.allFileList.forEach(x=>{
                    if(x.name != item.name){
                        res.push(x);
                    }
                })
                this.allFileList = res;
                this.setSrcs();
                this.$emit('input',this.getNames(this.srcs));
            },
            //单独重写reset方法,不调用父组件的reset
            reset(){
                this.$emit('input',"");
                this.srcs = [];
                this.$attrs.setStateByFlag(0);
            },
            // getFormData(){
            //     return new Promise((resolve,reject)=>{
            //         let result = this.getFormDataByFileList();
            //         if(result.count > 0){
            //             resolve(result.formData);
            //         }else{
            //             reject(null);
            //         }
            //     })
            // }
        },
        created(){
            let that = this;
            tool._form_event_publisher.on(that._uid,(data)=>{
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
    padding:0px 6px;
    /* width: 50px; */
    height: 26px;
    background-color: #2c7;
    border-radius: 4px;
    /* padding: 5px; */
    font-size: 12px;
    font-weight: normal;
    line-height: 26px;
    color: #fff;
    text-decoration: none;
    vertical-align: middle;
    padding: 0 10px;
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
    /* padding-right: 20px; */
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