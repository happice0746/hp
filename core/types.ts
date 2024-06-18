export type PageConfig = {
  [key: string]: any;
};
export type AppConfig = {
  data: {
    [key: string]: any;
  };
  onLaunch: () => void;
  onReady: () => void;
};
export type VNode = {};
export enum RENDER_COMMAND {
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}
