import { AppInstance } from "./app";
import { Command } from "./types";
import { WSsend } from "../devTool/socket-driver";
export class Channel {
  appInstance: AppInstance;
  constructor(appInstance: AppInstance) {
    this.appInstance = appInstance;
    global.platform.accept = this.acceptClientMessage.bind(this);
  }
  postClientMessage(pageId: string, eventName: string, command: string | Command | Command[]) {
    const payload = {
      pageId,
      eventName,
      data: command,
    };
    WSsend && WSsend(payload);
  }
  acceptClientMessage(payload: any) {
    const { type, ...params } = payload;
    this.appInstance.handleMessage(type, params);
  }
}
