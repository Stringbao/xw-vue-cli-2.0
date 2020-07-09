<template>
    <div class="le_comps_core_css">
        <h4 class="le_page_name">销售通路列表</h4>
        <div class='le_list_search_pannel clearfix'>
            <div class="col3">
                <le-local-select label="<#销售通路#>:" v-model="searchModel.channelCode" :data-source="salesRoute" display-name="channelName" display-value="code"></le-local-select>
                <le-input label="<#MTM#>:" v-model="searchModel.materialNumber"></le-input>
            </div>
        </div>
        <div class="le_search_btn_group cleatfix">
            <le-button type="search" value="<#搜索#>" @click="searchBtn"></le-button>
            <le-button type="create"  value="<#新增#>" @click="createBtn"></le-button>
        </div>
        <div class='le_table_container'>
            <table-list title="<#销售通路列表#>" ref='salesChannel_list_ref' :options='list_table_options'></table-list>
        </div>
    </div>
</template>
<script>

import KEYS from "@constant/index.js";

import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions,mapMutations } = createNamespacedHelpers('salesStore');
export default {
    name:"salesChannel_list",
    data(){
        return {
            // 搜索条件
            searchModel:{
                channelCode : "",
                materialNumber : "",
            },
            // 表格的配置
            list_table_options:{
                showCk:false,
                singleSelected:false,
                map:[
                    {key:"channelCode",val:"<#Sale Channel#>"},
                    {key:"materialNumber",val:"<#Material#>"},
                    {key:"updateBy",val:"<#Update Operator#>"},
                    {key:"updateTime",val:"<#Update Time#>"},
                ],
                getUrl:() => {
                    return  "/productAPI/index/queryList/183?";
                },
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"currentPage",
                    index:1,
                    size:20
                },
                actions:[
                    {
                        key:"update",
                        val:"<#Modify#>",
                        action:this.updateBtn
                    },
                    {
                        key:"info",
                        val:"<#Detail#>",
                        action:this.detailInfo
                    }
                ],
                analysis:(data)=>{
                    if(data && data.data && data.data.data){
                        return {
                            data:data.data.data,
                            count:data.data.totalNum
                        }
                    }else{
                        return {
                            data:[],
                            count:0
                        }
                    }
                }
            }
        }
    },
    computed:{
        ...mapState(["salesRoute"])
    },
    methods:{
        ...mapMutations([
            
        ]),
        ...mapActions([
            "getSalesRoute"
        ]),
        searchBtn(){
            this.$refs["salesChannel_list_ref"].search();
        },
        createBtn(){
            this.$router.push({path:'/saleList/0/'+KEYS.SALES.ACTION_ADD});
        },
        updateBtn(item){
            this.$router.push({path:'/saleList/'+item.code + "/"+KEYS.SALES.ACTION_EDIT,query:{data:item}});
        },
        detailInfo(item){
            this.$router.push({path:'/saleList/'+item.code+"/"+KEYS.SALES.ACTION_DETAIL,query:{data:item}});
        }
    },
    mounted(){
        this.getSalesRoute();
    }
}
</script>
<style scoped>
    
</style>