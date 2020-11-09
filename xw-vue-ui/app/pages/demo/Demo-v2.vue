<template>
    <div>
        <div class="le_comps_core_css">
            <h4 class="le_page_name">title</h4>
            <div class="le_list_breadcrumb_pannel">
                <a href="">Product Management > <b>category</b></a>
            </div>
            <div class='le_list_search_pannel clearfix'>
                <le-form ref='form1' labelWidth="80">
                    <!-- <div class="col2">
                        <le-input @change='change1' @focus="fc" on required :rules="allRules" :msg="msg1"  label="订单:" v-model="entity.code"></le-input>
                    </div>
                    <div class="col2">
                        <le-input type='password' ref="input1" on :max="5" :min="1" :msg="msg2"  label="编号:" v-model="entity.name"></le-input>
                    </div>
                    <div class="col2">
                        <container></container>
                    </div>
                    
                    <div class="col2">
                        <le-checkbox-list readonly on required :max="2" label="爱好:" :data-source="hobbies" display-name="name" :msg="hobbyRules" display-value="code" v-model="entity.hobby"></le-checkbox-list>
                    </div>
                    <div class="col2">
                       <le-radio-list on required msg="性别不能为空" label="性别:" :data-source="sexes" display-name="name" display-value="code" v-model="entity.sex"></le-radio-list> 
                    </div>
                    <div class="col2">
                        <le-textarea on required :max="10" :msg="descriptionRules" placeholder="请输入详细地址" label="详细地址:" v-model="entity.description"></le-textarea>
                    </div> -->
                    <!-- <div class="col2">
                        <le-local-select on required label="选择职业:" :data-source="occupations" display-name="name" display-value="code" v-model="entity.job"></le-local-select> 
                    </div> -->

                    <!-- <div class="col2">
                        <le-upload-file :options="imgUploadOpt" label="学生文件:"
                            on required mag="学生文件必须上传"
                            v-model="entity.uploadFileStr" ref="ref1"
                        ></le-upload-file>
                    </div> -->
                    <!-- <le-date-time-picker on required label="日期组件" msg="error date" v-model="entity.date"></le-date-time-picker> -->

                </le-form>
                <le-button @click="submit" value="验证"></le-button>
                <le-button @click="reset" value="reset"></le-button>
                <div>
                    <div class="le_table_container">
                        <table-list
                            title="product Management List Table"
                            ref="tableListRef"
                            :options="list_table_options"
                        ></table-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Container from "./container.vue";
import {$obj} from "../../../src/tool/util.js";
const asyncRequest = (data)=>{
    return new Promise((resolve,reject)=>{
        debugger;
        data.data.forEach((x, idx) => {
            x.__id = idx + 1;
        });
        resolve(data);
    })
}
export default {
    components:{Container},
    data() {
        return {
            imgUploadOpt: {
                multiple: true,
                url: "/file/img/upload",
                size: "15",
                vtype: "xlsx",
                msg : "请上传文件!" ,
                tip : "学生文件必传",
                fname: "file",
                analysis: (d) => {
                    return d.data;
                }
            },
            entity:{
                code:"",
                name:"",
                hobby:"",
                sex:"",
                description:"",
                job:"",
                // uploadFileStr:"//p1.lefile.cn/fes/cms/2020/10/31/p8ei0svf0vjuk21e6zg92iatjt2s93951371.xlsx",
                uploadFileStr:"",
                date:''
            },
            occupations:[
                {name:"工作1",code:1},
                {name:"工作2",code:2},
                {name:"工作3",code:3},
                {name:"工作4",code:4}
            ],
            descriptionRules:{
                required:"description not be null",
                max:"description must be less than 10"
            },
            sexes:[
                {name:"👨男",code:1},
                {name:"👩女",code:0}
            ],
            hobbies:[
                { name:"足球⚽️",code:1, convert:(node, comp)=>{
                }},
                { name:"篮球🏀",code:2 },
                { name:"羽毛球🏸️",code:3 }
            ],
            hobbyRules:{
                required:"hobby is not be null",
                max:"hobby must be less than 2 "
            },
            msg1:{
                checkA:"checkA can not be null",
                checkB:"checkB can not be null",
                required:"xxx is required"
            },
            msg2:{
                max:"最大5个字符",
                min:"最小1个字符"
            },
            allRules:{
                checkA:this.checkA,
                checkB:this.checkB
            },
            list_table_options: {
                map: [
                    {key:"productNumber",val:"Product  Number"},
                    {key:"productName",val:"Product  Name"},
                    {key:"countryCode",val:"Product  Country"},
                    {key:"productType",val:"Product  Type"},
                ],
                getUrl: () => {
                    return `/productAPI/admin/product/getProductList.jhtm`;
                },
                pageOption: {
                    sizeKey: "pageSize",
                    indexKey: "pageNum",
                    index: 1,
                    size: 10,
                },
                actions: [
                    { key:"create",val:"Detail/Modify"}
                ],
                analysis: (data) => {
                    return new Promise((resolve, reject)=>{
                        asyncRequest(data).then(res=>{
                            if (res && res.data && res.data.data) {
                                resolve(
                                    {
                                    data: res.data.data,
                                    count: res.data.size,
                                }
                                );
                            } else {
                                resolve(
                                    { data: [], count: 0 }
                                );
                            }
                        }).catch(err=>{

                        }); 
                    })
                },
            },
        }
    },
    methods: {
        convertImg(col,row){
            const h = this.$createElement;
            let vnode = h('div',{
                attrs: {
                    id: 'foo'
                },
                domProps: {
                    innerHTML: 'baz'
                },
            });
            return vnode;
            // console.log(vnode);
            // console.log(vnode.el);
            
            // return `<img src="${row.imageAddress}">`;
        },
        checkA(){
            // if(this.entity.code.indexOf('a') == -1){
            //     return false;
            // }
            return true;
        },
        checkB(){
            // if(this.entity.code.indexOf('b') == -1){
            //     return false;
            // }
            return true;
        },
        submit(){
            this.$refs['form1'].validate().then(res=>{
                console.log(66666)
            }).catch(err=>{
                console.log(7777)
            })
        },  
        change1(){
            
        },
        reset(){
            this.$refs['form1'].reset();
        },
        fc(e){
            
        }
    },
    mounted(){
        // this.$refs['input1'].focus();
    }
};
</script>
<style lang="scss" scoped>
fieldset:not(:first-child) {
    margin-top: 30px;
}
</style>