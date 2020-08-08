<template>
    <le-form ref="model">
        <le-input label="name:" msg="请输入model的name" v-model="model.name" on required></le-input>

    </le-form>
</template>
<script>
export default {
    data() {
        return {
            model:{
                name:""
            }
        };
    },
};
</script>
<style lang="scss" scoped>
</style>