<template>
    <le-form labelWidth='100' ref="saveForm">
        <div>
            <le-radio-list 
                readonly
                label="hasDialog" 
                :data-source="hasDialog" display-name="name" display-value="code" 
                v-model="page.hasDialog">
            </le-radio-list>
            <le-local-select
                label="modelName:"
                class="pagesType"
                :data-source="currentModule.modelList"
                display-name="name"
                display-value="name"
                v-model="page.model"
        ></le-local-select>
            <le-input on required msg="请输入页面名称"
                tip="提示: 页面名称必须以.vue结尾"
                label="PageName:" v-model="page.pageName"></le-input>
        </div>
    </le-form>
    
</template>
<script>
import Util from "@util/util.js";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data(){
        return {
            hasDialog:[
                { name: "Yes", code: true },
                { name: "No", code: false },
            ],
        }
    },
    props: {
        action:{
            type: String
        },
        page:{
            type : Object
        },
        dataSource : {
            type : Array
        },
        idx : {
            type : Number
        }
    },
    computed:{
        ...mapState(["modules","pagesDatasource","currentModule"]),
        ...mapMutations([]),
    },
    components:{},
    methods:{
        ...mapActions(["addPages","updatePages","addStore"]),
        //添加model
        addModel(){
            let obj = {
                label: "",
                type: "text",
                field: "",
            };
            this.page.model.push(obj)
        }, 
        //删除model
        removeCurModelItem(item,idx){
            this.page.model.splice(idx, 1)
        },
        save(){
            let that = this;
            let res = this.$refs.saveForm.validate()
                .then(res=>{
                    that.page.type = "save";
                    let reg = /^.*\.vue$/; 
                    if(reg.test(that.page.pageName)){
                        that.page.pageName.replace(/\s/, "");
                        if(that.action == "create"){ 
                            that.addPages(that.page).then(re=>{
                                that.$emit("closePageDialog");
                            }).catch(error=>{
                                that.alert.showAlert("error",error.msg)
                            })  
                        }else{
                            that.updatePages({page:that.page,idx:that.idx}).then(res=>{
                                that.$emit("closePageDialog");
                            }).catch(error=>{
                                that.alert.showAlert("error",error.msg)
                            })
                        };
                    }else{
                        that.alert.showAlert("error","页面名称必须以.vue结尾");
                    };
                })
                .catch(error => {
                    that.alert.showAlert("error", "请填写所有的必填项");
                })
        },
        close(){
            this.$emit("closePagesDialog");
        }
    },
    mounted(){
        console.log(this.page)
    }
}
</script>

<style lang="scss" scoped>
.label{
    font-weight: 600;
    font-size: 16px;
}
.configItem{
    border: 1px solid#dcdfe6;
    border-top:none ;
    margin: 10px 0;
    border-radius: 3px;
    .configItem-title {
        border-bottom: 1px solid #dcdfe6;
        border-top: 1px solid #dcdfe6;
        margin-bottom: 20px;
        height: 43px;
        line-height: 43px;
        text-align: center;
    }
    .item{
        border-bottom: 1px solid #dcdfe6;
        // margin-bottom: 20px;
        li{
            overflow-x: auto;
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-bottom: 20px;
            overflow: visible;
        }
        .createBtn{
            text-align: center;
            border: none;
            line-height: 30px;
            margin-bottom: 0;
            font-weight: 900;
            background-color: #a2d469;
            color:#fff;

            i{
                width: 100%;
            }
        }
    }
    .item:last-child{
        border-bottom: none;
    }
    .asBtn{
        // padding-left: 10px;
    }
    .addParams{
        width: 40px;
        height: 100%;
        border-left: 1px solid #dcdfe6;
        cursor: pointer;
    }
}
</style>