<template>
    <div class="project_wrapper">
        <h2>项目名称:{{project}}</h2>
        <table class="table" border="1">
            <thead>
                <tr>
                    <th>模块</th>
                    <th>页面</th>
                </tr>
            </thead>
            <tbody v-for="(item,index) in modules" :key="index">
                <tr v-for="(childItem,childIndex) in item.Pages" :key="childIndex">
                    <td :rowspan="item.Pages.length" v-if="childIndex == 0">{{item.ModuleName}}</td>
                    <td>{{childItem.PageName}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["modules", "project"])
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.project_wrapper {
    h2 {
        font-size: 18px;
        padding-bottom: 12px;
    }
    .table {
        width: 100%;
        tr th {
            height: 38px;
        }
        tr td {
            height: 38px;
            padding-left: 12px;
        }
    }
}
</style>
