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
        <le-dialog title="create Store" v-model="dialog.showDialog">
            <div slot="body">
                <le-form ref="store">
                    <le-input
                        label="storeName:"
                        msg="请输入storeName"
                        v-model="storeName"
                        on
                        required
                    ></le-input>
                    <le-local-select
                        label="storeType:"
                        msg="请输入storeType"
                        v-model="storeType"
                        on
                        required
                        :data-source="dataSource.storeType"
                        display-name="name"
                        display-value="code"
                    ></le-local-select>
                    <div class="form-item">
                        <le-radio-list 
                            on 
                            required 
                            msg ="please select StoreType"
                            label="selectType:"
                            :data-source="dataSource.storeTypeUrl"
                            display-name="name"
                            display-value="code"
                        >
                        </le-radio-list>
                    </div>
                    <le-input
                        label="storeTypeURL:"
                        msg="请输入storeTypeURL"
                        v-model="storeTypeURL"
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
        <div class='le_table_container'>
            <table>
                <thead>
                    <tr>
                        <th>Store Name</th>
                        <th>Store Type</th>
                        <th>Select StoreType Url</th>
                        <th>Store Type Url</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-if="storeArr.length==0?false:isTrue">
                    <tr v-for="(item,idx) in storeArr" :key="idx">
                        <td>{{item.name}}</td>
                        <td>
                            <le-button type="remove" value="删除"></le-button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else style="width:100%;">
                    <tr style="width:100%;text-align:center;">
                        <td colspan="5">
                            暂无数据
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    name:"storeManage",
    props:{
        storeArr:{
            type:Array
        }
    },
    data(){
        return {
            isTrue:false,
            dialog:{
                showDialog:false,
            },
            storeName:"",
            storeTypeURL:"",
        }
    },
    computed: {
        ...mapState(["dataSource"])
    },
    methods:{
        ...mapActions(["addStore"]),
        add(){
            this.dialog.showDialog = true;
        },
        handleSave() {
            this.$refs.store
                .validate()
                .then(res => {
                    if (res.success) {
                        this.addStore(this.storeName,dataSource.storeType,dataSource.storeTypeUrl,this.storeTypeURL);
                        this.dialog.showDialog = false;
                        this.storeName = "";
                    }
                })
                .catch(err => {
                    this.alert.showAlert("error", err.info[0]);
                });
        },
        handleClose() {
            this.dialog.showDialog = false;
            this.storeName = "";
        }
    }
}
</script>
<style lang="scss" scoped>
    .head{
        position: relative;
        display: flex;
        width: 100%;
        transition: transform 0.3s;
        .le_page_name{
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
    .le_table_container{
        width: 100%;
        table{
            width: 100%;
            thead{
                width: 100%;
                th{
                    width: 20%;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    border-right: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                    border-bottom: 1px solid #ccc;
                }
            }
            tbody{
                width: 100%;
                tr{
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    td{
                        width: 20%;
                        text-align: center;
                        border-right: 1px solid #ccc;
                        border-left: 1px solid #ccc;
                    }
                }
            }
        }
    }
</style>