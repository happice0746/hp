// Native 层--Server
// serverSend是发渲染层的
import Websocket, { WebSocketServer } from "ws";
// let serverSend: any = function (params: any) {};
// let WSaccept = function (message: string) {};
export const socketChannelDriver = () => {
  return new Promise((resolve) => {
    const wss = new WebSocketServer({ port: 3000 });
    wss.on("connection", (ws: Websocket) => {
      global.serverSend = function (params: { [key: string]: string }) {
        ws.send(JSON.stringify(params));
      };
      ws.on("message", (message) => {
        setImmediate(() => {
          global.serverAccept && global.serverAccept(message.toString());
        });
      });
      console.log("socket 已经链接");
      setTimeout(() => {
        global.serverSend({ msg: "hello, world" });
      }, 3000);
    });
    resolve(null);
  });
};
