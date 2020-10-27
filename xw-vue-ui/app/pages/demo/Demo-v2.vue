<template>
    <div>
        <div class="le_comps_core_css">
            <h4 class="le_page_name">title</h4>
            <div class="le_list_breadcrumb_pannel">
                <a href="">Product Management > <b>category</b></a>
            </div>
            <div class='le_list_search_pannel clearfix'>
                <le-form ref='form1'>
                    <div class="col1">
                        <le-input on required :rules="allRules" :msg="msg1" labelWidth="80" label="订单:" v-model="entity.code"></le-input>
                    </div>
                    <div class="col1">
                        <le-input on max="5" min="1" :msg="msg2" labelWidth="80" label="编号:" v-model="entity.name"></le-input>
                    </div>
                    <div class="col1">
                        <container></container>
                    </div>
                </le-form>
                <le-button @click="submit" value="验证"></le-button>
                <le-button @click="reset" value="reset"></le-button>
            </div>
        </div>
    </div>
</template>
<script>
import Container from "./container.vue";
export default {
    components:{Container},
    data() {
        return {
            entity:{
                code:"",
                name:""
            },
            msg1:{
                checkA:"checkA can not be null",
                checkB:"checkB can not be null",
                required:"xxx is required"
            },
            msg2:{
                max:"最大5个字符",
                min:"最小1个字符"
            },
            allRules:{
                checkA:this.checkA,
                checkB:this.checkB
            }
        }
    },
    methods: {
        checkA(){
            if(this.entity.code.indexOf('a') == -1){
                return false;
            }
            return true;
        },
        checkB(){
            if(this.entity.code.indexOf('b') == -1){
                return false;
            }
            return true;
        },
        submit(){
            this.$refs['form1'].validate();
        },
        reset(){
            this.$refs['form1'].reset();
        }
    },
};
</script>
<style lang="scss" scoped>
fieldset:not(:first-child) {
    margin-top: 30px;
}
</style>