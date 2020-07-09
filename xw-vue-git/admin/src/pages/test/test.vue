<template>
    <div class="bg">
        <div class="login">
            <input type="button" value="A" @click="requestHttp('AAA')" />
            <input type="button" value="B" @click="requestHttp('BBB')" />
            <input type="button" value="C" @click="requestHttp('CCC')" />
        </div>

        LeDateTimePicker
        <le-date-time-picker label="LeDateTimePicker" v-model="entity.datetime" splitKey="/"></le-date-time-picker>

        LeDatePicker
        <le-date-picker label="LeDatePicker" v-model="entity.date" splitKey="-"></le-date-picker>
    </div>
</template>

<script>
    import CommonUtil from "../../core/tool/commonUtil.js";
    import TestComp from "./test_comp.vue";

    export default {
        name: "Login",
        components: {TestComp},
        data(){
            return {
                entity:{
                    datetime:"",
                    date:""
                },
            }
        },
        methods:{
            requestHttp(id){
                this.$refs['comref'].doHttp(id);
            },
        },
        mounted(){
            window.setTimeout(()=>{
                this.entity.datetime = "2020/03/03 12:33:22";
                this.entity.date = "2020-04-04";
            },1000)
        }
    }
</script>

<style scoped>
</style>