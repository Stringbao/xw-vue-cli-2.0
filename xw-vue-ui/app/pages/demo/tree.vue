

<template>
    <div>
        <le-asyn-tree checkbox class="tree" displayName="t_name" :asynOptions="menuTreeOptions" ref="menuTree" :itemClick="itemClick"></le-asyn-tree>
    </div>
</template>

<script>
export default {
    name:"tree",
    data(){
        return {
            menuTreeOptions:{
                getUrl:item=>{
                    return "/tree/category/querytreenode?type=54&parentId="+item.id;
                },
                analysis:d=>{
                    return d && d.data;
                }
            }
        }
    },
    methods:{
        itemClick(item){
            
        }
    },
    mounted(){
        this.ajax.get('/tree/category/querytreenode',{type: 54, parentId:''}).then(res=>{
            this.$refs["menuTree"].init(res.data);
        })
    }
}
</script>

<style scoped>

</style>