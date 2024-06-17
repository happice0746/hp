import { AppIntance } from "./app";
import { Page } from "./page";

export class HNavigator {
  private MAXPAGELIMIT: number = 10;
  pageStack: Page[] = [];
  appInstance: AppIntance;
  constructor(appInstance: AppIntance) {
    this.appInstance = appInstance;
    this.getPageStack = this.getPageStack.bind(this);
    this.getCurPage = this.getCurPage.bind(this);
    this.redirctPage = this.redirctPage.bind(this);
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
  redirctPage(url: string): void {
    const newPage = this.appInstance.createPage(url);
    this.pageStack.pop();
    this.pageStack.push(newPage);
    newPage.launch();
  }
  navigateTo(url: string) {
    if (this.pageStack.length === this.MAXPAGELIMIT) {
      throw new Error("PageStack Overflow Error");
    }
    const newPage = this.appInstance.createPage(url);
    if (!newPage) return;
    this.getCurPage() && this.getCurPage().unactive();
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
