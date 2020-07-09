<template>
    <div>
        <le-button type="search" value="搜索"></le-button>
        <le-button type="create" value="新增"></le-button>
        <le-button type="update" value="修改"></le-button>
        <le-button type="remove" value="删除"></le-button>
        <le-button type="approve" value="审核"></le-button>
        <le-button type="reject" value="拒绝"></le-button>
        <le-button type="start" value="启用"></le-button>
        <le-button type="stop" value="停用"></le-button>
        <le-button type="info" value="详情"></le-button>
        <le-button type="reset" value="重置"></le-button>
        <le-button type="up" value="上架"></le-button>
        <le-button type="down" value="下架"></le-button>
        <le-button type="publish" value="发布"></le-button>
        <le-button type="cancelPublish" value="取消发布"></le-button>
        <le-button type="import" value="导入"></le-button>
        <le-button type="export" value="导出"></le-button>
        <le-button type="review" value="预览"></le-button>
        <le-button type="batch" value="批量操作"></le-button>
        <le-button type="copy" value="复制"></le-button>
        <le-button type="setting" value="设置"></le-button>
        <le-button type="decorate" value="装修页面"></le-button>
        <le-button type="prevPage" value="上一页"></le-button>
        <le-button type="nextPage" value="下一页"></le-button>
        <le-button type="confirm" value="确定"></le-button>
        <le-button type="save" value="保存"></le-button>
        <le-button type="back" value="返回"></le-button>
        <le-button type="cancel" value="取消"></le-button>
        <le-button type="choose" value="请选择XX"></le-button>
        <le-button type="holdSave" value="暂存"></le-button>
        <le-button type="prev" value="上一步"></le-button>
        <le-button type="next" value="下一步"></le-button>
        <le-button type="warning" value="警告"></le-button>
        <le-button type="upload" value="上传"></le-button>


        <!-- <le-input :readonly="readonly" v-model="search.name"></le-input> -->

        <!-- <le-textarea :readonly="readonly" width="300" v-model="search.name"></le-textarea> -->
        <!-- <le-date-picker :readonly="readonly" v-model="search.date"></le-date-picker> -->
        <!-- <le-time-picker :readonly="readonly" v-model="search.time"></le-time-picker> -->
        <!-- <le-date-time-picker :readonly="readonly" v-model="search.datetime"></le-date-time-picker> -->
        <le-local-select :readonly="readonly" :dataSource="dataScource" multiple v-model="search.ids" display-name="name" display-value="code"></le-local-select>
        
        <!-- <le-upload :options="options" :readonly="readonly" v-model="search.url"></le-upload> -->
        <le-button type="disabled" value="禁用" @click="disabled"></le-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search:{
                name:"",
                date:"",
                time:"",
                datetime:"",
                url:""
            },
            dataScource:[],
            readonly:false,
            options:{
                tip:"图片大小必须小于100kb,大小100*200",
                multiple:true,
                url:"/file/img/upload",
                vtype:"jpg,png,gif",
                fname:"file",
                analysis:(d)=>{
                    return d.data;
                }
            }
        }
    },
    computed:{

    },
    methods:{
        disabled(){
            this.readonly = !this.readonly;
        }
    },
    mounted(){
        this.dataScource = [
            {name:1,code:"1"},
            {name:2,code:"2"},
            {name:3,code:"3"},
            {name:4,code:"4"},
        ]
    }
}
</script>

<style scoped>

</style>