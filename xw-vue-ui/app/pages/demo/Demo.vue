<template>
    <div>
        <form>
            <fieldset>
                <legend>button:</legend>
                <le-button type="create" value="create"></le-button>
                <le-button type="update" value="update"></le-button>
                <le-button type="remove" value="delete" @click="del"></le-button>
            </fieldset>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods:{
        del(){
            this.alert.showAlert('message',"library里面没有jquery")
        }
    }
};
</script>
<style lang="scss" scoped>

</style>