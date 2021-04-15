<template>
    <div class="form-item upaload">
        <div style="display: flex">
            <label
                :style="{ width: labelWidthVal + 'px' }"
                class="form-item-label"
                :class="{'required':isVertify && isRequired}"
                >{{ label }}</label
            >

            <div style="flex: 1">
                <span :class="{ readonlyIcon: readonlyFlag }" class="input-file"
                    >Please select a file
                    <input
                        :disabled="readonlyFlag"
                        :multiple="multipleTag"
                        @change="change($event)"
                        type="file"
                        :ref="componentKey"
                        class="imgFile"
                /></span>
                <img
                    v-show="showLoading"
                    src="//p3-nec.static.pub/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif"
                    class="loading"
                />
                <span class="rules">{{ tipStr }}</span>
                <div class="fileList" v-show="srcs.length > 0">
                    <div v-if="noResultTag">
                        <span class="noResult">
                            <a>Upload successful</a>
                        </span>
                    </div>
                    <div v-else>
                        <div v-if="fileType != 'image'">
                            <span
                                class="fileContent"
                                v-for="(item, index) in srcs"
                                :key="index"
                            >
                                <a target="_blank" :href="item.name">{{
                                    "attachment_" + item.idx
                                }}</a>
                                <i
                                    v-show="!readonlyFlag"
                                    @click="removeItem(item)"
                                    class="fa fa-times"
                                ></i>
                            </span>
                        </div>
                        <div v-else>
                            <span
                                v-for="(item, index) in srcs"
                                :key="index"
                                style="height: auto"
                            >
                                <a
                                    target="_blank"
                                    :href="item.name"
                                    style="display: block; height: 100px"
                                >
                                    <img
                                        :src="item.name"
                                        style="width: 100px; height: 100px"
                                    />
                                </a>
                                <i
                                    v-show="!readonlyFlag"
                                    @click="removeItem(item)"
                                    class="fa fa-times"
                                ></i>
                            </span>
                        </div>
                    </div>
                </div>
                <p class="promptMsg" v-show="state.showError">
                    {{ state.errorMsg }}
                </p>
            </div>
        </div>
    </div>
</template>

    
<script>
import Constant from "../contant/index.js";
import { $idSeed, $util, $obj, $event_publisher } from "../leCompsTool.js";

