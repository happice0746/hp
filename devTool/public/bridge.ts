import { Data } from "../types";
// function postNativeMessage(message: string) {}
import { postNativeMessage } from "./_devToolBridge";
function invokeNativeEvent(name: string, payload: any, callbackId: number) {
  const message = {
    eventType: "invoke",
    type: name,
    data: payload,
    callbackId,
  };
  postNativeMessage(message);
}
export class JSBridge {
  private eventMap = new Map();
  private responseCallbackMap = new Map();
  callbackId = 0;
  constructor() {
    // 通过bind，无论这些函数在哪里被调用，this 都会指向绑定时的上下文（即JSBridge类）
    window._handleNativeEvent = this.handleNativeEvent.bind(this);
    window._handleNativeCallback = this.handleNativeCallback.bind(this);
  }
  postMessage() {}
  invoke(name: string, payload: any, callback: (params: any) => any) {
    this.responseCallbackMap.set(this.callbackId, callback);
    invokeNativeEvent(name, payload, this.callbackId++);
  }
  registerEvent(name: string, callback: (params: any) => any) {
    this.eventMap.set(name, callback);
  }
  unregisterEvent(name: string) {
    this.eventMap.delete(name);
  }
  handleNativeEvent(jsonRes: Data) {
    const res = JSON.parse(jsonRes as string);
    console.log(res);
    const { eventName, ...params } = res;
    const callback = this.eventMap.get(eventName);
    callback && callback(params);
  }
  handleNativeCallback(jsonRes: Data) {
    const res = JSON.parse(jsonRes as string);
    const { callbackID, ...params } = res;
    const callback = this.responseCallbackMap.get(callbackID);
    callback && callback(params);
    this.responseCallbackMap.delete(callbackID);
  }
}
