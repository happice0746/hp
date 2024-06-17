import { AppInstance } from "./app";
import { Page } from "./page";
import { handleUrlAndParams } from "./utils";

export class HNavigator {
  private MAX_PAGE_LIMIT: number = 10;
  pageStack: Page[] = [];
  appInstance: AppInstance;
  constructor(appInstance: AppInstance) {
    this.appInstance = appInstance;
    this.getPageStack = this.getPageStack.bind(this);
    this.getCurPage = this.getCurPage.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
  }
  getPageStack(): Page[] {
    return this.pageStack;
  }
  getCurPage(): Page {
    return this.pageStack[this.pageStack.length - 1];
  }
  navigateBack(): void {
    if (this.pageStack.length === 0) {
      throw new Error("PageStack Empty Error");
    }
    this.pageStack.pop();
    this.getCurPage() && this.getCurPage().active();
  }
  redirectPage(url: string): void {
    const [originalUrl, params] = handleUrlAndParams(url);
    const newPage = this.appInstance.createPage(originalUrl as string);
    this.pageStack.pop();
    this.pageStack.push(newPage);
    newPage.launch();
  }
  navigateTo(url: string) {
    if (this.pageStack.length === this.MAX_PAGE_LIMIT) {
      throw new Error("PageStack Overflow Error");
    }
    const [originalUrl, params] = handleUrlAndParams(url);
    const newPage = this.appInstance.createPage(originalUrl as string);
    if (!newPage) return;
    this.getCurPage() && this.getCurPage().inactive();
    this.pageStack.push(newPage);
    this.appInstance.openPage(newPage.pageId);
    newPage.launch();
  }
  getPageInstanceById(pageId: string) {
    return this.pageStack.find((page) => {
      return page.pageId === pageId;
    });
  }
}
