import "@components/leComponents.css";
import "@assets/css/font-awesome.css";

import LeButton from "@components/button/button.vue";
import LeSubmit from "@components/button/submit.vue";
import LeCheckboxList from "@components/checkbox/checkboxList.vue";
import LeRadioList from "@components/radio/radioList.vue";
import LeInput from "@components/input/vInput.vue";
import LeTextarea from "@components/input/vTextarea.vue";
import LeLocalSelect from "@components/select/localSelect.vue";
import LeRemoteSelect from "@components/remoteSelect/remoteSelect.vue";
import TableList from "@components/table/tableList.vue";
import LocalTableList from "@components/localTable/tableList.vue";
import LeUpload from "@components/upload/upload.vue";
import LeLocalUpload from "@components/upload/localUpload.vue";
import LeAsynTree from "@components/tree/asynTree.vue";
import LeLocalTree from "@components/tree/localTree.vue";
import LeForm from "@components/form/form.vue";
import LeDatePicker from "@components/datepicker/date.vue";
import LeTimePicker from "@components/datepicker/time.vue";
import LeDateTimePicker from "@components/datepicker/datetime.vue";
import LeDialog from "@components/dialog/dialog.vue";
import LeLoading from "@components/loading/loading.vue";
import Message from "@components/message";
import MessageBox from "@components/messageBox";
import LeUEditor from "@components/ueditor/ueditor.vue";
import LeDrag from 'vuedraggable';


// import LeUploadFile from "@components/upload/uploadFile.vue";


import bodyClickDirective from "@components/leDirective.js";
import lang18n from "@components/i18n.js";

const LeAlert = {
    showAlert(type, msg) {
        Message({ type, msg, showClose: true ,offset:0});
    },
    showConfirm(message, cb ,options = {}) {
        MessageBox({ message ,...options},cb)
    },
    showNotify() {

    }
}

export default {
    install(Vue) {
        Vue.component('LeButton', LeButton);
        Vue.component('LeSubmit',LeSubmit);
        Vue.component('LeCheckboxList',LeCheckboxList);
        Vue.component('LeRadioList', LeRadioList);
        Vue.component('LeInput', LeInput);
        Vue.component('LeTextarea', LeTextarea);
        Vue.component('LeLocalSelect', LeLocalSelect);
        Vue.component('LeRemoteSelect', LeRemoteSelect);
        Vue.component('TableList', TableList);
        Vue.component('LocalTableList', LocalTableList);
        Vue.component('LeUpload', LeUpload);
        Vue.component('LeLocalUpload', LeLocalUpload);
        Vue.component('LeAsynTree', LeAsynTree);
        Vue.component('LeLocalTree', LeLocalTree);
        Vue.component('LeDatePicker', LeDatePicker);
        Vue.component('LeTimePicker', LeTimePicker);
        Vue.component('LeDateTimePicker', LeDateTimePicker);
        Vue.component('LeDialog', LeDialog);
        Vue.component('LeForm', LeForm);
        Vue.component("LeLoading", LeLoading);
        Vue.component("LeUEditor", LeUEditor);
        Vue.component("LeDrag", LeDrag);
        
        // Vue.component('LeUploadFile',LeUploadFile);

        Vue.prototype.lang18n = lang18n;
        Vue.prototype.alert = LeAlert;
        Vue.directive('bodyClick', bodyClickDirective);
    }
}