export default {
    name: "LeUpload",
    props: {
        on: {
            type: Boolean | String,
            default: false,
        },
        required: {
            type: Boolean | String,
            default: false,
        },
        label: {
            type: String,
        },
        msg: {
            type: String | Object,
        },
        labelWidth: {
            type: Number | String,
        },
        options: Object,
        value: String,
        readonly: {
            type: Boolean | String,
            default: false,
        },
    },
    inject: {
        leForm: {
            default: "",
        },
    },
    data() {
        return {
            componentKey: $idSeed.newId(),
            showLoading: false,
            srcs: [],
            state: {
                showError: false,
                errorMsg: "",
            },
            singleName:''
        };
    },
    computed: {
        _leFormLableWidth() {
            return (this.leForm || {}).labelWidth;
        },
        isVertify(){
            if (this.on === "" || this.on) {
                return true;
            }
            return false; 
        },
        isRequired(){
            if (this.required === "" || this.required) {
                return true;
            }
            return false;
        },
        labelWidthVal() {
            return (
                this.labelWidth ||
                this._leFormLableWidth ||
                Constant.UPLOADFILE.LABELWIDTH
            );
        },
        tipStr() {
            return this.options.tip ? this.options.tip : "";
        },
        multipleTag() {
            if (this.options.multiple != undefined) {
                if (this.options.multiple === false) {
                    return false;
                }
                return true;
            }
            return false;
        },
        noResultTag() {
            if (this.options.noResult != undefined) {
                if (this.options.noResult === false) {
                    return false;
                }
                return true;
            }
            return false;
        },
        fname() {
            return this.options.fname;
        },
        url() {
            return this.options.url;
        },
        completedCallback() {
            return this.options.completedCallback;
        },
        vtype() {
            return this.options.vtype ? this.options.vtype : "";
        },
        minWidth() {
            return this.options.minWidth ? this.options.minWidth : "";
        },
        minHeight(){
            return this.options.minHeight ? this.options.minHeight : "";
        },
        maxWidth() {
            return this.options.maxWidth ? this.options.maxWidth : "";
        },
        maxHeight(){
            return this.options.maxHeight ? this.options.maxHeight : "";
        },
        width() {
            return this.options.width ? this.options.width : "";
        },
        height() {
            return this.options.height ? this.options.height : "";
        },
        size() {
            if (this.options.size) {
                let re = /^[0-9]+.?[0-9]*$/;
                if (!re.test(this.options.size)) {
                    return 0;
                }
                return parseFloat(this.options.size);
            } else {
                return 0;
            }
        },
        readonlyFlag() {
            if (this.readonly === "" || this.readonly) {
                return true;
            }
            return false;
        },
        fileType() {
            let _fileType = "";
            if (this.vtype) {
                if (
                    this.vtype.indexOf("jpg") != -1 ||
                    this.vtype.indexOf("png") != -1 ||
                    this.vtype.indexOf("gif") != -1 ||
                    this.vtype.indexOf("icon") != -1
                ) {
                    _fileType = Constant.UPLOADFILE.IMAGE;
                }
                if (this.vtype.indexOf("pdf") != -1) {
                    _fileType = Constant.UPLOADFILE.PDF;
                }
                if (
                    this.vtype.indexOf("doc") != -1 ||
                    this.vtype.indexOf("docx") != -1
                ) {
                    _fileType = Constant.UPLOADFILE.WORD;
                }
                if (
                    this.vtype.indexOf("xls") != -1 ||
                    this.vtype.indexOf("xlsx") != -1
                ) {
                    _fileType = Constant.UPLOADFILE.EXCEL;
                }
            }
            return _fileType;
        },
    },
    methods: {
        change(e) {
            let val = this.$refs[this.componentKey].value;
            this.upload();
        },
        reloadFileInput() {
            this.$refs[this.componentKey].value = "";
        },
        checkSuffix(fileList) {
            if (!this.vtype) {
                return true;
            }
            let count = 0;
            for (let i = 0; i < fileList.length; i++) {
                let fileName = fileList[i].name;
                let suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
                if (this.vtype.indexOf(suffix) == -1) {
                    count++;
                }
            }
            if (count != 0) {
                return false;
            }
            return true;
        },
        checkSize(fileList) {
            if (this.size == 0) {
                return true;
            }
            let count = 0;
            for (let i = 0; i < fileList.length; i++) {
                let fileSize = fileList[i].size;
                if (fileSize > this.size * 1024 * 1024) {
                    count++;
                }
            }
            if (count != 0) {
                return false;
            }
            return true;
        },
        checkSpecification(fileList) {
            let that = this;
            let readerPromises = [];
            for (let i = 0; i < fileList.length; i++) {
                let fileObj = fileList[i];
                ((fileObj) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(fileObj);
                    let _reader_promsie = new Promise((resolve, reject) => {
                        reader.onload = (e) => {
                            let data = e.target.result;
                            let image = new Image();
                            image.src = data;
                            image.onload = () => {
                                let flag = 0;
                                if ((that.width && that.width != image.width)|| (that.height && that.height != image.height)) {
                                    flag = 1;
                                }
                                if ((that.minWidth && that.minWidth > image.width)|| (that.minHeight && that.minHeight > image.height)) {
                                    flag = 2;
                                }
                                if ((that.maxWidth && that.maxWidth < image.width)|| (that.maxHeight && that.maxHeight < image.height)) {
                                    flag = 3;
                                }
                                resolve(flag);
                            };
                            image.onerror = (e) => {
                                reject(e);
                            };
                        };
                        reader.onerror = (e) => {
                            reject(e);
                        };
                    });
                    readerPromises.push(_reader_promsie);
                })(fileObj);
            }
            let resultPromise = new Promise((resResolt, resReject) => {
                Promise.all(readerPromises)
                    .then((xx) => {
                        let count = 0, index = 0;
                        for(let i = 0;i < xx.length; i++){
                            if( xx[i] > 0 ){
                                index = i;
                                count++;
                                break;
                            }
                        }
                        if (count == 0) {
                            resResolt(true);
                        } else {
                            resResolt(xx[index]);
                        }
                    })
                    .catch((x) => {
                        resResolt(xx);
                    });
            });
            return resultPromise;
        },
        upload() {
            if (!this.url || !this.fname) {
                this.alert.showAlert("error", "URL and fname is mandatory!");
                this.reloadFileInput();
                return;
            }

            let dom = this.$refs[this.componentKey];
            let fileList = dom.files;
            this.singleName = fileList.length?fileList[0].name:fileList.name
            let formData = new FormData();
            for (let i = 0; i < fileList.length; i++) {
                formData.append(this.fname, fileList[i]);
            }
            //控制格式
            if (!this.checkSuffix(fileList)) {
                this.alert.showAlert(
                    "error",
                    "Extension must be " + this.vtype
                );

                this.reloadFileInput();
                return;
            }
            //控制大小
            if (!this.checkSize(fileList)) {
                this.alert.showAlert(
                    "error",
                    "File size must less than " + this.size + "MB"
                );
                this.reloadFileInput();
                return;
            }
            //控制规格,仅支持图片规格
            if (
                this.fileType == Constant.UPLOADFILE.IMAGE && ((this.width && this.height) || (this.maxWidth && this.maxHeight) || (this.minWidth && this.minHeight))
            ) {
                this.checkSpecification(fileList)
                    .then((x) => {
                        if ( x == true ) {
                            this.doUploadAjax(formData);
                        } else {
                            let extInfo = '', height = 0, width = 0;
                            switch ( x ) {
                                case 1:
                                    height = this.height;
                                    width = this.width;
                                case 2:
                                    extInfo = 'larger than ';
                                    height = this.minHeight;
                                    width = this.minWidth;
                                    break;
                                case 3:
                                    extInfo = 'smaller than ';
                                    height = this.maxHeight;
                                    width = this.maxWidth;
                                    break;
                            }
                            this.alert.showAlert(
                                "error",
                                `Image format must be ${extInfo}` +
                                    width +
                                    "*" +
                                    height
                            );
                        }
                    })
                    .catch((e) => {});
            } else {
                this.doUploadAjax(formData);
            }
            this.reloadFileInput();
        },
        doUploadAjax(formData) {
            this.showLoading = true;
            this.ajax
                .upload(this.url, formData)
                .then((result) => {
                    // this.srcs = [];
                    let src = this.options.analysis
                        ? this.options.analysis(result)
                        : result;
                    this.alert.showAlert("success", "Upload successful");
                    //多文件上传
                    if (this.multipleTag) {
                        src &&
                            src.split(",").forEach((x) => {
                                this.srcs.push({
                                    name: x,
                                    idx: this.getMaxIndex(),
                                });
                            });
                    } else {
                        this.srcs = [{ name: src, idx: 1 }];
                    }
                    this.$emit("input", this.getNames(this.srcs));
                    this.showLoading = false;
                    if (
                        this.leForm &&
                        this.leForm.checkSubComponentVerify(this)
                    ) {
                        this.leForm && this.leForm.validateSubComponent(this);
                    }
                    this.completedCallback &&
                        this.completedCallback({ success: true, data: result });
                })
                .catch((err) => {
                    this.showLoading = false;
                    this.showError = true;
                    this.alert.showAlert("error", "Upload exception");
                    this.completedCallback &&
                        this.completedCallback({ success: false, data: err });
                });
        },
        getValue() {
            return this.getNames(this.srcs);
        },
        getMaxIndex(name) {
            let tmp = [];
            this.srcs.forEach((x) => {
                tmp.push(x.idx);
            });
            if (tmp.length != 0) {
                tmp.sort((a, b) => {
                    return b - a;
                });
                return tmp[0] + 1;
            } else {
                return 1;
            }
        },
        returnRenderList(srcs) {
            let renderList = [];
            let isBase64 = false;
            const baseList = ['data:image/png;base64', 'data:image/jpg;base64', 'data:image/gif;base64', 'data:image/jpeg;base64', 'data:image/icon;base64']
            baseList.forEach(item => {
                if (srcs.indexOf(item) != -1) {
                    isBase64 = true;
                }
            });
            const splitList = srcs.split(',');
            if (isBase64) {
                for(let i = 0; i < splitList.length; i += 2){
                    renderList.push(splitList.slice(i,i+2).join());
                }
            } else {
                renderList = splitList;
            }
            return renderList;
        },
        setValue(srcs) {
            this.srcs = [];
            if (!srcs) {
                return;
            }
            if (this.multipleTag) { // 多选
                this.returnRenderList(srcs).forEach((x, idx) => {
                    this.srcs.push({ name: x, idx: this.srcs.length + 1 });
                });
            } else { // 单选
                this.srcs = [{name: srcs, idx: 1}];
            }
        },
        getNames(data) {
            let res = [];
            data &&
                data.forEach((x) => {
                    res.push(x.name);
                });
            return res.join(",");
        },
        removeItem(item) {
            if (this.readonlyFlag) {
                return;
            }
            let tmp = [];
            this.srcs.forEach((x) => {
                if (x.name != item.name) {
                    tmp.push(x);
                }
            });
            this.srcs = tmp;
            this.$emit("input", this.getNames(this.srcs));
        },
        //单独重写reset方法,不调用父组件的reset
        reset() {
            this.$emit("input", "");
            this.srcs = [];
            this.leForm && this.leForm.verifySubComponentAfterEmit(this);
        },
        getSingleName(){
            return this.singleName
        }
    },
    mounted() {
        this.setValue(this.value);
    },
    watch: {
        value: {
            handler(val) {
                this.setValue(val);
            },
            deep: true
        }
    }
};
</script>
<style scoped>
.upaload .imgFile {
    cursor: pointer;
}
.upaload .input-file {
    cursor: pointer;
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-align: center;
    width: auto;
    height: 26px;
    background-color: #2c7;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: normal;
    line-height: 26px;
    color: #fff;
    text-decoration: none;
    vertical-align: middle;
}
.upaload .input-file input[type="file"] {
    cursor: pointer;
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
.upaload .loading {
    width: 24px;
    vertical-align: middle;
    vertical-align: baseline;
    vertical-align: middle;
}
.upaload .fileList {
    display: block;
    width: 100%;
}
.upaload .fileList span {
    display: inline-block;
    padding: 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid rgba(64, 158, 255, 0.2);
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
.upaload .fileList span a {
    color: #606266;
}
.upaload .fileList span.fileContent {
    padding-right: 20px;
    padding-top: 1px;
}
.upaload .fileList span.noResult {
    padding-top: 1px;
}
.upaload .fileList span.fileContent .fa-times {
    top: 5px;
    right: 3px;
}
.upaload .fileList .fa-times {
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
.formStyle .form-item {
    text-align: left;
    flex-direction: column;
    align-items: initial;
}
.upaload label {
    text-align: right;
    display: inline-block;
    font-size: 14px;
    color: #606266;
}
.formStyle .form-item .promptMsg {
    width: 100%;
    display: block;
    float: right;
    font-size: 12px;
    color: #f56c6c;
    line-height: 20px;
    text-align: left;
    margin: 0;
}
.upaload .rules {
    font-size: 12px;
    margin-left: 5px;
    color: #3ea5d2;
}
.upaload .form-item-label {
    margin: 0 5px 0 10px;
}
.upaload .form-item-label.required::before {
    content: "*";
    color: #f56c6c;
    font-size: 12px;
    margin-right: 2px;
}
.upaload .input-file.readonlyIcon {
    opacity: 0.5;
}
</style>