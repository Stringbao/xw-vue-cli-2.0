
<template>
    <div>
        <div class="le_comps_core_css">
            <!-- 项目配置 -->
            <div class='le_list_search_pannel clearfix'>
                <h1 style = "text-align:left;margin-left:10px;font-size:22px;"><i class = "fa fa-envira" style = "color:#28a509;"/>项目配置</h1>
                <div class="col3">
                    <le-local-select :readonly="baseReadOnly" v-model="project.projectPath" placeholder='选择项目' label="选择项目" :data-source="project.projects" display-name="projectName" display-value="projectPath"></le-local-select>
                    <le-input :readonly="baseReadOnly" v-model="project.moduleName" label="模块名称" placeholder="输入模块名称"></le-input>
                    <le-checkbox-list :readonly = "baseReadOnly" v-model = "project.isLayoutModule" label="是否layout" :data-source="project.layoutList" display-name="name" display-value="code"></le-checkbox-list>
                </div>
                <div class = "col3" style = "flex-direction: row-reverse;">
                    <le-button type="reset" value="清空模块配置文件" @click="resetConfig"></le-button>
                    <le-button type="publish" value="保存整个模块" @click="createModule"></le-button>
                    <le-button type="save" :disabled = "!baseReadOnly" value="保存子模块" @click="createModuleFile"></le-button>
                    <le-button type="create" :disabled = "!baseReadOnly" value="添加子模块" @click="showAddSubMoudle"></le-button>
                    <le-button value="添加模块" :disabled = "baseReadOnly || !proxySaveTag" type = "update"  @click="saveModule"></le-button>
                    <le-button value="保存代理" :disabled = "proxySaveTag" type = "save"  @click="saveProxy"></le-button>
                    <le-button value="添加代理" :disabled = "proxySaveTag" type = "create"  @click="addProxy"></le-button>

                </div>
                <div>
                    <div v-for = "(item,key) in proxyArr" :key = "key">
                            <div style = "text-align:left;font-size:14px;margin-top:15px;margin-bottom:10px;margin-left:1em;">
                                第{{key + 1}}组代理配置
                            </div>
                            <div class = "col2">
                                <le-input :readonly = "proxySaveTag" v-model = "item.key" label = "key:"></le-input>
                                <le-input :readonly = "proxySaveTag" v-model = "item.url" label = "url:"></le-input>
                                <le-button :disabled = "proxySaveTag" @click = "delRow(item,proxyArr)" type = "remove" value = "删除"></le-button>
                            </div>
                    </div>
                    <div>

                    </div>
                </div>
                
            </div>
            <!-- 页面配置 -->
            <transition name="toggleBox">
                <div v-show = "addSubModuleTag">
                    <h1 style = "text-align:left;margin-left:10px;font-size:22px;"><i class = "fa fa-envira" style = "color:#28a509;"/>模块接口配置</h1>
                    <div class = "col4"  style = "margin-top:10px">
                        <le-input v-for = "item in interfaceArr" :key = "item.name" v-model="item.url" :label="item.name"></le-input>
                    </div>
                    <h1 style = "text-align:left;margin-left:10px;font-size:22px;"><i class = "fa fa-envira" style = "color:#28a509;"/>页面配置</h1>
                    <div class="col3">
                        <le-input :readonly = "addingTag" v-model="listBtnConfig.subModulePath" tip="子模块路径:sub1/sub2" label="子模块路径"></le-input>
                        <le-input :readonly = "addingTag" v-model="listBtnConfig.pageName" tip="如person" label="文件名称"></le-input>
                        <le-radio-list :readonly = "addingTag" on label="文件类型" :data-source="config.fileTypes.dataSource" display-name="name" display-value="code" v-model="fileType"></le-radio-list>
                    </div>  
                    
                    <div class = "col3" style = "flex-direction: row-reverse;">
                        <le-button type="create" v-show = "!addingTag" value="添加页面" @click="addPage"></le-button>
                        <le-button type = "cancel" v-show = "addingTag" value="取消编辑页面" @click="cancelAdd"></le-button>
                        <le-button type = "holdSave" v-show = "addingTag" value="保存页面" @click="savePage"></le-button>
                    </div>
                </div>
            </transition>
            <!-- 列表页配置 -->
            <transition name="toggleBox">
            <div class='le_table_container' v-show="listConfigTag">
                <div>
                    <!-- 列表页配置 -->
                    <h1 style = "text-align:left;margin-left:10px;font-size:22px;"><i class = "fa fa-envira" style = "color:#28a509;"/>列表页配置</h1>
                    <div class="col3">
                        <le-input v-model="listBtnConfig.tableTitle" label="列表名称" placeholder="输入列表名称"></le-input>
                        <le-input v-model="listBtnConfig.colsCount" label="一行展示多少列" placeholder="输入列数"></le-input>
                        <le-checkbox-list label="是否有dialog" :data-source="config.dialog.dataSource" display-name="name" display-value="code" v-model="hasDialog"></le-checkbox-list>
                    </div>
                </div>
                <!-- 按钮配置 -->
                <div>
                    <h1>
                        <i class = "fa fa-envira" style = "color:#28a509;"/>
                        按钮配置
                        <le-button type="create" value="添加按钮" @click="addListPageButton"></le-button>
                    </h1>
                    <div class="col4">
                        
                        <table class="le-table">
                            <thead>
                                <tr class="title">
                                    <th>操作</th>
                                    <th>按钮名称</th>
                                    <th>按钮类型</th>
                                    <th>按钮事件名称</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,idx) in listBtnConfig.btns" :key="idx">
                                    <td>
                                        <div style="width:100px">
                                            <le-button type="remove" value="删除" @click="delRow(item,listBtnConfig.btns)"></le-button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.btnName" placeholder="按钮名称"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class='w200'>
                                            <le-local-select labelWidth="0" placeholder="选择按钮类型" :data-source="item.buttonTypes" display-name="name" display-value="code" v-model="item.btnType"></le-local-select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.btnHandle" placeholder="输入事件名称"></le-input>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- 搜索字段配置 -->
                <div>
                    <h1 style = "text-align:left;margin-left:10px;font-size:22px;">
                        <i class = "fa fa-envira" style = "color:#28a509;"/>
                        列表页搜索字段配置
                        <le-button type="create" value="添加搜索字段" @click="addSearchCols"></le-button>
                    </h1>
                    <div class='col4'>
                        <table class="le-table">
                            <thead>
                                <tr class="title">
                                    <th>操作</th>
                                    <th>字段类型</th>
                                    <th>字段名</th>
                                    <th>Label</th>
                                    <th>LabelWidth</th>
                                    <th>placeholder</th>
                                    <th>Url</th>
                                    <th>dataSource</th>
                                    <th>displayName</th>
                                    <th>displayValue</th>
                                </tr>
                            </thead>
                            <tr v-for="(item,idx) in listSearchColsConfig.cols" :key="idx">
                                <td>
                                    <div style="width:100px">
                                        <le-button type="remove" value="删除" @click="delRow(item,listSearchColsConfig.cols)"></le-button>
                                    </div>
                                </td>
                                <td>
                                    <div class='w200'>
                                        <le-local-select labelWidth="0" placeholder="选择字段类型" :data-source="item.fieldTypes" display-name="name" display-value="code" v-model="item.type"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.key" placeholder="接口字段名称(key)"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.label" placeholder="字段名称(label)"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.labelWidth" placeholder="labelWidth"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.placeholder" placeholder="输入placeholder"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.url" placeholder="URL" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.dataSource" placeholder="dataSource" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.displayName" placeholder="显示名称" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.displayValue" placeholder="服务端传值Key" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- dialog配置 -->
                <div v-show="hasDialog=='1'">
                    <h1 style = "text-align:left;margin-left:10px;font-size:22px;">
                        <i class = "fa fa-envira" style = "color:#28a509;"/>
                        Dialog表单配置
                        <le-button type="create" value="添加dialog表单列" @click="addDialogCols"></le-button>
                    </h1>
                    
                    <div class="col4">
                        <table class="le-table">
                            <thead>
                                <tr class="title">
                                    <th>操作</th>
                                    <th>字段类型</th>
                                    <th>字段名</th>
                                    <th>Label</th>
                                    <th>LabelWidth</th>
                                    <th>placeholder</th>
                                    <th>Url</th>
                                    <th>dataSource</th>
                                    <th>displayName</th>
                                    <th>displayValue</th>
                                    <th>tip</th>
                                    <th>开启验证</th>
                                    <th>是否必填</th>
                                    <th>验证类型</th>
                                    <th>msg</th>
                                </tr>
                            </thead>
                            <tr v-for="(item,idx) in form.cols" :key="idx">
                                <td>
                                    <div style="width:100px">
                                        <le-button type="remove" value="删除" @click="delRow(item,form.cols)"></le-button>
                                    </div>
                                </td>
                                <td>
                                    <div class='w200'>
                                        <le-local-select labelWidth="0" placeholder="请选择" :data-source="item.selectDataSource.typeDatsSource" display-name="name" display-value="code" v-model="item.type"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.key" placeholder="接口字段名称(key)"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.label" placeholder="字段名称(label)"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.labelWidth" placeholder="labelWidth"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.placeholder" placeholder="输入placeholder"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.url" placeholder="Ajax请求url" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.dataSource" placeholder="绑定数据源字段" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.displayName" placeholder="displayName" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.displayValue" placeholder="displayValue" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-model="item.tip" placeholder="tip"></le-input>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-local-select labelWidth="0" placeholder="is on" :data-source="item.selectDataSource.onDataSource" display-name="name" display-value="code" v-model="item.on"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-local-select labelWidth="0" v-show='item.on == "1"' placeholder="is required" :data-source="item.selectDataSource.requiredDatsSource" display-name="name" display-value="code" v-model="item.required"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-local-select labelWidth="0" v-show="item.type == 'text' && item.on == '1'" placeholder="input验证类型" :data-source="item.selectDataSource.valifyDataSource" display-name="name" display-value="code" v-model="item.valifyType"></le-local-select>
                                    </div>
                                </td>
                                <td>
                                    <div class="w200">
                                        <le-input labelWidth="0" v-show="item.on == '1'" v-model="item.msg" placeholder="错误提示信息"></le-input>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    <h1 style = "text-align:left;margin-left:10px;font-size:22px;"><i class = "fa fa-envira" style = "color:#28a509;"/>Table参数配置</h1>
                    <div class="col4">
                        <pre contenteditable  id="table_options" style = "text-align:left;font-size:16px;font-weight:800" ref = "table_options">
{
    showCk:true,
    map:[
        {key:"shop",val:"商城"},
        {key:"accessField",val:"封禁纬度"}
    ],
    getUrl:() => {
        return "/risk/limit/black/user/query/list";
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
            action:this.edit
        },
        {
            key:"remove",
            val:"删除",
            action:this.doRemove
        }
    ],
    analysis:(data)=>{
        if(data && data.data && data.data.data && data.data.data.dataList){
            return {
                data:data.data.data.dataList,
                count:data.data.data.count
            }
        }else{
            return {
                data:[],
                count:0
            }
        }
    }
}
                        </pre>
                    </div>
                </div>
            </div>
            </transition>
            <!-- save配置 -->
            <transition name="toggleBox">
                <div class="le_table_container" v-show="saveConfigTag">
                        <h1 style = "text-align:left;margin-left:10px;font-size:22px;">
                            <i class = "fa fa-envira" style = "color:#28a509;"/>save表单配置
                            <le-button type="create" value="添加表单列" @click="addFormCols"></le-button>
                        </h1>
                        <div class="col4">
                            <table class="le-table">
                                <thead>
                                    <tr class="title">
                                        <th>操作</th>
                                        <th>字段类型</th>
                                        <th>字段名</th>
                                        <th>Label</th>
                                        <th>LabelWidth</th>
                                        <th>placeholder</th>
                                        <th>Url</th>
                                        <th>dataSource</th>
                                        <th>displayName</th>
                                        <th>displayValue</th>
                                        <th>tip</th>
                                        <th>开启验证</th>
                                        <th>是否必填</th>
                                        <th>验证类型</th>
                                        <th>msg</th>
                                    </tr>
                                </thead>
                                <tr v-for="(item,idx) in saveForm.cols" :key="idx">
                                    <td>
                                        <div style="width:100px">
                                            <le-button type="remove" value="删除" @click="delRow(item,saveForm.cols)"></le-button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class='w200'>
                                            <le-local-select labelWidth="0" placeholder="请选择" :data-source="item.selectDataSource.typeDatsSource" display-name="name" display-value="code" v-model="item.type"></le-local-select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.key" placeholder="接口字段名称(key)"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.label" placeholder="字段名称(label)"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.labelWidth" placeholder="labelWidth"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.placeholder" placeholder="输入placeholder"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.url" placeholder="Ajax请求url" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.dataSource" placeholder="绑定数据源字段" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.displayName" placeholder="displayName" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.displayValue" placeholder="displayValue" v-show="item.type=='select' || item.type=='checkboxList' || item.type=='radioList'"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-model="item.tip" placeholder="tip"></le-input>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-local-select labelWidth="0" placeholder="is on" :data-source="item.selectDataSource.onDataSource" display-name="name" display-value="code" v-model="item.on"></le-local-select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-local-select labelWidth="0" v-show='item.on == "1"' placeholder="is required" :data-source="item.selectDataSource.requiredDatsSource" display-name="name" display-value="code" v-model="item.required"></le-local-select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-local-select labelWidth="0" v-show="item.type == 'text' && item.on == '1'" placeholder="input验证类型" :data-source="item.selectDataSource.valifyDataSource" display-name="name" display-value="code" v-model="item.valifyType"></le-local-select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="w200">
                                            <le-input labelWidth="0" v-show="item.on == '1'" v-model="item.msg" placeholder="错误提示信息"></le-input>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

