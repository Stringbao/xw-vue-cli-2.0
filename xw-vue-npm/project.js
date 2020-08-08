let temp = {
    Modules: [
        // {
        //     ModuleName: "test",
        //     Pages: [
        //         {
        //             pageName: "list.vue",
        //             type: "list",
        //             pageTitle: "test list",
        //             config: {
        //                 searchModel: [
        //                     {
        //                         label: "name",
        //                         type: "text",
        //                         field: "name",
        //                     },
        //                     {
        //                         label: "code",
        //                         type: "text",
        //                         field: "code",
        //                     },
        //                     {
        //                         label: "stype",
        //                         type: "select",
        //                         field: "stype",
        //                         displayName: "name",
        //                         displayValue: "code",
        //                         dataSource: "stypes",
        //                     },
        //                     {
        //                         label: "name1",
        //                         type: "text",
        //                         field: "name1",
        //                     },
        //                     {
        //                         label: "code2",
        //                         type: "text",
        //                         field: "code2",
        //                     },
        //                 ],
        //                 table: {
        //                     url: "/api/get/list",
        //                     showCK: "isRadio",
        //                     page: {
        //                         pageSize: "size",
        //                         currentPage: "index",
        //                     },
        //                     map: [
        //                         {
        //                             key: "name",
        //                             val: "name",
        //                         },
        //                         {
        //                             key: "code",
        //                             val: "code",
        //                         },
        //                         {
        //                             key: "stype",
        //                             val: "stype",
        //                         },
        //                     ],
        //                 },
        //                 toolbar: [
        //                     {
        //                         type: "download",
        //                         value: "download",
        //                         fnName: "downloadFn",
        //                     },
        //                 ],
        //             },
        //             model: [
        //                 {
        //                     label: "name",
        //                     type: "text",
        //                     field: "name",
        //                     on: true,
        //                     required: true,
        //                     msg: "sss",
        //                 },
        //                 {
        //                     label: "code",
        //                     type: "text",
        //                     field: "code",
        //                     on: false,
        //                     required: false,
        //                 },
        //                 {
        //                     label: "stype",
        //                     type: "select",
        //                     field: "stype",
        //                     displayName: "name",
        //                     displayValue: "code",
        //                     dataSource: "stypes",
        //                     msg: "displayValue",
        //                 },
        //                 {
        //                     label: "picker",
        //                     type: "dateTimepicker",
        //                     field: "picker",
        //                     on: true,
        //                     required: true,
        //                     msg: "picker",
        //                 },
        //             ],
        //             hasDialog: true,
        //             moduleName: "test",
        //         },
        //     ],
        //     Services: [
        //         {
        //             name: "create",
        //             reqType: "get",
        //             url: "/api/create",
        //             pageName: "list.vue",
        //             stype: 1,
        //             isCommon: false,
        //         },
        //         {
        //             name: "update",
        //             reqType: "post",
        //             url: "/api/create",
        //             pageName: "list.vue",
        //             stype: 1,
        //             isCommon: false,
        //         },
        //         {
        //             name: "remove",
        //             reqType: "get",
        //             url: "/api/remove",
        //             pageName: "save.vue",
        //             stype: 1,
        //             isCommon: false,
        //         },
        //         {
        //             name: "detail",
        //             reqType: "get",
        //             url: "/api/detail",
        //             pageName: "save.vue",
        //             stype: 1,
        //             isCommon: false,
        //         },
        //     ],
        //     Store: [
        //         {
        //             name: "stypes",
        //             type: "array",
        //             reqType: "get",
        //             url: "/api/stypes",
        //             isCommon: false,
        //         },
        //         {
        //             name: "domains",
        //             type: "enum",
        //             reqType: "get",
        //             url: "KEYS.DOMAINS.DOMAINAPP",
        //             isCommon: false,
        //         },
        //     ],
        // },
        {
            ModuleName: "bbb",
            Pages: [
                {
                    pageName: "list.vue",
                    type: "list",
                    pageTitle: "test list",
                    config: {
                        searchModel: [
                            {
                                label: "name",
                                type: "text",
                                field: "name",
                            },
                            {
                                label: "code",
                                type: "text",
                                field: "code",
                            },
                            {
                                label: "stype",
                                type: "select",
                                field: "stype",
                                displayName: "name",
                                displayValue: "code",
                                dataSource: "stypes",
                            },
                            {
                                label: "name1",
                                type: "text",
                                field: "name1",
                            },
                            {
                                label: "code2",
                                type: "text",
                                field: "code2",
                            },
                        ],
                        table: {
                            url: "/api/get/list",
                            showCK: "isRadio",
                            page: {
                                pageSize: "size",
                                currentPage: "index",
                            },
                            map: [
                                {
                                    key: "name",
                                    val: "name",
                                },
                                {
                                    key: "code",
                                    val: "code",
                                },
                                {
                                    key: "stype",
                                    val: "stype",
                                },
                            ],
                        },
                        toolbar: [
                            {
                                type: "download",
                                value: "download",
                                fnName: "downloadFn",
                            },
                        ],
                    },
                    model: [
                        {
                            label: "name",
                            type: "text",
                            field: "name",
                            on: true,
                            required: true,
                            msg: "sss",
                        },
                        {
                            label: "code",
                            type: "text",
                            field: "code",
                            on: false,
                            required: false,
                        },
                        {
                            label: "stype",
                            type: "select",
                            field: "stype",
                            displayName: "name",
                            displayValue: "code",
                            dataSource: "stypes",
                            msg: "displayValue",
                        },
                        {
                            label: "picker",
                            type: "dateTimepicker",
                            field: "picker",
                            on: true,
                            required: true,
                            msg: "picker",
                        },
                    ],
                    hasDialog: false,
                    moduleName: "test",
                },
                {
                    pageName: "save.vue",
                    type: "save",
                    model: [
                        {
                            label: "name",
                            type: "text",
                            field: "name",
                            on: true,
                            required: true,
                            msg: "sss",
                        },
                        {
                            label: "code",
                            type: "text",
                            field: "code",
                            on: false,
                            required: false,
                        },
                        {
                            label: "stype",
                            type: "select",
                            field: "stype",
                            displayName: "name",
                            displayValue: "code",
                            dataSource: "stypes",
                            msg: "displayValue",
                        },
                        {
                            label: "picker",
                            type: "dateTimepicker",
                            field: "picker",
                            on: true,
                            required: true,
                            msg: "picker",
                        },
                    ],
                    hasDialog: false,
                    moduleName: "test",
                },
            ],
            Services: [
                {
                    name: "create",
                    reqType: "post",
                    url: "/api/aaa",
                    pageName: "save.vue",
                    stype: 1,
                    isCommon: false,
                },
                {
                    name: "update",
                    reqType: "post",
                    url: "/api/aaa1",
                    pageName: "save.vue",
                    stype: 1,
                    isCommon: false,
                },
                {
                    name: "remove",
                    reqType: "post",
                    url: "/api/aaa12",
                    pageName: "save.vue",
                    stype: 1,
                    isCommon: false,
                },
                {
                    name: "detail",
                    reqType: "get",
                    url: "/api/aaa23",
                    pageName: "save.vue",
                    stype: 1,
                    isCommon: false,
                },
                {
                    name: "download",
                    reqType: "get",
                    url: "/api/aaa23",
                    pageName: "list.vue",
                    stype: 1,
                    isCommon: false,
                },
            ],
            Store: [],
        },
    ],
    commonStore: [
        {
            name: "stypes",
            type: "array",
            reqType: "get",
            url: "/api/stypes",
            isCommon: true,
        },
        {
            name: "malls",
            type: "enum",
            reqType: "get",
            url: "KEYS.COMMON.MALLS",
            isCommon: true,
        },
    ],
    absoultePath: "/Users/wupeng/Documents/aaa",
};
module.exports = temp;
