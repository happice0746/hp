import { AppInstance } from "./app";
import { Renderer } from "./render";
import { PageConfig } from "./types";
const ID_PREFIX: string = "hp_";
let id: number = 0;
function PageRefInstance(config: PageConfig) {
  const pageController = this;
  class PageElement {
    data: { [key: string]: any };
    constructor() {
      for (let key in config) {
        if (config.hasOwnProperty(key)) this[key] = config[key];
      }
    }
    getPageId() {
      return pageController.pageId;
    }
    setData(mergeData) {
      Object.assign(this.data, mergeData);
      pageController.renderer.render();
    }
  }
  pageController.pageRef = new PageElement();
}
export class Page {
  pageId: string;
  appInstance: AppInstance;
  pageConfig: PageConfig;
  css: string;
  pagePath: string;
  renderer: Renderer;
  pageRef: any;
  constructor(appInstance: AppInstance, pageConfig: PageConfig) {
    this.pageId = `${ID_PREFIX}${id++}`;
    this.appInstance = appInstance;
    this.pageConfig = pageConfig;
    const { path, render, js, css } = this.pageConfig;
    this.pagePath = path;
    this.css = css;
    this.renderer = new Renderer(render, this);
    this.pageRef = new PageRefInstance(pageConfig);
    js(PageRefInstance.bind(this), null, null, null, global.hp);
  }
  launch() {
    this.appInstance.pageReady && this.appInstance.pageReady();
    this.appInstance.styleSheet(this.pageId, this.css);
    this.renderer.render();
  }
  active() {}
  inactive() {}
  getPageId() {
    return this.pageId;
  }
  render(commandList) {
    this.appInstance.render(this.pageId, commandList);
  }
}
