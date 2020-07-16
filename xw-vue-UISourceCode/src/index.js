import "@components/leComponents.css";
import "@assets/css/font-awesome.css";

import LeButton from "@components/button/button.vue";
import LeCheckboxList from "@components/checkbox/checkboxList.vue";
import LeRadioList from "@components/radio/radioList.vue";
import LeInput from "@components/input/vInput.vue";
import LeTextarea from "@components/input/vTextarea.vue";
import LeLocalSelect from "@components/select/localSelect.vue";
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
import LeAlert from "@components/alert/alert.js";


import ValidataHOC from "@components/validataHOC.js";
import bodyClickDirective from "@components/leDirective.js";
import lang18n from "@components/i18n.js";


export default {
    install(Vue){
        Vue.component('LeButton',LeButton);
        Vue.component('LeCheckboxList',ValidataHOC(LeCheckboxList));
        Vue.component('LeRadioList',ValidataHOC(LeRadioList));
        Vue.component('LeInput',ValidataHOC(LeInput));
        Vue.component('LeTextarea',ValidataHOC(LeTextarea));
        Vue.component('LeLocalSelect',ValidataHOC(LeLocalSelect));
        Vue.component('TableList',TableList);
        Vue.component('LocalTableList',LocalTableList);
        Vue.component('LeUpload',ValidataHOC(LeUpload));
        Vue.component('LeLocalUpload',ValidataHOC(LeLocalUpload));
        Vue.component('LeAsynTree',LeAsynTree);
        Vue.component('LeLocalTree',LeLocalTree);
        Vue.component('LeDatePicker',ValidataHOC(LeDatePicker));
        Vue.component('LeTimePicker',ValidataHOC(LeTimePicker));
        Vue.component('LeDateTimePicker',ValidataHOC(LeDateTimePicker));
        Vue.component('LeDialog',LeDialog);
        Vue.component('LeForm',LeForm);
        Vue.component("LeLoading",LeLoading);
        
        Vue.prototype.lang18n = lang18n;
        Vue.use(LeAlert);
        Vue.directive('bodyClick', bodyClickDirective);
    }
}