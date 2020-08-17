<template>
    <div>
        <le-form ref="model">
            <le-input label="name:" msg="请输入model的name" v-model="params.name" :readonly="isEdit" on required></le-input>
            <ul class="propsList">
                <li class="clearfix" v-for="(item, idx) in params.props" :key="idx">
                    <div>
                        <div class="le_form_row_item">
                            <le-local-select
                                label="type:"
                                :data-source="pagesDatasource.dialogFieldType"
                                display-name="name"
                                display-value="name"
                                on
                                required
                                v-model="item.type"
                            ></le-local-select>
                            <le-input on required label="label:" v-model="item.label"></le-input>
                            <le-input on required label="field:" v-model="item.field"></le-input>
                            <span class="asBtn fr remove" @click="remove(idx)">
                                <i class="fa fa-trash"></i>deleteItem
                            </span>
                        </div>
                        <div
                            class="le_form_row_item"
                            v-if="item.type == 'select' || item.type == 'checkboxList' || item.type=='radioList'"
                        >
                            <le-input on required label="displayName:" v-model="item.displayName"></le-input>
                            <le-input on required label="displayValue:" v-model="item.displayValue"></le-input>
                            <le-local-select
                                label="dataSource"
                                :data-source="currentModule.Store.concat(commonStore)"
                                display-name="name"
                                display-value="name"
                                on required
                                v-model="item.dataSource"
                            ></le-local-select>
                            <span class="asBtn fr create"  @click="showDatasource()">
                                <i class="fa fa-plus-square"></i>datasource
                            </span>
                        </div>
                        <div class="col4">
                            <le-radio-list
                                label="on:"
                                :data-source="pagesDatasource.dialogValidateType"
                                display-name="name"
                                display-value="code"
                                v-model="item.on"
                            ></le-radio-list>
                            <le-radio-list
                                label="required:"
                                :data-source="pagesDatasource.dialogValidateType"
                                display-name="name"
                                display-value="code"
                                v-model="item.required"
                            ></le-radio-list>
                            <le-input label="msg:" v-model="item.msg"></le-input>
                        </div>
                        <div class="clearfix le_form_row_item co2">
                            <le-input label="tip:" v-model="item.tip"></le-input>
                            <!-- <le-input label="Vtype:" v-model="item.Vtype" v-if="item.type == 'text'"></le-input> -->
                            <le-local-select
                                label="Vtype"
                                v-if="item.type == 'text'"
                                :data-source="pagesDatasource.vtypeList"
                                display-name="name"
                                display-value="code"
                                v-model="item.Vtype"
                            ></le-local-select>
                        </div>
                    </div>
                </li>
                <li class="item createBtn">
                    <i class="fr addParams iconfont icon-add" type="button" @click="add">添加属性</i>
                </li>
            </ul>
        </le-form>
        <le-dialog title="create Store" v-model="dialog.showDialog" width="700" height="600">
            <div slot="body">
                <StoreDialog
                    v-if="dialog.showDialog"
                    :store="store"
                    :action="dialog.action"
                    :idx="dialog.idx"
                    ref="store"
                />
            </div>
            <div slot="button">
                <le-button type="cancel" value="<#取消#>" @click="handleClose"></le-button>
                <le-button type="save" value="<#保存#>" @click="handleSave"></le-button>
            </div>
        </le-dialog>
    </div>
</template>
<script>
import StoreDialog from "@pages/dialog/Store.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    props: {
        params: Object,
        action:String
    },
    data() {
        return {
            dialog: {
                showDialog: false,
                action: "create",
                idx: null,
            },
            store: {
                name: "",
                type: "array",
                url: "",
                reqType: "get",
                isCommon: false,
            },
        };
    },
    computed: {
        ...mapState(["dataSource", "pagesDatasource", "currentModule",'commonStore']),
        model() {
            return {
                name:this.params.name,
                props:this.params.props
            };
        },
        isEdit(){
            return this.action == "update"?true:false;
        }
    },
    components: {
        StoreDialog,
    },
    methods: {
        ...mapActions(["addModel", "updateModel"]),
        clearStore() {
            this.store = {
                name: "",
                type: "array",
                url: "",
                reqType: "get",
                isCommon: false,
            };
        },
        add() {
            this.model.props.push({
                type: "text",
                label: "",
                field: "",
            });
        },
        remove(i) {
            this.model.props.splice(i, 1);
        },
        showDatasource() {
            this.clearStore();
            this.dialog.showDialog = true;
        },
        handleSave() {
            this.$refs.store
                .submit()
                .then((res) => {
                    this.dialog.showDialog = false;
                })
                .catch((err) => {
                    console.log(err);
                    // this.dialog.showDialog = true;
                });
        },
        handleClose() {
            this.dialog.showDialog = false;
        },
        submit() {
            return new Promise((resolve, reject) => {
                this.$refs.model
                    .validate()
                    .then(() => {
                        if(this.model.props.length){
                            if (this.action == "create") {
                                this.addModel(this.model)
                                    .then(() => {
                                        resolve();
                                    })
                                    .catch((err) => {
                                        alert(err.msg);
                                        reject(err);
                                    });
                            } else {
                                this.updateModel({
                                    data: this.model,
                                    idx: this.params.idx,
                                });
                                resolve();
                            }
                        }else{
                            alert("the model must have a props at least")
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.propsList {
    border-bottom: 1px solid #dcdfe6;
    // margin-bottom: 20px;
    li {
        overflow-x: auto;
        display: flex;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 20px;
        overflow: visible;
    }
    .createBtn {
        text-align: center;
        border: none;
        line-height: 30px;
        background-color: #e0e0e0;
        margin-bottom: 0;
        font-weight: 900;
        background-color: #a2d469;
        color: #fff;
        font-size: 16px;

        i {
            width: 100%;
        }
    }
}
.mapItem {
    margin-bottom: 20px;
}
.item:last-child {
    border-bottom: none;
}
.addParams {
    width: 40px;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    cursor: pointer;
}
.asBtn {
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
}
.asBtn.remove {
    background-color: #f4364c;
    border-color: #f4364c;
}
.asBtn.create {
    background-color: #49cfad;
    border-color: #49cfad;
}
</style>