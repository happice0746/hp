import express from "express";
import { socketChannelDriver } from "./socket-driver";
const AppInit = (port: number) => {
  return new Promise(() => {
    const app = express();
    app.use(express.static("pubilc"));
    app.listen(port, async () => {
      console.log(`http://127.0.0.1:${port}`);
      await socketChannelDriver();
    });
  });
};
AppInit(80);
