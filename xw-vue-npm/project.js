 let temp = {
     "Modules": [{
             "ModuleName": "test01",
             "Pages": [{
                 "pageName": "list.vue",
                 "type": "list",
                 "pageTitle": "Test List Page",
                 "config": {
                     "searchModel": [{
                         "label": "name",
                         "type": "text",
                         "field": "name"
                     }, {
                         "label": "type",
                         "type": "select",
                         "field": "type",
                         "displayName": "name",
                         "displayValue": "code",
                         "dataSource": "allTypes"
                     }],
                     "table": {
                         "url": "/api/getList",
                         "page": {
                             "pageSize": "size",
                             "currentPage": "index"
                         },
                         "map": [{
                             "key": "nam",
                             "val": "name"
                         }, {
                             "key": "code ",
                             "val": "code"
                         }]
                     }
                 },
                 "model": [{
                     "label": "name",
                     "type": "text",
                     "field": "name"
                 }, {
                     "label": "code",
                     "type": "text",
                     "field": "code"
                 }, {
                     "label": "malls",
                     "type": "select",
                     "field": "malls",
                     "dataSource": "malls",
                     "displayValue": "code",
                     "displayName": "name",
                     "on": true,
                     "required": false
                 }],
                 "moduleName": "test01"
             }, {
                 "pageName": "save.vue",
                 "type": "save",
                 "model": [{
                     "label": "name",
                     "type": "text",
                     "field": "name"
                 }, {
                     "label": "age",
                     "type": "select",
                     "field": "age",
                     "dataSource": "allTypes",
                     "displayName": "name",
                     "displayValue": "code",
                     "on": true,
                     "required": false
                 }],
                 "moduleName": "test01"
             }],
             "Services": [{
                 "name": "create",
                 "reqType": "post",
                 "url": "/api/create"
             }, {
                 "name": "update",
                 "reqType": "post",
                 "url": "/api/update"
             }, {
                 "name": "remove",
                 "reqType": "post",
                 "url": ""
             }, {
                 "name": "detail",
                 "reqType": "get",
                 "url": "/api/getone"
             }, {
                 "name": "list",
                 "reqType": "get",
                 "url": ""
             }],
             "Store": {
                 "state": [{
                     "name": "allTypes",
                     "type": "array",
                     "reqType": "get",
                     "url": "/api/getAllTypes"
                 }, {
                     "name": "malls",
                     "type": "enum",
                     "reqType": "get",
                     "url": "KEYS.MALLS.ALL"
                 }]
             }
         },
         {
             "ModuleName": "test02",
             "Pages": [{
                 "pageName": "test2.vue",
                 "type": "list",
                 "pageTitle": "test2",
                 "config": {
                     "searchModel": [{
                         "label": "name",
                         "type": "text",
                         "field": "name"
                     }, {
                         "label": "code",
                         "type": "text",
                         "field": "code"
                     }],
                     "table": {
                         "url": "/test2/get",
                         "page": {
                             "pageSize": "size",
                             "currentPage": "index"
                         },
                         "map": [{
                             "key": "name",
                             "val": "name"
                         }, {
                             "key": "code",
                             "val": "code"
                         }]
                     }
                 },
                 "model": [{
                     "label": "name",
                     "type": "text",
                     "field": "name",
                     "on": true,
                     "required": true
                 }, {
                     "label": "商城",
                     "type": "select",
                     "field": "mall",
                     "displayName": "name",
                     "displayValue": "code",
                     "dataSource": "malls",
                     "on": true,
                     "required": true
                 }, {
                     "label": "age",
                     "type": "text",
                     "field": "age",
                     "on": false
                 }],
                 "moduleName": "test02"
             }],
             "Services": [{
                 "name": "create",
                 "reqType": "post",
                 "url": "/test2/create"
             }, {
                 "name": "update",
                 "reqType": "post",
                 "url": ""
             }, {
                 "name": "remove",
                 "reqType": "post",
                 "url": "/test2/remove"
             }, {
                 "name": "detail",
                 "reqType": "get",
                 "url": ""
             }, {
                 "name": "list",
                 "reqType": "get",
                 "url": ""
             }],
             "Store": {
                 "state": [{
                     "name": "malls",
                     "type": "array",
                     "reqType": "get",
                     "url": "/test2/mallsall"
                 }]
             }
         }
     ]
 }

 module.exports = temp;