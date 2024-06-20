import { AppInstance } from "./app";

export function App(pagesConfig, appConfig) {
  const app = new AppInstance(pagesConfig, appConfig);
  global.app = app;
}
