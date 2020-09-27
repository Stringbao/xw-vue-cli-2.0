

<template>
    <div>
        <le-asyn-tree related checkbox class="tree" displayName="t_name" :asynOptions="menuTreeOptions" ref="menuTree" :itemClick="itemClick"></le-asyn-tree>

        <le-button value="AllNodes" type="save" @click="getAsynAll(1)"></le-button>
        <le-button value="AllNodesNotParent" type="save" @click="getAsynAll(2)"></le-button>
        <le-button value="Bind" type="save" @click="getAsynAll(3)"></le-button>

        <le-button value="RelatedNodes" type="save" @click="getAsynAll(4)"></le-button>
        <le-button value="BindRelatedNodes" type="save" @click="getAsynAll(5)"></le-button>

        <le-local-tree related ref="localTree" checkbox displayName="name" childrenKey="children"></le-local-tree>
    
        <le-button value="Local-AllNodes" type="save" @click="getLocalAll(1)"></le-button>
        <le-button value="Local-AllNodesNotParent" type="save" @click="getLocalAll(2)"></le-button>
        <le-button value="Local-Bind" type="save" @click="getLocalAll(3)"></le-button>
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
        getAsynAll(num){
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
                let res = '37683ef4-e2aa-11ea-8adc-fa163e7a920f,7d5bd893-4c21-40c0-9141-da5043344390,93b99ac0-b2e2-4a2c-8931-99ab4633b572,717e2677-eb49-4624-80ae-5ad6ab8ab6d8,934a71fe-e501-4fe2-8e57-2b275bd28b5c,4e658e3d-bc1c-4e9f-88e7-33e0a2cbffa9|[{"name":"37683ef4-e2aa-11ea-8adc-fa163e7a920f","status":3},{"name":"7d5bd893-4c21-40c0-9141-da5043344390","status":3},{"name":"93b99ac0-b2e2-4a2c-8931-99ab4633b572","status":3},{"name":"717e2677-eb49-4624-80ae-5ad6ab8ab6d8","status":1},{"name":"934a71fe-e501-4fe2-8e57-2b275bd28b5c","status":1},{"name":"4e658e3d-bc1c-4e9f-88e7-33e0a2cbffa9","status":1}]'
                this.$refs["menuTree"].bindData('id', JSON.parse(res.split('|')[1]));
            }
            if(num == 4){
                res = this.$refs["menuTree"].getRelatedCheckedNodes();
                console.log(res);

                let tmp = {node:[], nodeIds:[]};
                res.forEach(x=>{
                    tmp.nodeIds.push(x.node.id);
                    
                    let pnodes = [];
                    x.parentNodes.forEach(xx=>{
                        pnodes.push({name:xx.id, status:2});
                    })
                    tmp.node.push({id:x.node.id, type:x.node.nodeType, parentNodes:pnodes});
                })
                debugger
            }
            if(num == 5){
                let relatedRes = '{"node":[{"id":"29380b6c-fd74-4a61-ae25-029a93269100","type":5,"parentNodes":[{"name":"37683ef4-e2aa-11ea-8adc-fa163e7a920f","status":2},{"name":"7d5bd893-4c21-40c0-9141-da5043344390","status":2},{"name":"93b99ac0-b2e2-4a2c-8931-99ab4633b572","status":2},{"name":"717e2677-eb49-4624-80ae-5ad6ab8ab6d8","status":2}]},{"id":"346419dc-0160-4600-aaf7-ff7087ec357d","type":6,"parentNodes":[{"name":"37683ef4-e2aa-11ea-8adc-fa163e7a920f","status":2},{"name":"7d5bd893-4c21-40c0-9141-da5043344390","status":2},{"name":"93b99ac0-b2e2-4a2c-8931-99ab4633b572","status":2},{"name":"7b2a6744-57d3-4148-86f2-c2767578a67c","status":2},{"name":"04358bb2-1e26-4889-9cd5-75a1d3d0df3a","status":2}]},{"id":"97b82916-e82d-4a69-8d09-b5c53a957588","type":2,"parentNodes":[{"name":"37683ef4-e2aa-11ea-8adc-fa163e7a920f","status":2},{"name":"87b45eeb-965b-4bbf-8ff0-5c0d5b2bb650","status":2}]},{"id":"47ecec1b-66de-435e-9e9b-c394b76000cc","type":2,"parentNodes":[{"name":"37683ef4-e2aa-11ea-8adc-fa163e7a920f","status":2},{"name":"9871c8bb-91f5-4c14-97da-996d43c6ea28","status":2}]}],"nodeIds":["29380b6c-fd74-4a61-ae25-029a93269100","346419dc-0160-4600-aaf7-ff7087ec357d","97b82916-e82d-4a69-8d09-b5c53a957588","47ecec1b-66de-435e-9e9b-c394b76000cc"]}';
                relatedRes = JSON.parse(relatedRes);
                let pNodes = [];
                relatedRes.node.forEach(x=>{
                    Array.prototype.push.apply(pNodes, x.parentNodes);
                })
                let nodeIds = relatedRes.nodeIds.join(',');
                debugger
                this.$refs["menuTree"].bindRelatedData('id', pNodes, nodeIds);
            }
        },
        getLocalAll(num){
            let res = null;
            if(num == 1){
                res = this.$refs["localTree"].getAllCheckedNodes();
                res = this.$refs["localTree"].convertData(res, "id");
                let ids = this.$refs["localTree"].getIdsInConvertData(res);
                let finaly = ids + "|" + JSON.stringify(res);
                console.log(finaly);
            }
            if(num == 2){
                res = this.$refs["localTree"].getAllCheckboxNodesExcludeParent();
                res = this.$refs["localTree"].convertData(res, "id");
                let ids = this.$refs["localTree"].getIdsInConvertData(res);
                let finaly = ids + "|" + JSON.stringify(res);
                console.log(finaly);
            }
            if(num == 3){
                let res = '1,12,2,21,211,3,31,311,312,313|[{"name":1,"status":3},{"name":12,"status":1},{"name":2,"status":3},{"name":21,"status":1},{"name":211,"status":1},{"name":3,"status":3},{"name":31,"status":1},{"name":311,"status":1},{"name":312,"status":1},{"name":313,"status":1}]';
                this.$refs["localTree"].bindData('id', JSON.parse(res.split('|')[1]));
            }
        }
    },
    mounted(){

        this.ajax.get('/tree/category/querytreenode',{type: 54, parentId:''}).then(res=>{
            this.$refs["menuTree"].init(res.data);
        })

        let treeData = [
            {name:'aaa', id:1, children:[
                {name:'a1', id:11, children:[]},
                {name:'a2', id:12, children:[]}
            ]},
            {name:'bbb', id:2, children:[
                {name:'b1', id:21, children:[
                    {name:'b12', id:211, children:[]}
                ]},
                {name:'b2', id:22, children:[]},
            ]},
            {name:'ccc', id:3, children:[
                {name:'c1', id:31, children:[
                    {name:'c11', id:311, children:[
                        {name:'c12', id:312, children:[
                            {name:'c13', id:313, children:[]},
                        ]},
                    ]},
                ]},
                {name:'c2', id:32, children:[
                    {name:'c21', id:321, children:[
                        {name:'c22', id:322, children:[
                            {name:'c23', id:323, children:[]},
                        ]},
                    ]},
                ]},
                {name:'c3', id:33, children:[
                    {name:'c31', id:331, children:[
                        {name:'c32', id:332, children:[
                            {name:'c33', id:333, children:[]}
                        ]},
                    ]},
                ]},
            ]},
        ]

        this.$refs['localTree'].init(treeData);
    }
}
</script>

<style scoped>

</style>