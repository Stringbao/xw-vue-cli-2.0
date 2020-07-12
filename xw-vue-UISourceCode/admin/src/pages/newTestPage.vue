<template>
    <!-- 总的容器 le_comps_core_css -->
    <div class="le_comps_core_css">
        <!-- 页面标题 le_page_name -->
        <h4 class="le_page_name">新的样式测试页面</h4>
        <!-- 查询条件容器 le_list_search_pannel -->
        <div class='le_list_search_pannel clearfix'>
            <div class="col1">
                <le-input placeholder="Order Number" labelWidth="120" label="订单编号:" v-model="searchModel.orderCode"></le-input>
            </div>
            <div class="col3">
                <le-local-select placeholder="请选择" labelWidth="120" label="商城商城商城商城商城商城商城商城商城商城商城商城:" :data-source="shops" v-model="searchModel.shop" display-name="val" display-value="key"></le-local-select>
                <le-local-select placeholder="请选择就才能到机场南大街" labelWidth="120" label="商城:" :data-source="shops" v-model="searchModel.shop" display-name="val" display-value="key"></le-local-select>
                <le-local-select placeholder="请选择" labelWidth="120" label="商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城商城:" enabledInput :data-source="shops" v-model="searchModel.shop" display-name="val" display-value="key"></le-local-select>
            </div>
            <div class="col3">
                <le-date-picker placeholder="Order Date" labelWidth="120" label="日期组件" v-model="searchModel.date"></le-date-picker>
                <le-time-picker placeholder="Order Time" labelWidth="120" label="时间组件" v-model="searchModel.tiem" v-show="true"></le-time-picker>
                <le-time-picker labelWidth="120" label="时间组件" v-model="searchModel.tiem" v-show="true"></le-time-picker>
            </div>
            <div class="col4">
                <!-- <le-date-picker labelWidth="120" label="日期组件" v-model="searchModel.date"></le-date-picker> -->
                <le-time-picker labelWidth="120" label="时间组件" v-model="searchModel.tiem" v-show="true"></le-time-picker>
                <!-- <le-date-picker labelWidth="120" label="日期组件" v-model="searchModel.date"></le-date-picker> -->
                <le-time-picker labelWidth="120" label="时间组件" v-model="searchModel.tiem" v-show="true"></le-time-picker>
            </div>
        </div>
        <!-- 查询条件按钮组 le_search_btn_group-->
        <div class="le_search_btn_group cleatfix">
            <le-button type="create" value="新建" @click="add"></le-button>
            <le-button type="info" value="详情" @click="detailInfo"></le-button>
            <le-button type="save" value="添加商城" @click="showDialogContent"></le-button>
            <le-button type="update" value="修改" @click="update"></le-button>
            <le-button type="remove" value="删除"></le-button>
        </div>

        <!-- tableList容器 le_table_container -->
        <div class='le_table_container'>    
            <table-list title="黑名单列表" ref='black_list_table' :options='tableOptions'></table-list>
        </div>

        <le-dialog title="新建弹层" height="80vh" width="1000" v-model="showDialog" @closeCallback="closeDialog">
            <div slot="body">
                <le-form labelWidth='180' ref="saveForm">
                    <div class="le_form_row_item">
                        <le-input labelWidth='150' vType="decimals" on msg="只允许输入数字" tip="请输入身份证号码" label="身份证号码" :readonly="readonly" v-model="entity.id"></le-input>
                        <le-button v-show="hideAllTag" type="create" value="显示提醒" @click="showAlert"></le-button>
                    </div>
                    <le-input labelWidth='150' tip="输入省市区的详细信息" label="地址" :readonly="readonly" on required msg="地址必填" v-model="entity.address"></le-input>
                    <le-textarea  labelWidth='150' tip="详细信息描述文案不能瞎写" placeholder="请输入详细地址" label="详细地址" :readonly="readonly" msg="详细地址必填" v-model="entity.content" on></le-textarea>
                    <div class="col4" v-show="hideAllTag">
                        <!-- <le-date-picker labelWidth='150' tip="输入当前之后的日期" on placeholder="请选择日期" label="开始日期组件" :readonly="readonly" msg="日期不允许为空" v-model="entity.date"></le-date-picker> -->
                        <le-button type="create" value="测试按钮"></le-button>
                        <le-time-picker labelWidth='30' label="至" tip="输入当前之后的时间" on placeholder="请选择时间" :readonly="readonly" msg="时间不允许为空" v-model="entity.time"></le-time-picker>
                    </div>
                    <!-- <le-date-time-picker v-show="hideAllTag" @changeDateTime="update1" labelWidth='150' tip="输入当前之后的日期和事件" on placeholder="请选择日期时间" label="时间日期组件" :readonly="readonly" msg="日期and时间不允许为空" v-model="entity.datetime"></le-date-time-picker>            -->
                    <!-- <le-local-select labelWidth='150' tip="职业选择2个" on label="选择职业" msg="职业必填" :readonly="readonly" :data-source="shops" multiple display-name="val" display-value="key" v-model='entity.job'></le-local-select>  -->
                    <le-radio-list labelWidth='150' tip="性别男或女" on label="性别" display-name="name" :readonly="readonly" :data-source="sex" ref='dialogSexRef' msg="性别必须选择" display-value="code" v-model="entity.sex"></le-radio-list>
                    <le-checkbox-list labelWidth='150' tip="请选择一个或多个爱好" on label="爱好" :readonly="readonly" :data-source="fav" display-name="name" msg="爱好必须选择" display-value="code" v-model="entity.fav"></le-checkbox-list>     
                </le-form>
            </div>
            <div slot="button">
                <le-button type="cancel" value="取消" @click="closeDialog"></le-button>
                <le-button type="save" value="保存" @click="save"></le-button>
                <le-button type="remove" value="删除" @click="removeItem"></le-button>
                <le-button type="approve" value="隐藏所有组件" @click="hideAll"></le-button>
                <le-button type="cancel" value="禁用" @click="disabledAll"></le-button>
            </div>
        </le-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            hah:false,
            searchModel:{
                orderCode:'',
                shop:'',
                date:"",
                dateTime:'',
                data:'',
                time:'',
                sex:'',
                fva:''
            },
            entity:{
                age:"",
                id:"",
                content:"",
                data:"",
                time:"",
                datetime:"",
                job:"2",
                sex:"1",
                fav:"3,4",
                url:"",
                address:""
            },
            tableOptions:{
                showCk:true,
                map:[
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"},
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"},
                    {key:"shop",val:"商城"},
                    {key:"accessField",val:"封禁纬度"},
                    {key:"content",val:"封禁内容"},
                    {key:"accessDesc",val:"禁用方式"},
                    {key:"status",val:"状态"},
                    {key:"operateTime",val:"修改时间"}
                ],
                ajaxType:"post",
                getParams:()=>{
                    return {
                        companyName:this.searchModel.age,
                        status:-1
                    }
                },
                getUrl:()=>{
                    return "/risk/limit/black/user/query/lst?isNeedAllCout=true&userName=&companyName="+this.searchModel.age+"&status=-1";
                },
                pageOption:{
                    sizeKey:"pageSize",
                    indexKey:"pageNum",
                    index:1,
                    size:10
                },
                actions:[
                    {
                        key:"update",
                        val:"编辑",
                        action:this.search,
                    },
                    {
                        key:"remove",
                        val:"注销",
                        action:this.search,
                    }
                ]
            },
            shops:[
                {val:'lenovo',key:"1"},
                {val:'lecoo',key:"2"},
            ],
            sex:[
                {name:'男',code:'1'},
                {name:'女',code:'2'},
            ],
            fav:[
                {name:'工作',code:'1'},
                {name:'学习',code:'2'},
                {name:'生活',code:'3'},
            ],
            showDialog:false,
            readonly:false,
            hideAllTag:true
        }
    },
    methods:{
        update(){
            this.alert.showConfirm("标题",()=>{
                this.alert.showAlert("success","成功");
            });
        },
        update1(){
            this.alert.showAlert("success","修改日期")
        },
        closeDialog(){
            
            this.showDialog = false;
        },
        showDialogContent(){
            this.$refs['saveForm'].reset();
            this.showDialog = true;
        },
        detailInfo(){
            this.$router.push({path:'/newTestPageAdd',query:{tag:'detailInfo'}})
        },
        add(){
            this.$router.push({path:'/newTestPageAdd'})
        },
        save(){
            let res = this.$refs.saveForm.validate();
            res.then(()=>{
                this.alert.showAlert("success","必填项全部填写了")
            }).catch((error)=>{
                this.alert.showAlert("error",'错误')
            })
        },
        showAlert(){
            this.alert.showNotify("error","请输入身份证号");
        },
        hideAll(){
            this.hideAllTag =! this.hideAllTag;
        },
        removeItem(){
            this.alert.showConfirm("删除",()=>{
                this.alert.showAlert("success","成功");
                this.alert.showNotify("success","成功")
            })
        },
        disabledAll(){
            this.readonly = !this.readonly;
        }
    }
}
</script>

<style scoped>
</style>