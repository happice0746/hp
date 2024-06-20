var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
    return t;
  };
function invokeNativeEvent(name, payload, callbackId) {
  const message = {
    eventType: "invoke",
    type: name,
    data: payload,
    callbackId,
  };
  window.JSBridge.postNativeMessage(message);
}
export class JSBridge {
  constructor() {
    this.eventMap = new Map();
    this.responseCallbackMap = new Map();
    this.callbackId = 0;
    // 通过bind，无论这些函数在哪里被调用，this 都会指向绑定时的上下文（即JSBridge类）
    window._handleNativeEvent = this.handleNativeEvent.bind(this);
    window._handleNativeCallback = this.handleNativeCallback.bind(this);
  }
  postNativeMessage(payload) {
    window.hp.send(JSON.stringify(payload));
  }
  invoke(name, payload, callback) {
    this.responseCallbackMap.set(this.callbackId, callback);
    invokeNativeEvent(name, payload, this.callbackId++);
  }
  registerEvent(name, callback) {
    this.eventMap.set(name, callback);
  }
  unregisterEvent(name) {
    this.eventMap.delete(name);
  }
  handleNativeEvent(jsonRes) {
    const res = JSON.parse(jsonRes);
    // console.log(res);
    const { eventName } = res,
      params = __rest(res, ["eventName"]);
    const callback = this.eventMap.get(eventName);
    callback && callback(params);
  }
  handleNativeCallback(jsonRes) {
    const res = JSON.parse(jsonRes);
    const { callbackID } = res,
      params = __rest(res, ["callbackID"]);
    const callback = this.responseCallbackMap.get(callbackID);
    callback && callback(params);
    this.responseCallbackMap.delete(callbackID);
  }
}
