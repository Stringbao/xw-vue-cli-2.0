import "@assets/app.css";
import "@assets/font/iconfont.css";
import "@assets/font/iconfont.js";
import Vue from 'vue';
import App from './App.vue';

import Router from "vue-router";
import routes from '@route/index.js';


import Vuex from 'vuex';
import stores from "@store/index.js";

import LeComponents from "@pages/components/le-components.min.js";


Vue.use(Vuex);
Vue.use(Router);
Vue.use(LeComponents);



const store = new Vuex.Store(stores)
const router = new Router({routes});

Vue.directive('highlight', function (el) {
   let blocks = el.querySelectorAll('pre code');
       blocks.forEach((block) => {
           hljs.highlightBlock(block)
          })
})




Vue.config.productionTip = false

new Vue({
   router,
   store,
   render: h => h(App)
}).$mount('#app')
