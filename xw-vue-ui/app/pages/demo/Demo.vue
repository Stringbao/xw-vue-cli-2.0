<template>
    <div>
        <form>
            <fieldset>
                <legend>button:</legend>
                <le-button type="info" value="info" @click="info"></le-button>
                <le-button type="create" value="create" @click="create"></le-button>
                <le-button type="update" value="update" @click="update"></le-button>
                <le-button type="remove" value="delete" @click="del"></le-button>
            </fieldset>
            <fieldset>
                <legend>confirm:</legend>
                <le-button type="info" value="info" @click="confirm"></le-button>
            </fieldset>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        del() {
            this.alert.showAlert("error", "library里面没有jquery");
        },
        create() {
            this.alert.showAlert("message", "library里面没有jquery");
        },
        info() {
            this.alert.showAlert("info", "library里面没有jquery");
        },
        update() {
            this.alert.showAlert("warning", "library里面没有jquery");
        },
        confirm(){
            this.alert.showConfirm("这个title是确定的吗？",()=>{
                console.log(111);
            })
        },
    },
};
</script>
<style lang="scss" scoped>
fieldset:not(:first-child){
    margin-top: 30px;
}
</style>