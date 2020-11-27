

<template>
    <div>
        {{html}}
        <le-form ref="form">
            <LeUEditor v-model="html" label="123" msg="123"  on required :imgUploadUrl="'/file/img/upload'"></LeUEditor>
            <le-input label="234" v-model="values" on required msg="sadfsdf"></le-input>
        </le-form>
        <le-button @click="vali" value="213213"></le-button>
    </div>
</template>

<script>
export default {
    name:"tree",
    data(){
        return {
            html: '',
            values: ''
        }
    },
    methods:{
        vali() {
            this.$refs.form.validate().then(data => {
                console.log(data)
            })
        }
    },
    mounted(){

    }
}
</script>

<style scoped>

</style>