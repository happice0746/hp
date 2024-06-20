import express from "express";
import { socketChannelDriver } from "./socket-driver";
import { exec } from "child_process";
import path from "path";
export const AppInit = (port: number) => {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.static(path.join(path.resolve(), "devTool", "public")));
    app.listen(port, async () => {
      const url = `http://127.0.0.1:${port}`;
      console.log(`Server running in ${url}`);
      exec(`open ${url}`);
      await socketChannelDriver();
      resolve(null);
    });
  });
};
