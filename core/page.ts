const ID_PREFIX: string = "hp_";
let id: number = 0;
export class Page {
  pageId: string;
  appInstance;
  constructor(appInstance) {
    this.pageId = `${ID_PREFIX}${id++}`;
    this.appInstance = appInstance;
  }
  launch() {}
  active() {}
  inactive() {}
  getPageId() {
    return this.pageId;
  }
  render() {}
}
