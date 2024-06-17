import { AppInstance } from "./app";

export class Channel {
  appInstance: AppInstance;
  constructor(appInstance: AppInstance) {
    this.appInstance = appInstance;
    global.platform.accept = this.acceptClientMessage.bind(this);
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
