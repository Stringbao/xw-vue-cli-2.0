<template>
    <le-form ref="store">
        <le-input label="name:" msg="请输入storeName" v-model="store.name" on required></le-input>
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
            on
            required
            msg="please select Request Type"
            label="requestType:"
            :data-source="dataSource.requestType"
            display-name="name"
            display-value="code"
            v-model="store.reqType"
        ></le-radio-list>
        <le-input
            label="url:"
            msg="请输入获取值的途径"
            v-model="store.url"
            on
            required
        ></le-input>
    </le-form>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    props: {
        store: Object,
        action:String,
        idx:Number,
    },
    data() {
        return {};
    },
    methods:{
        ...mapActions(["addStore","updateStore"]),
        submit(){
            if(this.action == "create"){
                this.addStore(this.store);
                return Promise.resolve()
            }else{
                this.updateStore({data:this.store,idx:this.idx});
                return Promise.resolve();
            }
        }
    },
    computed: {
        ...mapState(["dataSource"])
    }
};
</script>
<style lang="scss" scoped>
</style>