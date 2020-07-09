
import "@CoreUILib/leComponents.css";
import "@CoreSrc/static/css/font-awesome.css";

import LeButton from "@CoreUILib/button/button.vue";
import LeCheckboxList from "@CoreUILib/checkbox/checkboxList.vue";
import LeRadioList from "@CoreUILib/radio/radioList.vue";
import LeInput from "@CoreUILib/input/vInput.vue";
import LeTextarea from "@CoreUILib/input/vTextarea.vue";
import LeLocalSelect from "@CoreUILib/select/localSelect.vue";
import TableList from "@CoreUILib/table/tableList.vue";
import LocalTableList from "@CoreUILib/localTable/tableList.vue";
import LeUpload from "@CoreUILib/upload/upload.vue";
import LeLocalUpload from "@CoreUILib/upload/localUpload.vue";
import LeAsynTree from "@CoreUILib/tree/asynTree.vue";
import LeLocalTree from "@CoreUILib/tree/localTree.vue";
import LeForm from "@CoreUILib/form/form.vue";
import LeDatePicker from "@CoreUILib/datepicker/date.vue";
import LeTimePicker from "@CoreUILib/datepicker/time.vue";
import LeDateTimePicker from "@CoreUILib/datepicker/datetime.vue";
import LeDialog from "@CoreUILib/dialog/dialog.vue";
import LeLoading from "@CoreUILib/loading/loading.vue";
import LeAlert from "@CoreUILib/alert/alert.js";

import ValidataHOC from "@CoreUILib/validataHOC.js";
import bodyClickDirective from "@CoreUILib/leDirective.js";
import lang18n from "@CoreUILib/i18n.js";

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