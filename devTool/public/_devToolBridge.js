// WebView层--Client
// 做一点解释，这里是可以直接和Server通信等，但是我们偏不
// 因为我们的Client和Server要用桥来通信，从而来模拟出WebView和Native之间的通信
// 此时hp就是Client负责收发消息
// Client在收到Native的消息后会通过handleNativeEvent函数来解析
// 我在html里register一下这个事件，在设置好回调函数
// 当Native想触发这个事件后，Server给Client发送信息，用对应的事件名触发
export const devtoolClientServer = () => {
  if (window.hp) return;
  window.hp = new WebSocket("ws://127.0.0.1:3000");
  const hp = window.hp;
  hp.onopen = function () {
    const payload = {
      eventName: "connect",
      data: null,
    };
    window.JSBridge.postNativeMessage(payload);
  };
  hp.onmessage = function (message) {
    window._handleNativeEvent && window._handleNativeEvent(message.data);
  };
};
