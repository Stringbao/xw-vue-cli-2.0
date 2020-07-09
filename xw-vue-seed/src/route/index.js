const routers = [
    {
        path: '/',
        name: 'login',
        component:() => import('@pages/views/login/login.vue')
    },
    {
        path: '/saleList',
        name: 'saleList',
        component:() => import('@pages/views/sales/list.vue'),
        children:[
            
        ]
    },
    {
        path: '/saleList/:id/:tag',
        name: 'save',
        component:() => import('@pages/views/sales/save.vue')
    }
];

export default routers;