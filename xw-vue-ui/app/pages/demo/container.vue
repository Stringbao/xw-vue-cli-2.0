
<template>
    <le-input on required :rules="rules" :msg="emsg" labelWidth="80" label="container:" v-model="entity.code"></le-input>
</template>
<script>
export default {
    data() {
        return {
            entity:{
                code:""
            },
            emsg:{
                checkAA:"Check AA can not be null",
                checkBB:"Check BB can not be null",
                required:"xxx1 is required"
            },
            rules:{
                checkAA:this.checkAA,
                checkBB:this.checkBB,
            }
        }
    },
    methods:{
        checkAA(){
            if(this.entity.code.indexOf('aa') == -1){
                return false;
            }
            return true;
        },
        checkBB(){
            if(this.entity.code.indexOf('bb') == -1){
                return false;
            }
            return true;
        }
    }
};
</script>
<style lang="scss" scoped>
fieldset:not(:first-child) {
    margin-top: 30px;
}
</style>