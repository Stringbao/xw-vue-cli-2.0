import Vue from 'vue';
import Router from 'vue-router';

const H = r=>require.ensure([],()=>r(require("../configModules/h.vue")),"H");
const TEST = r=>require.ensure([],()=>r(require("../pages/test/test.vue")),"TEST");
const TreeTest = r=>require.ensure([],()=>r(require("../pages/tree.vue")),"TreeTest");
const Login = r=>require.ensure([],()=>r(require("../pages/login/login.vue")),"Login");

const buttonPage = r=>require.ensure([],()=>r(require("../pages/buttonPage.vue")),"ButtonPage");

const newTestPage = r=>require.ensure([],()=>r(require("../pages/newTestPage.vue")),"newTestPage");
const newTestPageAdd = r=>require.ensure([],()=>r(require("../pages/newTestPageAdd.vue")),"newTestPageAdd");

Vue.use(Router);

const routers = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/test',
        name: 'test',
        component: TEST
    },
    {
        path: '/main',
        name: 'h',
        component: H
    },
    {
        path: '/tree',
        name: 'tree',
        component: TreeTest
    },
    {
        path:'/button',
        name:'button',
        component:buttonPage
    },
    {
        path:'/newTestPage',
        name:'newTestPage',
        component:newTestPage
    },{
        path:'/newTestPageAdd',
        name:'newTestPageAdd',
        component:newTestPageAdd
    }
];

const _router = new Router({
    routes: routers
});

export default _router;
