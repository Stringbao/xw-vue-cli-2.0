<template>
    <le-form ref="store">
        <le-input label="name:" msg="请输入storeName" v-model="store.name" :readonly="isEdit" on required></le-input>
        <le-radio-list
            on
            required
            label="type:"
            :data-source="dataSource.storeType"
            display-name="name"
            display-value="code"
            v-model="store.type"
        ></le-radio-list>
        <le-radio-list
            v-show="store.type=='array'?true:false"
            on
            required
            msg="please select Request Type"
            label="requestType:"
            :data-source="dataSource.requestType"
            display-name="name"
            display-value="code"
            v-model="store.reqType"
        ></le-radio-list>
        <le-radio-list
            label="isCommon:"
            :data-source="dataSource.isCommon"
            display-name="name"
            display-value="code"
            v-model="store.isCommon"
        ></le-radio-list>
        <le-input label="url:" msg="请输入获取值的途径" v-model="store.url" on required></le-input>
    </le-form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    props: {
        store: Object,
        action: String,
        idx: Number
    },
    data() {
        return {
            
        };
    },
    methods: {
        ...mapActions(["addStore", "updateStore"]),
        submit() {
            return new Promise((resolve,reject)=>{
                this.$refs.store.validate().then(() => {
                    if (this.action == "create") {
                        this.addStore(this.store).then(()=>{
                            resolve();
                        }).catch(err=>{
                            alert(err.msg);
                            reject(err);
                        })
                    } else {
                        this.updateStore({ data: this.store, idx: this.idx}).then(res=>{
                            resolve();
                        })
                    }
                }).catch(err=>{
                    reject(err);
                })
            })
        }
    },
    computed: {
        ...mapState(["dataSource"]),
        isEdit(){
            return this.action == "update"?true:false
        }
    },
    mounted(){
        // this.$refs.store.reset();
    }
};
</script>
<style lang="scss" scoped>
</style>