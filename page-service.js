import { App } from "./core/index.ts";

const pages = [
  {
    path: "./page/home/index",
    render: function (context) {
      return [
        context.createNode(
          View,
          {
            className: "viewBox",
            id: "firstBox",
          },
          function (context) {
            return [
              context.createNode(
                Text,
                {
                  className: "textBox",
                  id: "secondBox",
                },
                function (context) {
                  return [
                    "nihao",
                    context.createNode(
                      View,
                      {
                        className: "viewBox",
                        id: "thirdBox",
                      },
                      function (context) {
                        return ["happice"];
                      }
                    ),
                    context.createNode(
                      View,
                      {
                        className: "viewBox",
                        id: "thirdBox",
                        ref: `${context.getValue(a)}`,
                      },
                      function (context) {
                        return ["happice"];
                      }
                    ),
                  ];
                }
              ),
            ];
          }
        ),
        context.createNode(View, null),
        context.createNode(View, null),
      ];
    },
    js: function handleJS() {
      const a = 1;
    },
    css: function handleHpss() {},
  },
  {
    path: "./page/user/index",
    render: function (context) {
      return [
        context.createNode(view, null, function (context) {
          return ["test"];
        }),
      ];
    },
    js: function handleJS() {},
    css: function handleHpss() {},
  },
];
handleJS(null, App.bind(null, pages));
handleJS(
  App({
    data: {
      a: 1,
      b: 2,
    },
  }) // 暂时不能加分号，想想该咋办
);
