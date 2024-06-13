import express from "express";
import { socketChannelDriver } from "./socket-driver";
import { exec } from "child_process";
const AppInit = (port: number) => {
  return new Promise(() => {
    const app = express();
    app.use(express.static("./public"));
    app.listen(port, async () => {
      const url = `http://127.0.0.1:${port}`;
      console.log(`Server running in ${url}`);
      exec(`open ${url}`);
      await socketChannelDriver();
    });
  });
};
AppInit(80);
