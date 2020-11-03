

<template>
    <div>
        <LocalTableList ref='lt' :options="options"></LocalTableList>
    </div>
</template>

<script>
export default {
    name:"tree",
    data(){
        return {
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
        })
    }
}
</script>

<style scoped>

</style>