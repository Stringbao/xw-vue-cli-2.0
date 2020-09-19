

<template>
    <div>
        <le-asyn-tree checkbox class="tree" displayName="t_name" :asynOptions="menuTreeOptions" ref="menuTree" :itemClick="itemClick"></le-asyn-tree>

        <le-button value="AllNodes" type="save" @click="getall(1)"></le-button>
        <le-button value="AllNodesNotParent" type="save" @click="getall(2)"></le-button>
        <le-button value="Bind" type="save" @click="getall(3)"></le-button>
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
            
        },
        getall(num){
            let res = null;
            if(num == 1){
                res = this.$refs["menuTree"].getAllCheckedNodes();
                res = this.$refs["menuTree"].convertData(res, "id");
                let ids = this.$refs["menuTree"].getIdsInConvertData(res);
                let finaly = ids + "|" + JSON.stringify(res);
                console.log(finaly)
            }
            if(num == 2){
                res = this.$refs["menuTree"].getAllCheckboxNodesExcludeParent();
                res = this.$refs["menuTree"].convertData(res, "id");
                let ids = this.$refs["menuTree"].getIdsInConvertData(res);
                let finaly = ids + "|" + JSON.stringify(res);
                console.log(finaly)
            }
            if(num == 3){
                let res = '37683ef4-e2aa-11ea-8adc-fa163e7a920f,7d5bd893-4c21-40c0-9141-da5043344390,93b99ac0-b2e2-4a2c-8931-99ab4633b572,717e2677-eb49-4624-80ae-5ad6ab8ab6d8|[{"name":"37683ef4-e2aa-11ea-8adc-fa163e7a920f","status":3},{"name":"7d5bd893-4c21-40c0-9141-da5043344390","status":3},{"name":"93b99ac0-b2e2-4a2c-8931-99ab4633b572","status":3},{"name":"717e2677-eb49-4624-80ae-5ad6ab8ab6d8","status":1}]'
                this.$refs["menuTree"].bindData(JSON.parse(res.split('|')[1]));
            }
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