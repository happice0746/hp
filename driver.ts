import { AppInit } from "./devTool/init";

const start = async () => {
  await AppInit(30);
  import("./page-service");
};

start();
