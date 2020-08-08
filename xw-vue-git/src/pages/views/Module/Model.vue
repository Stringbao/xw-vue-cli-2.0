<template>
    <div class="le_comps_core_css">
        <div class="head">
            <h4 class="le_page_name" style="text-align:center;">Model Management</h4>
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
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,idx) in modelList" :key="idx">
                        <td>{{item.name}}</td>
                        <td>
                            <le-button type="update" value="modify" @click="update(item,idx)"></le-button>
                            <le-button type="remove" value="delete" @click="del(item,idx)"></le-button>
                        </td>
                    </tr>
                    <tr
                        v-show="!modelList.length"
                        style="width:100%;height:60px;line-height:60px;text-align:center;"
                    >
                        <td colspan="6">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <le-dialog title="Model" v-model="dialog.showDialog" width="1100" height="600">
            <div slot="body">
                <ModelDialog v-if="dialog.showDialog" :action="dialog.action"  ref="model" />
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
import ModelDialog from "@pages/dialog/Model.vue";
export default {
    props: {},
    data() {
        return {
            dialog:{
                showDialog:false,
                action:"create"
            },
            
        };
    },
    components:{
        ModelDialog
    },
    methods: {
        add() {
            this.dialog.showDialog = true;
        },
        update() {},
        del() {},
        handleSave(){},
        handleClose(){
            this.dialog.showDialog = false
        }
    },
    computed: {
        ...mapState(["modelList"]),
    },
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