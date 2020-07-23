<template>
    <div class="le_comps_core_css">
        <div class="head">
            <h4 class="le_page_name" style="text-align:center;">Service Management</h4>
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
                        <th>URL Name</th>
                        <th>RequestType</th>
                        <th>URL</th>
                        <th>PageName</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(item,idx) in sevices" :key="idx">
                        <td>{{item.name}}</td>
                        <td>{{item.reqType}}</td>
                        <td>{{item.url}}</td>
                        <td>{{item.pageName}}</td>
                        <td>
                            <le-button type="update" value="modify" @click="update(item,idx)"></le-button>
                            <le-button type="remove" value="delete" @click="del(item,idx)"></le-button>
                        </td>
                    </tr>
                    <tr v-show="!sevices.length" style="width:100%;height:60px;line-height:60px;text-align:center;">
                        <td colspan="6">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <ServiceDialog 
            :title="dialog.title" 
            :showDialog="dialog.showDialog" 
            :params="dialog.params"
            :idx="dialog.idx"
            @cancel="this.handleClose"
            @confirm="this.handleSave"
        ></ServiceDialog>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import ServiceDialog from "@pages/dialog/Service.vue";
export default {
    name: "serviceManage",
    props: {
        sevices: {
            type: Array
        }
    },
    components:{
        ServiceDialog
    },
    data() {
        return {
            dialog: {
                showDialog: false,
                title:"",
                action:"",
                params:null,
                idx:null,
            },
            service: {
                name: "",
                url: "",
                reqType: "get",
                pageName:"",
            },
        };
    },
    computed: {
        ...mapState(["dataSource"])
    },
    methods: {
        ...mapActions(["addService", "removeService", "updateService"]),
        add() {
            this.clearService();
            this.dialog.showDialog = true;
            this.dialog.title = "create Service";
            this.dialog.action = "create";
            this.dialog.params = this.service;
        },
        update(item, idx) {
            this.service = {...item};
            this.dialog.showDialog = true;
            this.dialog.title = "edit Service";
            this.dialog.action = "update";
            this.dialog.params = this.service;
            this.dialog.idx = idx;
        },
        //删除
        del(item, idx) {
            this.alert.showConfirm("Are you sure you want to do this?", () => {
                this.removeService(idx);
            });
        },
        
        handleSave(idx) {
            let service = {
                name:this.dialog.params.name,
                reqType:this.dialog.params.reqType,
                url:this.dialog.params.url,
                pageName:this.dialog.params.pageName
            };
            if(this.dialog.action === "create"){
                this.addService(service);
            }else{
                this.updateService({data:service,idx:idx});
            }
            this.dialog.showDialog = false;
        },
        handleClose() {
            this.dialog.showDialog = false;
        },
        clearService(){
            this.service = {
                name: "",
                url: "",
                reqType: "get",
                pageName:"",
            }
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