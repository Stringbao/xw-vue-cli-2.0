<template>
    <div class="le_editor form-item">
        <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="{'required':isVertify && isRequired}">{{label}}</label>
        <div  class="form-item-div fa LeEditor" :class="{ 'fa-times-circle-o': state.showError }">
            <VueUEditor @beforeInit="beforeInit" @ready="ready" v-model="currentValue" :config="config"></VueUEditor>
            <p class="promptMsg" v-show="state.showError">
                {{ state.errorMsg }}
            </p>
            <p class="tip" v-show="!state.showError">{{ tip }}</p>
        </div>
    </div>
</template>

<script>
    import VueUEditor from 'vue-ueditor-wrap'
    import Constant from "../contant";
    export default {
        name: "ueditor",
        watch: {
            currentValue() {
              this.$emit('input', this.currentValue);
              this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
          },
            value() {
                this.currentValue = this.value
            }
        },
        computed: {
            _leFormLableWidth() {
                return (this.leForm || {}).labelWidth;
            },
            labelWidthVal() {
                return this.labelWidth ||this._leFormLableWidth || Constant.INPUT.LABEL_WIDTH;
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
            readonlyFlag() {
                if (this.readonly === "" || this.readonly) {
                    return true;
                }
                return false;
            }
        },
        props: {
            toolbars: {
                type: Array,
                default() {
                    return [
                        [
                            'fullscreen', 'source', '|', 'undo', 'redo', '|',
                            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat',
                            'blockquote', 'pasteplain', '|',
                            'forecolor', 'selectall', 'cleardoc', '|',
                            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                            'directionalityltr', 'directionalityrtl', 'indent', '|',
                            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                            'link', 'unlink',
                            '|',
                            'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                            'simpleupload','horizontal', 'date', 'time', 'spechars', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', ]
                    ]
                }
            },
            value: {
                type: Number | String,
                default() {
                    return ''
                }
            },
            msg: {
                type: String | Object,
            },
            tip: {
                type: String,
            },
            imgUploadUrl: {
                type: String,
                default() {
                    return ''
                }
            },
            width: {
                type: Number | String,
                default() {
                    return '100%'
                }
            },
            height: {
                type: Number | String,
                default() {
                    return '300'
                }
            },
            readonly: {
                type: Boolean,
                default() {
                    return false
                }
            },
            label: {
                type: String,
            },
            on: {
                type: Boolean | String,
                default: false,
            },
            required: {
                type: Boolean | String,
                default: false,
            },
        },
        inject: {
            leForm:{
                default: ""
            }
        },
        components: {
            VueUEditor
        },
        data() {
            return {
                currentValue: this.value,
                config: {
                    readonly: this.readonly,
                    UEDITOR_HOME_URL: window.UEditorBaseUrl,
                    serverUrl: window.UEditorBaseUrl + "responsejson.json",
                    toolbars: this.toolbars,
                    // 初始容器高度
                    initialFrameHeight: this.height,
                    // 初始容器宽度
                    initialFrameWidth: this.width
                },
                state: {
                    showError: false,
                    successIcon: ""
                }
            }
        },
        methods: {
            beforeInit() {
                let _this = this;
                this.$nextTick(()=>{
                    // 必须限制只能重写一次  不然会报错 （配置项）！！！！
                    if(!UE.Editor.prototype._bkGetActionUrl && UE.Editor.prototype.getActionUrl){
                        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
                        UE.Editor.prototype.getActionUrl = function (action) {
                            if (action == 'uploadimage' || action == 'uploadscrawl') {
                                return _this.imgUploadUrl;
                            }else {
                                return this._bkGetActionUrl.call(this, action);
                            };
                        }
                    }
                })
            },
            ready(uEditor) {
                uEditor.addListener('blur',  (event)=> {
                    this.leForm&&this.leForm.verifySubComponentAfterEmit(this);
                })
            },
            getValue() {
                return this.currentValue
            }
        }
    }
</script>

<style scoped>
    .form-item .fa-times-circle-o {
        border: 1px solid #f56c6c;
    }
</style>