<template>
    <le-form ref="model">
        <le-input label="name:" msg="请输入model的name" v-model="model.name" on required></le-input>
        <ul class="propsList">
            <!-- <li class="item"></li> -->
            <li class="item createBtn">
                <i class="fr addParams iconfont icon-add" type="button" @click="add">添加属性</i>
            </li>
        </ul>
    </le-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                name: "",
                props: [],
            },
        };
    },
    methods: {
        add() {},
    },
};
</script>
<style lang="scss" scoped>
.propsList {
    .item {
        overflow-x: auto;
        display: flex;
        margin-bottom: 20px;
        overflow: visible;
        border-bottom: 1px solid #ccc;
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
</style>