const code = { 
        render: function (context) {
            return [
                context.createNode(View, {
                    className: "viewBox",
                    id: "firstBox"
                },
                function (context) {
                    return [
                        context.createNode(Text, {
                            className: "textBox",
                            id: "secondBox"
                        },
                        function (context) {
                            return [
                                'nihao',
                                context.createNode(View, {
                                    className: "viewBox",
                                    id: "thirdBox"
                                },
                                function (context) {
                                    return [
                                        'happice'
                                    ];
                                }),
                                context.createNode(View, {
                                    className: "viewBox",
                                    id: "thirdBox"
                                },
                                function (context) {
                                    return [
                                        'happice'
                                    ];
                                })
                            ];
                        })
                    ];
                }),
                context.createNode(View, null),
                context.createNode(View, null)
            ];
        }
    }