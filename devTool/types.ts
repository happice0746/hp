import { WebSocket } from "ws";

export type Platform = {
  accept: (massage: string) => void;
  send: (params: { [key: string]: string }) => void;
};
declare global {
  interface Window {
    hp: WebSocket;
    JSBridge: Bridge;
    _handleNativeEvent: (data: Data) => void;
  }
}

export type Bridge = {
  registerEvent: (evnet: string, Callback: (params: any) => any) => void;
  postMessage: (data: { [key: string]: string | number | null | undefined | boolean }) => void;
};

export type Data = string | Buffer | ArrayBuffer | Buffer[];
