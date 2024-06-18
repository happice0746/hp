import { App } from './core/index.ts'

const pages = [
  {
    path: './page/home/index',
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
              id: "thirdBox",
              ref: `${context.getValue(a)}`
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
},
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
    css: function handleHpss() {
  }
  },
  {
    path: './page/user/index',
    render: function (context) {
  return [
    context.createNode(view, null,
    function (context) {
      return [
        'test'
      ];
    })
  ];
},
    js: function handleJS(Page, App, Component, getCurrentPages, hp) {
  },
    css: function handleHpss() {
  
}
  },
  
]
handleJS(null,App.bind(null,pages))
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