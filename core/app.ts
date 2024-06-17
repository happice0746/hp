import { Page } from "./page";

export class AppInstance {
  createPage(url: string): Page {}
  handleMessage(type: string, params: any) {}
  openPage(pageId: string) {}
}
