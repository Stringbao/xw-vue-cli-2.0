
const routers = [
    {
        path: '/',
        name: 'login',
        component:() => import('@pages/login/login.vue')
    },
    {
        path: '/demo',
        name: 'demo',
        component:() => import('@pages/demo/Demo.vue')
    },
    {
        path: '/tree',
        name: 'tree',
        component:() => import('@pages/demo/tree.vue')
    }
];


export default routers;
