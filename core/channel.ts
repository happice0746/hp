import { AppIntance } from "./app";

export class Channel {
  appInstance: AppIntance;
  constructor(appInstance: AppIntance) {
    this.appInstance = appInstance;
    global.platform.accpet = this.acceptClientMessage.bind(this);
  }
  postClientMessage(pageId: number, eventName: string, direct: string) {
    const payload = {
      pageId,
      eventName,
      data: direct,
    };
    global.platform.send && global.platform.send(payload);
  }
  acceptClientMessage(payload: any) {
    const { type, ...params } = payload;
    this.appInstance.handleMessage(type, params);
  }
}
