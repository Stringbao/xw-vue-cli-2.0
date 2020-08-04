 let temp = {
     "Modules": [{
         "ModuleName": "test",
         "Pages": [{
             "pageName": "list.vue",
             "type": "list",
             "pageTitle": "test list",
             "config": {
                 "searchModel": [{
                         "label": "name",
                         "type": "text",
                         "field": "name"
                     }, {
                         "label": "code",
                         "type": "text",
                         "field": "code"
                     }, {
                         "label": "stype",
                         "type": "select",
                         "field": "stype",
                         "displayName": "name",
                         "displayValue": "code",
                         "dataSource": "stypes"
                     },
                     {
                         "label": "name1",
                         "type": "text",
                         "field": "name1"
                     }, {
                         "label": "code2",
                         "type": "text",
                         "field": "code2"
                     }
                 ],
                 "table": {
                     "url": "/api/get/list",
                     "showCK": "isRadio",
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
                     }, {
                         "key": "stype",
                         "val": "stype"
                     }]
                 },
                 "toolbar": [{
                     "type": "download",
                     "value": "download",
                     "fnName": "downloadFn"
                 }]
             },
             "model": []
         }, {
             "pageName": "save.vue",
             "type": "save",
             "model": [{
                 "label": "name",
                 "type": "text",
                 "field": "name",
                 "on": true,
                 "required": true,
                 "msg": "sss"
             }, {
                 "label": "code",
                 "type": "text",
                 "field": "code",
                 "on": false,
                 "required": false
             }, {
                 "label": "stype",
                 "type": "select",
                 "field": "stype",
                 "displayName": "name",
                 "displayValue": "code",
                 "dataSource": "stypes",
                 "msg": "displayValue"
             }, {
                 "label": "picker",
                 "type": "dateTimepicker",
                 "field": "picker",
                 "on": true,
                 "required": true,
                 "msg": "picker"
             }]
         }],
         "Services": [
             {
             "name": "create",
             "reqType": "get",
             "url": "/api/create",
             "pageName": "list.vue,save.vue",
             "stype": 1
         }, 
         {
             "name": "update",
             "reqType": "post",
             "url": "/api/create",
             "pageName": "list.vue,save.vue",
             "stype": 1
         }, {
             "name": "remove",
             "reqType": "get",
             "url": "/api/remove",
             "pageName": "list.vue,save.vue",
             "stype": 1
         }, {
             "name": "detail",
             "reqType": "get",
             "url": "/api/detail",
             "pageName": "list.vue,save.vue",
             "stype": 1
         }],
         "Store": {
             "state": [{
                     "name": "stypes",
                     "type": "array",
                     "reqType": "get",
                     "url": "/api/stypes"
                 },
                 {
                     "name": "domains",
                     "type": "enum",
                     "reqType": "get",
                     "url": "KEYS.DOMAINS.DOMAINAPP"
                 }
             ]
         }
     }],
     "absoultePath": "/Users/wupeng/Documents/aaa"
 };
 module.exports = temp;