const NOTION: string = "hp";
let id: number = 0;
export class Page {
  pageId: string;
  appInstance;
  constructor(appInstance) {
    this.pageId = `${NOTION}${id++}`;
    this.appInstance = appInstance;
  }
  launch() {}
  active() {}
  unactive() {}
  getPageId() {
    return this.pageId;
  }
  render() {}
}
