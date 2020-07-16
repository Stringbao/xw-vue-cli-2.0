<template>
    <le-dialog :title="dialogTitle" v-model="dialog.showDialog" width="700" height="400">
        <div slot="body">
            <le-form ref="servicesForm">
                <le-input on required label="urlName:" v-model="storeObj.name"></le-input>
                <div class="form-item">
                    <le-radio-list
                        on
                        required
                        msg="please select RequestType"
                        label="requestType:"
                        :data-source="dataSource.requestType"
                        display-name="name"
                        display-value="code"
                        v-model="storeObj.type"
                    ></le-radio-list>
                </div>
                <le-input on required label="url:" v-model="storeObj.url"></le-input>
            </le-form>
        </div>
        <div slot="button">
            <le-button type="cancel" value="<#取消#>" @click="handleClose"></le-button>
            <le-button type="save" value="<#保存#>" @click="handleSave"></le-button>
        </div>
    </le-dialog>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss" scoped>
</style>