import Unit from "../core/tool/commonUtil.js";
import Config from "./createConfig.js";
import Service from "./service.js";
import CommonUtil from '../core/tool/commonUtil.js';
export default {
    components: {
          
    },
    name:"H",
    data(){
        return {
            addSubModuleTag:false,
            listConfigTag:false,
            saveConfigTag:false,
            baseReadOnly:false,
            addingTag:false,
            proxySaveTag:false,
            fileType:"1",
            project:{
                projects:[],
                layoutList:[],
                projectPath:"",
                moduleName:"",
                isLayoutModule:false,
            },
            hasDialog:"1",
            config:Config,
            listBtnConfig:{
                subModulePath:"",
                tableTitle:"",
                pageName:"",
                colsCount:"",
                btns:[]
            },
            listSearchColsConfig:{
                cols:[]
            },
            
            form:{
                cols:[]
            },
            saveForm:{
                cols:[]
            },

            interfaceArr:[
                {
                    name:"save接口",
                    key:"doSave",
                    url:""
                },
                {
                    name:"detail接口",
                    key:"getDetail",
                    url:""
                },
                {
                    name:"remove接口",
                    key:"doRemove",
                    url:""
                },
                {
                    name:"update接口",
                    key:"doUpdate",
                    url:""
                },
                {
                    name:"getList接口",
                    key:"doGetList",
                    url:""
                }
            ],
            proxyArr:[],
        }
    },
    computed:{

    },
    methods:{
        // 添加dialog行
        addDialogCols(){
            let defaultCol = Unit.object.cloneObj(this.config.form.defaultCol);
            defaultCol.selectDataSource.typeDatsSource = Unit.object.cloneObj(this.config.enum.typeDatsSource);
            defaultCol.selectDataSource.requiredDatsSource = Unit.object.cloneObj(this.config.enum.requiredDatsSource);
            defaultCol.selectDataSource.onDataSource = Unit.object.cloneObj(this.config.enum.onDataSource);
            defaultCol.selectDataSource.valifyDataSource = Unit.object.cloneObj(this.config.enum.valifyDataSource);
            this.form.cols.push(defaultCol);
        },
        // 添加form行
        addFormCols(){
            ;
            let defaultCol = Unit.object.cloneObj(this.config.form.defaultCol);
            defaultCol.selectDataSource.typeDatsSource = Unit.object.cloneObj(this.config.enum.typeDatsSource);
            defaultCol.selectDataSource.requiredDatsSource = Unit.object.cloneObj(this.config.enum.requiredDatsSource);
            defaultCol.selectDataSource.onDataSource = Unit.object.cloneObj(this.config.enum.onDataSource);
            defaultCol.selectDataSource.valifyDataSource = Unit.object.cloneObj(this.config.enum.valifyDataSource);
            this.saveForm.cols.push(defaultCol);
        },
        // 添加一个按钮
        addListPageButton(){
            let tmp = Unit.object.cloneObj(this.config.searchPage.btn.defaultBtnPropertys);
            tmp.buttonTypes = Unit.object.cloneObj(this.config.searchPage.btn.buttonTypes);
            this.listBtnConfig.btns.push(tmp);
        },
        // 清空配置
        resetConfig(){
            Service.resetConfig({
                cb:()=>{
                    this.alert.showAlert("success","清空配置成功");
                }
            })
        },
        addProxy(){
            this.proxyArr.push(CommonUtil.object.cloneObj(this.config.webpackProxyConfig))
        },
        findProjectName(){
           let result =  this.project.projects.find(item => {
                return item.projectPath == this.project.projectPath
            })
            console.log(result);
            return result.projectName;
        },
        // 保存proxy配置
        saveProxy(){
            if(this.proxyArr.length <= 0){
                this.alert.showAlert("warning","至少添加一组代理配置");
                return ;
            }else{
                let __tag = false;
                this.proxyArr.forEach(item => {
                    if(item.key == "" || item.url == "")__tag = true;
                })
                if(__tag){
                    this.alert.showAlert("warning","代理中key或者url为空，请检查");
                    return;
                }
            }
            Service.saveProxy({
                params:{
                    projectPath:this.project.projectPath,
                    projectName : this.findProjectName(),
                    proxy:this.proxyArr,
                },
                cb:(d)=>{
                    this.proxySaveTag = true;
                    this.alert.showAlert("success","新增proxy成功!");
                }
            })
        },
        // 添加模块
        saveModule(){
            if(!this.project.projectPath || !this.project.moduleName){
                this.alert.showAlert("warning","必须输入项目和模块名称!");
                return;
            }
            
            Service.saveModule({
                params:{
                    moduleName:this.project.moduleName.trim(),
                    projectPath:this.project.projectPath,
                    projectName : this.findProjectName(),
                },
                cb:(d)=>{
                    ;
                    this.baseReadOnly = true;
                    this.alert.showAlert("success","新增成功Module文件夹!");
                }
            })
        },
        // 保存整个项目
        createModule(){
            if(!this.project.projectPath){
                this.alert.showAlert("warning","项目不能为空!");
                return;
            }
           
            Service.createModule({
                params:{
                    projectPath:this.project.projectPath,
                    isLayout : this.project.isLayoutModule,
                    moduleName : this.project.moduleName,
                    projectName : this.findProjectName(),
                },
                cb:()=>{
                    this.addSubModuleTag = false;
                    this.listConfigTag = false;
                    this.saveConfigTag = false;
                    this.baseReadOnly = false,
                    this.addingTag = false;
                    this.proxyArr = [];
                    this.proxySaveTag = false;
                    this.alert.showAlert("success","保存整个项目成功!");
                }
            })
        },
        // 保存子模块
        createModuleFile(){
            if(!this.project.projectPath || !this.project.moduleName ){
                this.alert.showAlert("warning","项目名称, 模块名称必填!");
                return;
            }
            Service.createModuleFile({
                params:{
                    moduleName:this.project.moduleName.trim(),
                    projectPath:this.project.projectPath.trim(),
                    projectName:this.findProjectName().trim(),
                    interface:this.interfaceArr,
                },
                cb:()=>{
                    this.addSubModuleTag = false;
                    this.listConfigTag = false;
                    this.saveConfigTag = false;
                    this.baseReadOnly = false,
                    this.addingTag = false;
                    this.alert.showAlert("success","新增成功!");
                    this.resetInterfaceArr();
                }
            })
        },
        // 删除一条
        delRow(row,items){
            this.alert.showConfirm('是否删除?',d=>{
                Unit.arrayServer.removeItems(items,[row]);
            })
        },
        
        // 添加一条搜索条件
        addSearchCols(){
            let tmp = Unit.object.cloneObj(this.config.searchPage.col.defaultColPropertys);
            tmp.fieldTypes = Unit.object.cloneObj(this.config.searchPage.col.fieldTypes);
            this.listSearchColsConfig.cols.push(tmp);
        },
        // 获取项目目录
        getProjects(){
            Service.getProjects({
                cb:(d)=>{
                     let result=JSON.parse(d.data);
                    this.project.projects=result;
                }
            })
        },
        // 展示添加页面配置
        addPage(){
            if(!this.project.projectPath || !this.project.moduleName ||  !this.listBtnConfig.pageName ){
                this.alert.showAlert("warning","项目名称, 模块名称,子模块名称，页面名称必填!");
                return;
            }
            this.addingTag = true;
            this.resetPageOptpion(false);
            if(this.fileType == 1){
                this.saveConfigTag = false;
                this.listConfigTag = true
            }else{
                this.saveConfigTag =true;
                this.listConfigTag = false;
            }
        },
        // 取消编辑页面
        cancelAdd(){
            this.addingTag = false;
            this.resetPageOptpion();
        },
        // 保存页面
        savePage(){
            let cols = this.form.cols ? Unit.object.cloneObj(this.form.cols) : [];
            cols.forEach(item => {
                delete item.selectDataSource
            })
            ;
            let _data = {
                projectName:this.project.projectPath.trim(),
                moduleName:this.project.moduleName.trim(),
                page:{
                    fileName:this.listBtnConfig.pageName.trim(),
                    path:this.listBtnConfig.subModulePath.trim(),
                    type:this.fileType,
                }
            };
            if(this.fileType == "1"){
                _data.page.searchOpts = {
                        search:{
                            btn:this.listBtnConfig.btns,
                            cols:this.listSearchColsConfig.cols,
                        },
                        tableOptions:this.$refs.table_options.textContent,
                        tableTitle:this.listBtnConfig.tableTitle,
                };
                _data.page.dialog = {
                    hasDialog:this.hasDialog,
                    form:this.form,
                }
                _data = Unit.object.cloneObj(_data);
                _data.page.searchOpts.search.btn.forEach(x=>{
                    delete x.buttonTypes
                })
                _data.page.searchOpts.search.cols.forEach(x=>{
                    delete x.fieldTypes
                })
                _data.page.dialog.hasDialog == 1 && _data.page.dialog.form.cols.forEach(item => {
                    delete item.selectDataSource
                })
            }
            if(this.fileType == "2"){
                _data.page.form = this.saveForm;
                _data = Unit.object.cloneObj(_data);
                _data.page.form.cols.forEach(item => {
                    delete item.selectDataSource;
                })
            }
            Service.savePage({
                params:_data,
                cb:()=>{
                     this.addingTag = false;
                     this.resetPageOptpion();
                     this.alert.showAlert("success","保存页面成功");
                }
            })
        },
        resetInterfaceArr(){
            this.interfaceArr = [
                {
                    name:"save接口",
                    key:"doSave",
                    url:""
                },
                {
                    name:"detail接口",
                    key:"getDetail",
                    url:""
                },
                {
                    name:"remove接口",
                    key:"doRemove",
                    url:""
                },
                {
                    name:"update接口",
                    key:"doUpdate",
                    url:""
                },
                {
                    name:"getList接口",
                    key:"doGetList",
                    url:""
                }
            ]
        },
        // 清空页面配置
        resetPageOptpion(tag = true){
            this.hasDialog = "1",
            this.saveConfigTag = false;
            this.listConfigTag = false;
            
            this.listBtnConfig = {
                subModulePath:this.listBtnConfig.subModulePath,
                tableTitle:"",
                pageName:tag ? "" : this.listBtnConfig.pageName,
                colsCount:"",
                btns:[]
            }
            this.listSearchColsConfig = {
                cols:[]
            }
            this.form = {
                cols:[]
            }
            this.saveForm ={
                cols:[]
            }
            
            this.listBtnConfig.btns.push(
                {btnName:"搜索",buttonTypes:Unit.object.cloneObj(this.config.searchPage.btn.buttonTypes),btnType:"search",btnHandle:"search"}
            )
        },
        // 展示配置子模块
        showAddSubMoudle(){
            if(!this.project.projectPath || !this.project.moduleName ){
                this.alert.showAlert("warning","项目名称, 模块名称必填!");
                return;
            }
            this.addSubModuleTag=true;
        }
        
    },
    
    mounted(){
        this.getProjects();
        this.project.layoutList = Unit.object.cloneObj(this.config.enum.layoutList);
        this.listBtnConfig.btns.push(
            {btnName:"搜索",buttonTypes:Unit.object.cloneObj(this.config.searchPage.btn.buttonTypes),btnType:"search",btnHandle:"search"}
        )
    }
}
</script>
<style scoped>
    .w200{
        width: 94%;
    }
    table { 
        *border-collapse: collapse; /* IE7 and lower */ 
        border-spacing: 0;
        width: 98%;
        margin:0 auto;
    }

    .le-table{
        border: solid #ccc 1px; 
        -moz-border-radius: 6px; 
        -webkit-border-radius: 6px;
        border-radius: 6px;
        -webkit-box-shadow: 0 1px 1px #ccc;
        -moz-box-shadow: 0 1px 1px #ccc;
        box-shadow: 0 1px 1px #ccc;

    }
    .le-table tr {
        -o-transition: all 0.1s ease-in-out;
        -webkit-transition: all 0.1s ease-in-out;
        -moz-transition: all 0.1s ease-in-out;
        -ms-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
    }
    .le-table tr:hover { background: #f0f5f4; }
    .le-table td,.le-table th{
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc; 
        padding: 10px; text-align: left;
        text-align: center;
        
    }
    .le-table th { 
        background-color: #dce9f9;
        color:#333;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
        background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
        background-image: -moz-linear-gradient(top, #ebf3fc, #dce9f9);
        background-image: -ms-linear-gradient(top, #ebf3fc, #dce9f9); 
        background-image: -o-linear-gradient(top, #ebf3fc, #dce9f9); 
        background-image: linear-gradient(top, #ebf3fc, #dce9f9); 
        filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#ebf3fc, endColorstr=#dce9f9);
        -ms-filter: "progid:DXImageTransform.Microsoft.gradient (GradientType=0, startColorstr=#ebf3fc, endColorstr=#dce9f9)"; 
        -webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset; 
        -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
        box-shadow: 0 1px 0 rgba(255,255,255,.8) inset; border-top: none; 
        text-shadow: 0 1px 0 rgba(255,255,255,.5); 
        text-align: center;

    }
    .le-table td:first-child, .le-table th:first-child {
         border-left: none;
    }
    .le-table th:first-child {
        -moz-border-radius: 6px 0 0 0; 
        -webkit-border-radius: 6px 0 0 0; 
        border-radius: 6px 0 0 0; 
    }
    .le-table th:last-child {
        -moz-border-radius: 0 6px 0 0; 
        -webkit-border-radius: 0 6px 0 0; 
        border-radius: 0 6px 0 0; 
    } 
    .le-table tr:last-child td:first-child { 
        -moz-border-radius: 0 0 0 6px; 
        -webkit-border-radius: 0 0 0 6px; 
        border-radius: 0 0 0 6px; 
    } 
    .le-table tr:last-child td:last-child { 
        -moz-border-radius: 0 0 6px 0; 
        -webkit-border-radius: 0 0 6px 0; 
        border-radius: 0 0 6px 0; 
    }

    .toggleBox-enter-active {
        animation: show .5s;
    }
    .toggleBox-leave-active {
        animation: hide .5s;
    }
    @keyframes show {
        0% {
            transform:translateY(50px);
            opacity:0;
        }
        100% {
            transform:translateY(0px);
            opacity:1;
        }
    }
    @keyframes hide {
        0% {
            transform:translateY(0px);
            opacity:1;
        }
        100% {
            transform:translateY(50px);
            opacity:0;
        }
    }
    h1{
        text-align:left;
        margin-left:10px;
        font-size:22px;
        margin-top:20px;
        margin-bottom: 30px;
        padding-bottom:10px;
    }
    h1 i {
        margin-right: 10px;
    }
    #table_options{
        padding:10px;
        box-shadow: 0px 0px 4px #000;
        background:#252334;
        color:#aeaeae;
        border-radius:10px;
        height:500px;
        overflow: scroll;
        margin-left:10px;
        max-width:700px;
    }

</style>
