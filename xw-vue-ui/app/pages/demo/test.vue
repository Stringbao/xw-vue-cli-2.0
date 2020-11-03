

<template>
    <div>
        <H1>Count:{{count}}</H1>
        <LocalTableList ref='lt' :options="options"></LocalTableList>
    </div>
</template>

<script>
export default {
    name:"tree",
    data(){
        return {
            count:"0",
            options:{
                map:[
                    {key:"name",val:"name"},
                    {key:"tel",val:"tel"},
                    // {key:"fax",val:"fax"},
                    {key:"site",val:"site"}
                ]
            }
        }
    },
    methods:{
        
    },
    mounted(){
        this.ajax.get('/comp/test').then(res=>{
            let tmp = Array.prototype.push.apply(res.data.success, res.data.warning);
            this.$refs['lt'].init(res.data.success);
            this.count = res.data.success.length + res.data.warning.length;
        })
    }
}
</script>

<style scoped>

</style>