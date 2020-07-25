 let temp = {
    "Modules": [{
        "ModuleName": "price",
        "Pages": [{
            "pageName": "list.vue",
            "type": "list",
            "pageTitle": "list",
            "config": {
                "searchModel": [{
                    "label": "name",
                    "type": "text",
                    "field": "name"
                }],
                "table": {
                    "url": "/api/get/1",
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
                    }]
                },
                "toolbar": [{
                    "type": "download",
                    "value": "download",
                    "fnName": "downloadFn"
                }]
            },
            "model": [],
            "moduleName": "price"
        }, {
            "pageName": "list2.vue",
            "type": "list",
            "pageTitle": "list",
            "config": {
                "searchModel": [{
                    "label": "ddd",
                    "type": "text",
                    "field": "sss"
                }, {
                    "label": "aaa",
                    "type": "text",
                    "field": "ddd"
                }],
                "table": {
                    "url": "2price",
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
                    }]
                },
                "toolbar": [{
                    "type": "reject",
                    "value": "reject",
                    "fnName": "rejectFn"
                }]
            },
            "model": [],
            "moduleName": "price"
        }],
        "Services": [{
            "name": "create",
            "reqType": "post",
            "url": "/api/list1",
            "pageName": "list.vue,list2.vue",
            "stype": 1
        }, {
            "name": "update",
            "reqType": "post",
            "url": "/api/list/up",
            "pageName": "list.vue,list2.vue",
            "stype": 1
        }, {
            "name": "remove",
            "reqType": "post",
            "url": "/api/list/remove",
            "pageName": "list.vue",
            "stype": 1
        }, {
            "name": "detail",
            "reqType": "get",
            "url": "/api/lis/detail",
            "pageName": "list2.vue",
            "stype": 1
        }, {
            "name": "list2Create",
            "reqType": "get",
            "url": "/api/ds2",
            "pageName": "list2.vue",
            "stype": 2
        }, {
            "name": "up2",
            "reqType": "post",
            "url": "/api/up2",
            "pageName": "list2.vue",
            "stype": 2
        }],
        "Store": {
            "state": []
        }
    }],
    "absoultePath": "/Users/wupeng/Documents/aaa"
 }

 module.exports = temp;