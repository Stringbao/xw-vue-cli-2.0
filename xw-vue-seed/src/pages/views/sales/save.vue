<template>
    <div class="le_comps_core_css new_page_width">
        <le-form ref="saveForm" labelWidth = "180" class = "formContent">
            <le-local-select :readonly="isEdit() || isDetail()" on required msg="<#please input Sale Channel#>"  label="<#Sale Channel#>:" v-model="salesModel.channelCode" :data-source="salesRoute" display-name="channelName" display-value="code"></le-local-select>
            <le-textarea style="height:200px;" :readonly="isDetail()" tip="<#Tip: Multiple codes separated by commas，MAX 500 product#>" on required msg="<#请输入物料编码#>" label="<#Material#>" v-model="salesModel.materialNumber"></le-textarea>
            <div v-show="isDetail()">
                <le-input readonly label="<#Creator#>:" v-model="salesModel.createBy"></le-input>
                <le-input readonly label="<#Create DateTime#>:" v-model="salesModel.createTime"></le-input>
                <le-input readonly label="<#Update Operator#>:" v-model="salesModel.updateBy"></le-input>
                <le-input readonly label="<#Modify DateTime#>:" v-model="salesModel.updateTime"></le-input>
            </div>
            
        </le-form>
        <div class="le_new_page_btn_group">
            <le-button type = "back" value = "<#返回#>" @click = "goBack"></le-button>
            <le-button type = "save" v-if="isAdd() || isEdit()" value = "<#保存#>" @click = "saveBtn"></le-button>
        </div>
    </div>
</template>
<script>

import SalesModel from "@model/sales.js";
import SalesServices from "@services/sales.js";
import KEYS from "@constant/index.js";
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions,mapMutations } = createNamespacedHelpers('salesStore');
export default {
    name:"salesChannel_save",
    data(){
        return {
            salesModel:new SalesModel()
        }
    },
    computed:{
        ...mapState(["salesRoute"]),
        
    },
    methods:{
        ...mapActions([
            "doSave",
            "doUpdate",
            "getSalesRoute",
        ]),
        ...mapMutations([]),
        isAdd(){
            return this.$route.params.tag == KEYS.SALES.ACTION_ADD;
        },
        isEdit(){
            return this.$route.params.tag == KEYS.SALES.ACTION_EDIT;
        },
        isDetail(){
            return this.$route.params.tag == KEYS.SALES.ACTION_DETAIL;
        },
        goBack(){
            this.$router.go(-1);
        },
        saveBtn(){
            this.$refs.saveForm.validate().then(x => {
                SalesServices.save(this.salesModel).then(res=>{
                    this.alert.showAlert("success",res.msg);
                    this.goBack();
                }).catch(err=>{
                    this.alert.showAlert("error",err.msg);
                })
            })
        }
    },
    mounted(){
        this.getSalesRoute();

        if(!this.isAdd()){
            this.salesModel.set(this.$route.query.data);
        }
    }
}
</script>
<style scoped>
    .new_page_width{
        width:80%;
        margin:0 auto;
        margin-bottom: 50px;
    }
</style>
    