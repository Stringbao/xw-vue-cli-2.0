 let temp = {
     "Modules": [{
             "ModuleName": "Roles",
             "Pages": [{
                     "pageName": "list.vue",
                     "type": "list",
                     "pageTitle": "角色管理列表",
                     "config": {
                         "searchModel": [{
                                 "label": "角色名称",
                                 "type": "text",
                                 "field": "roleName"
                             },
                             {
                                 "label": "角色类型",
                                 "type": "select",
                                 "field": "roleType",
                                 "displayName": "name",
                                 "displayValue": "value",
                                 "dataSource": "salesRoute"
                             }
                         ],
                         "table": {
                             "url": "/api/getRoleTypes",
                             "map": [{
                                     "field": "channelCode",
                                     "label": "Sale Channel"
                                 },
                                 {
                                     "field": "materialNumber",
                                     "label": "Material"
                                 }
                             ],
                             "page": {
                                 "pageSize": "pageSize",
                                 "currentPage": "currentPage"
                             }
                         }
                     },
                     "model": [{
                         "label": "角色类型",
                         "type": "select",
                         "field": "roleType",
                         "displayName": "name",
                         "displayValue": "value",
                         "dataSource": "salesRouteA",
                         "on": true,
                         "required": true
                     }]
                 },
                 {
                     "pageName": "save.vue",
                     "type": "save",
                     "model": [{
                             "label": "角色类型",
                             "type": "select",
                             "field": "roleType",
                             "displayName": "name",
                             "displayValue": "value",
                             "dataSource": "salesRouteA",
                             "on": true,
                             "required": true
                         },
                         {
                             "label": "角色名称",
                             "type": "text",
                             "field": "roleName"
                         }
                     ]
                 }
             ],
             "Services": [{
                     "name": "create",
                     "reqType": "post",
                     "url": "/api/getRoleTypes"
                 },
                 {
                     "name": "update",
                     "reqType": "post",
                     "url": ""
                 },
                 {
                     "name": "remove",
                     "reqType": "post",
                     "url": "/api/getRoleTypes"
                 },
                 {
                     "name": "detail",
                     "url": "/api/getRoleTypes"
                 },
                 {
                     "name": "list",
                     "url": "/api/getRoleTypes"
                 },
                 {
                     "name": "querySubItems",
                     "url": "/api/getSubItems"
                 }
             ],
             "Store": {
                 "state": [{
                         "name": "salesRoute",
                         "type": "array",
                         "url": "/api/getRoleTypes"
                     },
                     {
                         "name": "salesRoute_A",
                         "type": "array",
                         "reqType": "post",
                         "url": "/api/getRoleTypes"
                     },
                     {
                         "name": "salesRoute_B",
                         "type": "enum",
                         "url": "KEYS.SALES.ACTION_LIST"
                     },
                     {
                         "name": "salesRoute_C",
                         "type": "enum",
                         "url": "KEYS.SALES.ACTION_List_C"
                     }
                 ]
             }
         },
         {
             "ModuleName": "Menus",
             "Pages": [{
                     "pageName": "list.vue",
                     "type": "list",
                     "pageTitle": "菜单管理列表",
                     "config": {
                         "searchModel": [{
                                 "label": "菜单名称",
                                 "type": "text",
                                 "field": "MenuName"
                             },
                             {
                                 "label": "菜单类型",
                                 "type": "select",
                                 "field": "roleType",
                                 "displayName": "name",
                                 "displayValue": "value",
                                 "dataSource": "MenusRoute"
                             }
                         ],
                         "table": {
                             "url": "/api/getRoleTypesss",
                             "map": [{
                                     "field": "channelCode",
                                     "label": "Sale Channel"
                                 },
                                 {
                                     "field": "materialNumber",
                                     "label": "Material"
                                 }
                             ],
                             "page": {
                                 "pageSize": "pageSize",
                                 "currentPage": "currentPage"
                             }
                         }
                     },
                     "model": [{
                         "label": "其他类型",
                         "type": "select",
                         "field": "roleType",
                         "displayName": "name",
                         "displayValue": "value",
                         "dataSource": "salesRouteA",
                         "on": true,
                         "required": true
                     }]
                 },
                 {
                     "pageName": "save.vue",
                     "type": "save",
                     "model": [{
                             "label": "菜单类型",
                             "type": "select",
                             "field": "roleType",
                             "displayName": "name",
                             "displayValue": "value",
                             "dataSource": "salesRouteA",
                             "on": true,
                             "required": true
                         },
                         {
                             "label": "菜单别名",
                             "type": "text",
                             "field": "roleName"
                         }
                     ]
                 }
             ],
             "Services": [
                 {
                     "name":"create",
                     "reqType": "post",
                     "url": "/api/getMenuTypes"
                 },
                 {
                    "name":"update",
                     "reqType": "post",
                     "url": ""
                 },
                 {
                    "name":"remove",
                     "reqType": "post",
                     "url": "/api/getMenuTypes"
                 },
                 {
                    "name":"detail",
                     "url": "/api/getMenuTypes"
                 },
                 {
                    "name":"list",
                     "url": "/api/getMenuTypes"
                 },
                 {
                    "name":"querySubItems",
                     "url": "/api/getMenusSubItems"
                 }
            ],
             "Store": {
                 "state": [{
                         "name": "menusRoute",
                         "type": "array",
                         "url": "/api/getMenuTypes"
                     },
                     {
                         "name": "MenusRoute_A",
                         "type": "array",
                         "reqType": "post",
                         "url": "/api/getRoleTypes"
                     },
                     {
                         "name": "MenusRoute_B",
                         "type": "enum",
                         "url": "KEYS.SALES.ACTION_LIST_BB"
                     },
                     {
                         "name": "MenusRoute_C",
                         "type": "enum",
                         "url": "KEYS.SALES.ACTION_List_CC"
                     }
                 ]
             }
         }
     ]
 }

 module.exports = temp;