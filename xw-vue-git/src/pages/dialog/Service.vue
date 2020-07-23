<template>
    <le-dialog class="service" :title="title" @closeCallback="cancel" v-model="showDialog" width="700" height="400">
        <div slot="body">
            <le-form ref="servicesForm" v-if="params">
                <le-input on required :readonly="params.stype == 1" label="name:" v-model="params.name"></le-input>
                <div class="form-item">
                    <le-radio-list
                        on
                        required
                        msg="please select RequestType"
                        label="type:"
                        :data-source="dataSource.requestType"
                        display-name="name"
                        display-value="code"
                        v-model="params.reqType"
                    ></le-radio-list>
                </div>
                <div class="form-item">
                    <le-local-select
                        msg="please select pageName"
                        label="pageName:"
                        :data-source="currentModule.Pages"
                        display-name="pageName"
                        display-value="pageName"
                        v-model="params.pageName"
                    ></le-local-select>
                </div>
                <le-input on required label="url:" v-model="params.url"></le-input>
            </le-form>
        </div>
        <div slot="button">
            <le-button type="cancel" value="<#取消#>" @click="cancel"></le-button>
            <le-button type="save" value="<#保存#>" @click="confirm"></le-button>
        </div>
    </le-dialog>
</template>
<script>
import { mapState } from "vuex"
export default {
    props:{
        showDialog:Boolean,
        title:String,
        idx: Number,
        params:{
            type:Object,
        },
    },
    data() {
        return {};
    },
    computed:{
        ...mapState(["dataSource","currentModule"])
    },
    methods:{
        confirm(){
            let that=this;
            if(this.$listeners.confirm){
                this.$refs.servicesForm.validate().then(()=>{
                    this.$listeners.confirm(that.idx);
                }).catch(err=>this.alert.showAlert("error", err.info))
            }
        },
        cancel(){
            if(this.$listeners.cancel){
                this.$listeners.cancel();
            }
        }
    },
};
</script>
<style >
    
</style>