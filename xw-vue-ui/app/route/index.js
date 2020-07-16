
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
    }
];


export default routers;
