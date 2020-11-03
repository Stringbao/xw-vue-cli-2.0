
const routers = [
    {
        path: '/',
        name: 'login',
        component:() => import('@pages/login/login.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        component:() => import('@pages/demo/Demo-v2.vue')
    },
    {
        path: '/tree',
        name: 'tree',
        component:() => import('@pages/demo/tree.vue')
    },
    {
        path: '/test',
        name: 'test',
        component:() => import('@pages/demo/test.vue')
    }
];


export default routers;
