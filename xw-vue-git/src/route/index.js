
const routers = [
    {
        path:"/",
        name: 'Layout',
        redirect:"/home",
        component:() => import('@pages/layout/Layout.vue'),
        children:[
            {path:"home",name:'home',component:()=>import('@pages/views/Home/Home.vue')},
            {path:"module",name:'module',component:()=>import('@pages/views/Module/Module.vue')},
            {path:"project",name:'project',component:()=>import('@pages/views/Project/Project.vue')},
        ]
    }
];


export default routers;
