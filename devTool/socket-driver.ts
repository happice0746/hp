import Websocket from "ws";
export const socketChannelDriver = () => {
  return new Promise((resolve) => {
    const wss = new Websocket.Server({ port: 3000 });
    wss.on("connection", (ws: Websocket) => {
      ws.on("message", (message) => {
        setImmediate(() => {
          console.log(message.toString());
          //   global.platform.accept && global.platform.accept(message.toString());
        });
      });
      //   global.platform = {
      //     accept: function (massage: string) {},
      //     send: function (params: { [key: string]: string }) {
      //       ws.send(JSON.stringify(params));
      //     },
      //   } as Platform;
      console.log("socket 已经链接");
      setTimeout(() => {
        // global.platform.send({ msg: "hello,world" });
        ws.send(JSON.stringify({ msg: "hello, world" }));
      }, 3000);
    });
  });
};
