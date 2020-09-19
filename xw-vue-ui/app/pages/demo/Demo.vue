<template>
    <div>
        <form>
            <fieldset>
                <legend>button:</legend>
                <le-button type="info" value="info" @click="info"></le-button>
                <le-button type="create" value="create" @click="create"></le-button>
                <le-button type="update" :disabled="true" value="update" @click="update"></le-button>
                <le-button type="remove"  value="delete" @click="del"></le-button>
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
                <le-dialog ref="dialog" :width="dialog.width" :height="dialog.height">
                    <div slot="body">
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <div>dialog</div><br>
                        <le-button type="info" value="info" @click="confirm"></le-button>
                    </div>
                    <div slot="button">
                        <le-button type="cancel" value="取消" @click="dialogCancel"></le-button>
                        <le-button type="save" value="确定"></le-button>
                    </div>
                </le-dialog>
            </fieldset>

            <fieldset>
                <legend>form validate:</legend>
                <le-form labelWidth="180" ref="saveForm">
                    <!-- <le-input on max="4" required label="地址" v-model="entity.address"></le-input> -->
                    <le-local-select label="收货地址" :data-source="dataSoruce.shops" display-name="name" display-value="code" :multiple="true" v-model="entity.address"></le-local-select>
                </le-form>
                <le-button type="save" value="save" @click="saveForm"></le-button>
            </fieldset>

            <fieldset>
                <legend>table</legend>
                <table-list title="BasicParamManagement List Table" ref='tableListRef' :options='list_table_options'></table-list>
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
                width:'',
                height:""
            },
            entity: {
                address: "",
            },
            dataSoruce:{
                shops:[
                    {name:"ABC",code:"abc"},
                    {name:"BBB",code:"abc"},
                    {name:"ABC",code:"abc"},
                    {name:"BBB",code:"abc"},
                    {name:"ABC",code:"abc"},
                    {name:"BBB",code:"abc"},
                    {name:"ABC",code:"abc"},
                    {name:"BBB",code:"abc"},
                ]
            },
            list_table_options: {
                map: [
                    {key:'dictKey',val:'Parameter Group'},
                    {key:'dictCode',val:'Parameter Name'},
                    {key:'status',val:'Status',convert:this.showStatus},
                    {key:'type',val:'Parameter Type',convert:this.showParameterType},
                    {key:'isInheritance',val:'Support Inheritance',convert:this.showInheritance},
                    {key:'paramSourceUrl',val:'Parameter Optional Value'},
                ],
                getUrl: ()=> {
                   return `/dictapi/basiccfg/list`;
                },
                pageOption: {
                    sizeKey: "pageSize",
                    indexKey: "curPage",
                    index: 1,
                    size: 20
                },
                actions: [
                    {key:'update',val:'Updata',action:this.update},
                    {key:'info',val:'Detail',action:this.detail},
                    {key:'start',val:'Enable',action:this.enableFn},
                    {key:'stop',val:'Disable',action:this.disableFn},
                ],
                analysis: data => {
                    if (data &&data.data &&data.data.dataList) {
                        return {
                            data: data.data.dataList,
                            count: data.data.count
                        };
                    } else {
                        return { data: [], count: 0 };
                    }
                }
            }
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
        submitFn() {
            console.log(1);

            return new Promise((resolve, reject) => {
                window.setTimeout((x) => {
                    console.log(3);
                    resolve();
                }, 2000);
            });
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
        saveForm(){
            this.$refs.saveForm.validate().then(res=>{
                console.log(res)
            })
        }
    },
};
</script>
<style lang="scss" scoped>
fieldset:not(:first-child) {
    margin-top: 30px;
}
</style>