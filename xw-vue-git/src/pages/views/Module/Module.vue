<template>
    <div>
        <div class="extrac">
            <span class="asBtn import">
                <i class="fa fa-cloud-download"></i>CreateByJson
                <input type="file" accept=".json" @change="createByJson" />
            </span>
        </div>
        <p class="tip">CreateByJson :请清空已有module 再上传json文件</p>
        <Tab :modules="modules" @add="add" @del="del" @change="change">
            <template #pane="{currentIndex}">
                <TabPane
                    v-for="(module,i) in modules"
                    :key="module.ModuleName"
                    :index="i"
                    :currentIndex="currentIndex"
                >
                    <div class="card">
                        <Model :models="module.modelList" />
                    </div>
                    <div class="card pagesCard">
                        <Page :module="module.Pages"></Page>
                    </div>
                    <div class="card">
                        <Service :sevices="module.Services"></Service>
                    </div>
                    <div class="card">
                        <storeForm :privateStores="module.Store" :commonStores="commonStore"></storeForm>
                    </div>
                </TabPane>
            </template>
        </Tab>
        <le-dialog title="create Module" v-model="dialog.showDialog">
            <div slot="body">
                <le-form ref="module">
                    <le-input
                        label="模块名称"
                        msg="请输入模块名称"
                        tip="请输入合法的文件夹名称"
                        v-model="moduleName"
                        on
                        required
                    ></le-input>
                </le-form>
            </div>
            <div slot="button">
                <le-button type="cancel" value="<#取消#>" @click="handleClose"></le-button>
                <le-button type="save" value="<#保存#>" @click="handleSave"></le-button>
            </div>
        </le-dialog>
        <le-dialog title="create Module by uploading json file" v-model="uploadJson.showDialogJson">
            <div slot="body">
                <le-form>
                    <le-radio-list
                        on
                        :data-source="isCover"
                        display-name="name"
                        display-value="code"
                        v-model="uploadJson.isUpdate"
                    ></le-radio-list>
                </le-form>
            </div>
            <div slot="button">
                <le-button type="cancel" value="<#取消#>" @click="handleCloseUpload"></le-button>
                <le-button type="save" value="<#保存#>" @click="handleSaveUpload"></le-button>
            </div>
        </le-dialog>
    </div>
</template>
<script>
import Model from "@pages/views/Module/Model.vue";
import Tab from "@pages/components/tab/Tab.vue";
import TabPane from "@pages/components/tab/TabPane.vue";
import Page from "./Page.vue";
import StoreForm from "./Store.vue";
import Service from "./Service.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import { isCover } from "@constant/index.js";
export default {
    data() {
        return {
            dialog: {
                showDialog: false,
            },
            uploadJson:{
                showDialogJson: false,
                isUpdate:0,
                data:[]
            },
            isCover: isCover,
            moduleName: "",
        };
    },
    computed: {
        ...mapState([
            "modules",
            "currentModule",
            "existedModules",
            "commonStore",
        ]),
        stores: function () {
            return [...this.currentModule.Store, ...this.commonStore];
            //  this.currentModule.Store.concat(this.commonStore)
        },
    },
    components: {
        Tab,
        TabPane,
        Page,
        StoreForm,
        Service,
        Model,
    },
    methods: {
        ...mapActions([
            "addModules",
            "removeModules",
            "changeModules",
            "removePages",
            "addExistedModules",
            "uploadModule",
        ]),
        del(item) {
            this.removeModules(item.ModuleName);
        },
        add() {
            this.dialog.showDialog = true;
        },
        change(module, idx) {
            this.changeModules(module);
        },
        createByJson(el) {
            let file = el.target.files[0];
            if (file.type === "application/json") {
                Ajax.upload("/v2API/comp/upload", { file: file })
                    .then((res) => {
                        this.uploadJson.showDialogJson = true;
                        this.uploadJson.data = res.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                alert("请上传正确格式的 json 文件");
            }
            el.target.value = "";
        },
        handleSave() {
            this.$refs.module
                .validate()
                .then((res) => {
                    if (res.success) {
                        this.addModules(this.moduleName.replace(/\s/, ""));
                        this.dialog.showDialog = false;
                        this.moduleName = "";
                    }
                })
                .catch((err) => {
                    this.alert.showAlert("error", err.info[0]);
                });
        },
        handleClose() {
            this.dialog.showDialog = false;
            this.moduleName = "";
        },
        handleSaveUpload(){
            if(this.uploadJson.isUpdate){
                this.uploadModule(this.uploadJson.data);
            }else{
                this.addExistedModules(this.uploadJson.data);
            }
            this.uploadJson.showDialogJson = false;
            this.uploadJson.isUpdate = 0;
            alert("添加成功，可以在project中查看");
        },
        handleCloseUpload(){
            this.uploadJson.showDialogJson = false;
            this.uploadJson.isUpdate = 0;
        }
    },
};
</script>

<style lang="scss" scoped>
.extrac {
    display: flex;
    flex-direction: row-reverse;
    & > span {
        height: 30px;
        line-height: 30px;
        display: inline-block;
        outline: none;
        border-radius: 3px;
        border: 1px solid #dcdfe6;
        color: #fff;
        font-size: 12px !important;
        cursor: pointer;
        padding: 0 13px 0 22px;
        position: relative;
        margin: 3px;
        .fa {
            position: absolute;
            top: 8px;
            left: 5px;
        }
    }
    & > .import {
        background-color: #a2d469;
        border-color: #a2d469;
        input[type="file"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }
}
.card {
    padding: 10px;
    color: #333;
    font-style: normal;
    .le_table_container {
        width: 100%;
        thead {
            width: 100%;
            th {
                height: 32px;
                line-height: 32px;
                text-align: center;
                border-right: 1px solid #ccc;
                border-left: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
        }
        tbody {
            width: 100%;
            tr {
                width: 100%;
                border-bottom: 1px solid #ccc;
                td {
                    text-align: center;
                    border-right: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                }
            }
        }
    }
    .head {
        position: relative;
        display: flex;
        width: 100%;
        transition: transform 0.3s;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        margin-top: 20px;
        .le_page_name {
            width: 100%;
            text-align: center;
            padding: 10px;
            border-bottom: 1px solid #ccc;
        }
        .tab_add {
            min-width: 40px;
            padding: 0 8px;
            background: #fafafa;
            border: 1px solid #f0f0f0;
            border-radius: 2px 2px 0 0;
            outline: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            .actions_add {
                display: inline-block;
                color: inherit;
                font-style: normal;
                line-height: 0;
                text-align: center;
                text-transform: none;
                vertical-align: -0.125em;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                svg {
                    display: inline-block;
                }
            }
        }
    }
    .pagesType {
        line-height: 40px;
    }
}
.tip {
    color: red;
    font-size: 12px;
    margin-bottom: 10px;
}
</style>