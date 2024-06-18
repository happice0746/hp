import Websocket, { WebSocketServer } from "ws";
let WSsend = function (params: { [key: string]: string }) {};
let WSaccept = function (message: string) {};
export const socketChannelDriver = () => {
  return new Promise((resolve) => {
    const wss = new WebSocketServer({ port: 3000 });
    wss.on("connection", (ws: Websocket) => {
      ws.on("message", (message) => {
        setImmediate(() => {
          console.log(message.toString());
          //   global.platform.accept && global.platform.accept(message.toString());
        });
      });
      WSsend = function (params: { [key: string]: string }) {
        ws.send(JSON.stringify(params));
      };
      WSaccept = function (message: string) {};
      console.log("socket 已经链接");
      setTimeout(() => {
        // global.platform.send({ msg: "hello,world" });
        console.log("send");
        ws.send(JSON.stringify({ msg: "hello, world" }));
      }, 3000);
    });
  });
};
export { WSaccept, WSsend };
