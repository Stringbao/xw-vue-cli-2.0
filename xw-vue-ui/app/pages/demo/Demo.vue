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
                <legend>submit:</legend>
                <le-submit type="info" value="info" @click="submitFn"></le-submit>
            </fieldset>
            <fieldset>
                <legend>confirm:</legend>
                <le-button type="info" value="info" @click="confirm"></le-button>
            </fieldset>

            <fieldset>
                <legend>dialog:</legend>
                <le-button type="create" value="dialog" @click="showDialog"></le-button>
                <le-dialog ref="dialog">
                    <div slot="body">
                        <div>abc</div>
                        <le-button type="info" value="info" @click="confirm"></le-button>
                    </div>
                    <div slot="button">
                        <le-button type="cancel" value="取消" @click="dialogCancel"></le-button>
                        <le-button type="save" value="确定"></le-button>
                    </div>
                </le-dialog>
            </fieldset>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog: {
                showDialog: false,
            },
        };
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
        submitFn(){
            console.log(1);

            return new Promise((resolve,reject) =>{
                window.setTimeout(x=>{
                    console.log(3);
                    resolve();
                },2000)
            })
        },
        update() {
            this.alert.showAlert("warning", "library里面没有jquery");
        },
        confirm() {
            this.alert.showConfirm("这个title是确定的吗？", () => {
                console.log(111);
            });
        },
        showDialog() {
            this.$refs.dialog.show();
        },
        dialogCancel() {
            this.$refs.dialog.hide();
        },
    },
};
</script>
<style lang="scss" scoped>
fieldset:not(:first-child) {
    margin-top: 30px;
}
</style>