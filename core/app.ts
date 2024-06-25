import { AppConfig, Command, PageConfig } from "./types";
import { Channel } from "./channel";
import { HNavigator } from "./navigator";
import { Page } from "./page";

export class AppInstance {
  appConfig: AppConfig;
  pagesConfig: PageConfig[];
  channel: Channel;
  navigator: HNavigator;
  constructor(pagesConfig: PageConfig[], appConfig: AppConfig) {
    this.appConfig = appConfig;
    this.pagesConfig = pagesConfig;
    this.channel = new Channel(this);
    this.navigator = new HNavigator(this);
    process.nextTick(() => {
      this.launch();
    });
  }
  launch() {
    this.appConfig.onLaunch && this.appConfig.onLaunch();
    const firstPage = this.pagesConfig[0];
    this.navigator.navigateTo(firstPage.path + "?init=true");
  }
  pageReady(pageId: string) {
    this.appConfig.onReady && this.appConfig.onReady();
    this.channel.postClientMessage(pageId, "ready", "");
  }
  createPage(pagePath: string): Page {
    const pageConfig = this.pagesConfig.find((page) => page.path === pagePath);
    if (!pageConfig) throw new Error("Except the pageConfig in app");
    return new Page(this, pageConfig);
  }
  handleMessage(type: string, params: any) {}
  openPage(pageId: string) {}
  styleSheet(pageId: string, css: string) {
    this.channel.postClientMessage(pageId, "style", css);
  }
  render(pageId: string, commandList: Command[]) {
    this.channel.postClientMessage(pageId, "render", commandList);
  }
}
