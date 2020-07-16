<template>
    <div>
        <Tab  :modules="modules" @add="add" @del="del" @change="change">
            <template #pane="{currentIndex}">
                <TabPane
                    v-for="(module,i) in modules"
                    :key="module.ModuleName"
                    :index="i"
                    :currentIndex="currentIndex"
                >
                    {{module.ModuleName}}
                    <div>
                        <Service :sevices="module.Services"></Service>
                    </div>
                    <div>
                        pages
                    </div>
                    <div>
                        <storeForm :storeArr="module.Store.state"></storeForm>
                    </div>
                </TabPane>
            </template>
        </Tab>
        <le-dialog title="create Module" v-model="dialog.showDialog">
            <div slot="body">
                <le-form ref="module">
                    <le-input
                        label="模块名称"
                        msg="请输入模块名称"
                        tip="请输入合法的文件夹名称"
                        v-model="moduleName"
                        on
                        required
                    ></le-input>
                </le-form>
            </div>
            <div slot="button">
                <le-button type="cancel" value="<#取消#>" @click="handleClose"></le-button>
                <le-button type="save" value="<#保存#>" @click="handleSave"></le-button>
            </div>
        </le-dialog>
    </div>
</template>
<script>
import Tab from "@pages/components/tab/Tab.vue";
import TabPane from "@pages/components/tab/TabPane.vue";
import StoreForm from "./StoreForm.vue";
import Service from "./service.vue";
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            dialog: {
                showDialog: false
            },
            moduleName: ""
        };
    },
    computed: {
        ...mapState(["modules","currentModule"])
    },
    components: {
        Tab,
        TabPane,
        StoreForm,
        Service
    },
    methods: {
        ...mapActions(["addModules", "removeModules","changeModules"]),
        del(item) {
            this.removeModules(item.ModuleName);
        },
        add() {
            this.dialog.showDialog = true;
        },
        change(module,idx){
            this.changeModules(module);
        },
        handleSave() {
            this.$refs.module
                .validate()
                .then(res => {
                    if (res.success) {
                        this.addModules(this.moduleName);
                        this.dialog.showDialog = false;
                        this.moduleName = "";
                    }
                })
                .catch(err => {
                    this.alert.showAlert("error", err.info[0]);
                });
        },
        handleClose() {
            this.dialog.showDialog = false;
            this.moduleName = "";
        }
    }
};
</script>

<style lang="scss" scoped>

</style>