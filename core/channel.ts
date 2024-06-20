import { AppInstance } from "./app";
import { Command } from "./types";
export class Channel {
  appInstance: AppInstance;
  constructor(appInstance: AppInstance) {
    this.appInstance = appInstance;
    // global.platform.accept = this.acceptClientMessage.bind(this);
  }
  postClientMessage(pageId: string, eventName: string, command: string | Command | Command[]) {
    const payload = {
      pageId,
      eventName,
      data: command,
    };
    setTimeout(() => {
      global.WSsend && global.WSsend(payload);
    }, 1000);
  }
  acceptClientMessage(payload: any) {
    const { type, ...params } = payload;
    this.appInstance.handleMessage(type, params);
  }
}
