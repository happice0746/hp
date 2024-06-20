import { App } from "./core/index.ts";

const pages = [
  {
    path: "./page/home/index",
    js: function handleJS(Page, App, Component, getCurrentPages, hp) {
      const a = 1;
      Page({
        data: {
          a,
          b: 11,
        },
        onLaunch: () => {
          console.log("hello, world");
        },
      });
    },
    render: function (context) {
      return [
        context.createNode(
          "view",
          {
            className: "viewBox",
            id: "firstBox",
          },
          function (context) {
            return [
              context.createNode(
                "text",
                {
                  className: "textBox",
                  id: "secondBox",
                },
                function (context) {
                  return [
                    context.createNode(
                      "View",
                      {
                        className: "viewBox",
                        id: "thirdBox",
                      },
                      function (context) {
                        return ["happice"];
                      }
                    ),
                    context.createNode(
                      "view",
                      {
                        className: "viewBox",
                        id: "thirdBox",
                        ref: `${context.getValue("a")}`,
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
        context.createNode("view", null, function (context) {
          return ["111"];
        }),
        context.createNode("view", null, function (context) {
          return ["222"];
        }),
      ];
    },
    css: '.box {\n  color: "blue"\n}',
  },
  {
    path: "./page/user/index",
    js: function handleJS(Page, App, Component, getCurrentPages, hp) {},
    render: function (context) {
      return [
        context.createNode("view", null, function (context) {
          return ["test"];
        }),
      ];
    },
    css: "\n",
  },
];
function handleJS(Page, App, Component, getCurrentPages, hp) {
  App({
    onLaunch: () => {
      console.log("项目启动");
    },
    data: {
      a: 1,
      b: 2,
    },
  }); // 暂时不能加分号，想想该咋办
}
handleJS(null, App.bind(null, pages));
