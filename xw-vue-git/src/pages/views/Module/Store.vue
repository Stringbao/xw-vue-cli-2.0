<template>
    <div class="le_comps_core_css">
        <div class="head">
            <h4 class="le_page_name">Store Management</h4>
            <button class="tab_add" @click="add">
                <span role="img" class="actions_add">
                    <i class="iconfont icon-add"></i>
                </span>
            </button>
        </div>
        <div class="le_table_container">
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>type</th>
                        <th>url</th>
                        <th>Request Type</th>
                        <th>isCommon</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(item,idx) in privateStores.concat(commonStores)" :key="idx">
                        <td>{{item.name}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.url}}</td>
                        <td>{{item.reqType}}</td>
                        <td>{{item.isCommon}}</td>
                        <td>
                            <le-button type="update" value="modify" @click="update(item,idx)"></le-button>
                            <le-button type="remove" value="delete" @click="del(item,idx)"></le-button>
                        </td>
                    </tr>
                    <tr v-if="!privateStores.concat(commonStores).length" style="width:100%;height:60px;line-height:60px;text-align:center;">
                        <td colspan="6">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <le-dialog :title="dialog.dialogTitle" v-model="dialog.showDialog" width="700" height="600">
            <div slot="body">
                <StoreDialog v-if="dialog.showDialog" :index="dialog.index" :store="store" :action="dialog.action" :idx="dialog.idx" ref="store" />
            </div>
            <div slot="button">
                <le-button type="cancel" value="<#取消#>" @click="handleClose"></le-button>
                <le-button type="save" value="<#保存#>" @click="handleSave"></le-button>
            </div>
        </le-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import StoreDialog from "@pages/dialog/Store.vue";
export default {
    name: "storeManage",
    props: {
        privateStores: {
            type: Array
        },
        commonStores: {
            type: Array
        }
    },
    components:{
        StoreDialog
    },
    data() {
        return {
            dialog: {
                showDialog: false,
                action:"",
                idx:null,
                dialogTitle:""
            },
            store: {
                name: "",
                type: "array",
                url: "",
                reqType: "get",
                isCommon:false,
            },
        };
    },
    computed: {
        ...mapState(["dataSource"]),

    },
    methods: {
        ...mapActions(["addStore", "removeStore"]),
        clearStore(){
            this.store = {
                name: "",
                type: "array",
                url: "",
                reqType: "get",
                isCommon: false,
            }
        },
        add() {
            this.clearStore()
            this.dialog.showDialog = true;
            this.dialog.dialogTitle = "Create Store";
            this.dialog.action = "create";
        },
        del(item, idx) {
            this.alert.showConfirm("Are you sure you want to do this?", () => {
                this.removeStore({idx,...item});
            });
        },
        update(item, idx) {
            this.clearStore();
            this.store = {...item};
            // this.store = item;
            this.dialog.showDialog = true;
            this.dialog.dialogTitle = "Update Store";
            this.dialog.action = "update";
            this.dialog.idx = idx;
        },
        handleSave() {
            this.$refs.store.submit().then((res)=>{
                this.dialog.showDialog = false;
                this.$forceUpdate();
            }).catch(err=>{
                console.log(err)
                // this.dialog.showDialog = true;
            })
        },
        handleClose() {
            this.dialog.showDialog = false;
        }
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
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
.le_table_container {
    width: 100%;
    table {
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
}
</style>