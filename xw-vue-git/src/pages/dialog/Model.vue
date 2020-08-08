<template>
    <le-form ref="model">
        <le-input label="name:" msg="请输入model的name" v-model="model.name" on required></le-input>
        <ul class="propsList">
            <li class="clearfix" v-for="(item, idx) in model.props" :key="idx">
                <div>
                    <div class="le_form_row_item">
                        <le-local-select
                            label="type:"
                            :data-source="pagesDatasource.dialogFieldType"
                            display-name="name"
                            display-value="name"
                            v-model="item.type"
                        ></le-local-select>
                        <le-input label="label:" v-model="item.label"></le-input>
                        <le-input label="field:" v-model="item.field"></le-input>
                        <le-button
                            class="fr"
                            type="remove"
                            value="deleteItem"
                            @click="remove(idx)"
                        ></le-button>
                    </div>
                    <div
                        class="le_form_row_item"
                        v-if="item.type == 'select' || item.type == 'checkboxList' || item.type=='radioList'"
                    >
                        <le-input label="displayName:" v-model="item.displayName"></le-input>
                        <le-input label="displayValue:" v-model="item.displayValue"></le-input>
                        <le-local-select
                            label="dataSource"
                            :data-source="dataSource.state"
                            display-name="name"
                            display-value="name"
                            v-model="item.dataSource"
                        ></le-local-select>
                        <le-button
                            class="fr"
                            type="create"
                            value="datasource"
                            @click="showDatasource"
                        ></le-button>
                    </div>
                    <div class="col4">
                        <le-radio-list
                            label="on:"
                            :data-source="pagesDatasource.dialogValidateType"
                            display-name="name"
                            display-value="code"
                            v-model="item.on"
                        ></le-radio-list>
                        <le-radio-list
                            label="required:"
                            :data-source="pagesDatasource.dialogValidateType"
                            display-name="name"
                            display-value="code"
                            v-model="item.required"
                        ></le-radio-list>
                        <le-input label="msg:" v-model="item.msg"></le-input>
                    </div>
                    <div class="clearfix le_form_row_item co2">
                        <le-input label="tip:" v-model="item.tip"></le-input>
                        <!-- <le-input label="Vtype:" v-model="item.Vtype" v-if="item.type == 'text'"></le-input> -->
                        <le-local-select
                            label="Vtype"
                            v-if="item.type == 'text'"
                            :data-source="pagesDatasource.vtypeList"
                            display-name="name"
                            display-value="code"
                            v-model="item.Vtype"
                        ></le-local-select>
                    </div>
                </div>
            </li>
            <li class="item createBtn">
                <i class="fr addParams iconfont icon-add" type="button" @click="add">添加属性</i>
            </li>
        </ul>
    </le-form>
</template>
<script>
import { mapState,mapActions,mapMutations } from "vuex";
export default {
    data() {
        return {
            model: {
                name: "",
                props: [],
            },
        };
    },
    computed:{
        ...mapState(['dataSource','pagesDatasource'])
    },
    methods: {
        add() {
            this.model.props.push({
                type:"text",
                label:"",
                field:"",
            })
        },
        remove(i){
            this.model.props.splice(i,1)
        },
        showDatasource(){
            
        }
    },
};
</script>
<style lang="scss" scoped>
.propsList {
    border-bottom: 1px solid #dcdfe6;
    // margin-bottom: 20px;
    li {
        overflow-x: auto;
        display: flex;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 20px;
        overflow: visible;
    }
    .createBtn {
        text-align: center;
        border: none;
        line-height: 30px;
        background-color: #e0e0e0;
        margin-bottom: 0;
        font-weight: 900;
        background-color: #a2d469;
        color: #fff;
        font-size: 16px;

        i {
            width: 100%;
        }
    }
}
.mapItem {
    margin-bottom: 20px;
}
.item:last-child {
    border-bottom: none;
}
.addParams {
    width: 40px;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    cursor: pointer;
}
</style>