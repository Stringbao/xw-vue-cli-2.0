 let temp = {
     "Modules": [{
             "ModuleName": "Inventory",
             "Pages": [
                 {
                     "pageName": "list.vue",
                     "type": "list",
                     "pageTitle": "库存管理",
                     "config": {
                         "searchModel": [
                             {
                                 "label": "商品名称",
                                 "type": "text",
                                 "field": "productCode"
                             },
                             {
                                 "label": "库存类型",
                                 "type": "select",
                                 "field": "roleType",
                                 "displayName": "name",
                                 "displayValue": "code",
                                 "dataSource": "inventoryType"
                             }
                         ],
                         "table": {
                             "url": "/inventoryAPI/api/inventory/queryInventoryInfo.jhtm",
                             "map": [
                                { key: "productCode", val: "<#Product Code#>" },
                                { key: "inventoryType", val: "<#Inventory Type#>"},
                                { key: "restQuantity", val: "<#Rest Quantity#>" },
                                { key: "reserveQuantity", val: "<#Reserve Quantity#>" },
                                { key: "weeklyQuantity", val: "<#Weekly Quantity#>" },
                                { key: "originalQuantity", val: "<#Original Quantity#>" },
                                { key: "seccQuantity", val: "<#SECC Quantitiy#>" },
                                { key: "limitQuantity", val: "<#Max Qty#>" },
                                { key: "remainQuantity", val: "<#remain quantity#>" },
                                { key: "createTimeLong", val: "<#Creation Time#>"},
                                { key: "updateTimeLong", val: "<#Updated Time#>"}
                             ],
                             "page": {
                                 "pageSize": "pageSize",
                                 "currentPage": "pageNum"
                             }
                         }
                     },
                     "model": [
                        //  {
                        //     "label": "角色类型",
                        //     "type": "select",
                        //     "field": "roleType",
                        //     "displayName": "name",
                        //     "displayValue": "code",
                        //     "dataSource": "inventoryType",
                        //     "on": true,
                        //     "required": true
                        // },
                        // {
                        //     "label": "商城类型",
                        //     "type": "select",
                        //     "field": "mallType",
                        //     "displayName": "name",
                        //     "displayValue": "code",
                        //     "dataSource": "malls"
                        // }
                    ]
                 },
                 {
                     "pageName": "save.vue",
                     "type": "save",
                     "model": [
                         {
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
                 "state": [
                     {
                         "name": "inventoryType",
                         "type": "enum",
                         "url": "KEYS.INVENTORY.INVENTORY_TYPE"
                     },
                     {
                        "name": "malls",
                        "type": "array",
                        "url": "/auth/dict/getdictmap?keys=MallType"
                    },
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