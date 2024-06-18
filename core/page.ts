import { AppInstance } from "./app";
import { Renderer } from "./render";
import { PageConfig } from "./types";
const ID_PREFIX: string = "hp_";
let id: number = 0;
export class Page {
  pageId: string;
  appInstance: AppInstance;
  pageConfig: PageConfig;
  css;
  pagePath: string;
  renderer;
  constructor(appInstance: AppInstance, pageConfig: PageConfig) {
    this.pageId = `${ID_PREFIX}${id++}`;
    this.appInstance = appInstance;
    this.pageConfig = pageConfig;
    const { path, render, js, css } = this.pageConfig;
    this.pagePath = path;
    this.css = css;
    this.renderer = new Renderer(render, this);
    js();
  }
  launch() {}
  active() {}
  inactive() {}
  getPageId() {
    return this.pageId;
  }
  render() {}
}
