import { WebSocket } from "ws";

export type Platform = {
  accept: (massage: string) => void;
  send: (params: { [key: string]: string }) => void;
};
declare global {
  interface Window {
    hp: WebSocket;
  }
}
