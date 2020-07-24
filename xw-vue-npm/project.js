 let temp = {
    "Modules": [{
        "ModuleName": "users",
        "Pages": [{
            "pageName": "list.vue",
            "type": "list",
            "pageTitle": "user list",
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
                    "label": "type",
                    "type": "select",
                    "field": "type",
                    "displayName": "name",
                    "displayValue": "code"
                }],
                "table": {
                    "url": "/api/user/list",
                    "showCK": "isCheckbox",
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
            "model": [{
                "label": "name",
                "type": "text",
                "field": "name",
                "on": true,
                "required": true,
                "msg": "name is required"
            }, {
                "label": "age",
                "type": "text",
                "field": "age",
                "required": false,
                "on": false
            }, {
                "label": "types",
                "type": "select",
                "field": "type",
                "displayName": "name",
                "displayValue": "code",
                "dataSource": "types",
                "on": true,
                "required": true,
                "msg": "required"
            }],
            "moduleName": "users"
        }],
        "Services": [{
            "name": "create",
            "reqType": "post",
            "url": "/api/user/create",
            "pageName": "list.vue",
            "stype": 1
        }, {
            "name": "update",
            "reqType": "post",
            "url": "/api/user/update",
            "pageName": "list.vue",
            "stype": 1
        }, {
            "name": "remove",
            "reqType": "post",
            "url": "/api/user/remove",
            "pageName": "list.vue",
            "stype": 1
        }, {
            "name": "detail",
            "reqType": "get",
            "url": "",
            "pageName": "",
            "stype": 1
        }],
        "Store": {
            "state": [{
                "name": "types",
                "type": "array",
                "reqType": "get",
                "url": "/api/user/types"
            }]
        }
    }, 
    {
        "ModuleName": "roles",
        "Pages": [
            {
            "pageName": "list.vue",
            "type": "list",
            "pageTitle": "role list",
            "config": {
                "searchModel": [{
                    "label": "roleName",
                    "type": "text",
                    "field": "name"
                }],
                "table": {
                    "url": "/api/roles/list",
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
                        "key": "roleInfo",
                        "val": "roleInfo"
                    }]
                },
                "toolbar": []
            },
            "model": [],
            "moduleName": "roles"
        }, 
        {
            "pageName": "save.vue",
            "type": "save",
            "model": [{
                "label": "name",
                "type": "text",
                "field": "name",
                "on": true,
                "required": true,
                "msg": "required"
            }, {
                "label": "info",
                "type": "text",
                "field": "info",
                "on": false,
                "required": false
            }, {
                "label": "roleTypes",
                "type": "select",
                "field": "types",
                "dataSource": "roletypes",
                "displayName": "name",
                "displayValue": "code",
                "on": true,
                "required": true,
                "msg": "required",
                "tip": "this is required"
            }],
            "moduleName": "roles"
        }],
        "Services": [{
            "name": "create",
            "reqType": "post",
            "url": "/api/role/create",
            "pageName": "list.vue,save.vue",
            "stype": 1
        }, {
            "name": "update",
            "reqType": "post",
            "url": "/api/role/update",
            "pageName": "list.vue,save.vue",
            "stype": 1
        }, {
            "name": "remove",
            "reqType": "post",
            "url": "/api/role/remove",
            "pageName": "list.vue",
            "stype": 1
        }, {
            "name": "detail",
            "reqType": "get",
            "url": "/api/role/detail",
            "pageName": "list.vue,save.vue",
            "stype": 1
        }],
        "Store": {
            "state": [{
                "name": "roletypes",
                "type": "array",
                "url": "/api/roletypes",
                "reqType": "get"
            }]
        }
    }],
    "absoultePath": "/Users/wupeng/Documents/aaa"
 }

 module.exports = temp;