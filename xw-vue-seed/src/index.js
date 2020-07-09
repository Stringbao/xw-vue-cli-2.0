import "@assets/app.css";

import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import Router from 'vue-router';
import routers from '@route/index.js';
import storeModules from "@store/index.js";

// //init store
Vue.use(Vuex);
let store = new Vuex.Store({
    namespaced: true,
    modules:storeModules
});

//init router
Vue.use(Router);
const router = new Router({
    routes: routers
});

import LeComponents from "@pages/components/le-components.min.js";
Vue.use(LeComponents);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app")
