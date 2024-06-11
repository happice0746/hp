import { WebSocket } from "ws";
export const devtoolClientServer = () => {
  if (window.hp) return;
  window.hp = new WebSocket("ws://127.0.0.1:3000");
  hp.onopen = function () {
    const payload = {
      eventName: "connect",
      data: null,
    };
    // 以下通信章节讲到
    window.JSBridge.postMessage(payload);
  };
  wx.onmessage = function (message) {
    console.log(message);
    // 以下通信章节讲到
    window._handleNativeEvent && window._handleNativeEvent(message.data);
  };
};
