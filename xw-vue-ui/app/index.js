import Vue from 'vue';
import App from './App.vue';

import Router from "vue-router";
import routes from '@route/index.js';

// import LeComponent from "@/index.js";
import LeComponent from "@root/dist/leComponent.min.js";

Vue.use(LeComponent);
Vue.use(Router);

const router = new Router({routes});
Vue.config.productionTip = false;

new Vue({
   router,
   render: h => h(App)
}).$mount('#app')