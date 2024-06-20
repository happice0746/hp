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
export type VNode = {
  parentId?: string | number;
  type: string;
  props: { [key: string]: string };
  children: Array<VNode | string>;
  nodeId?: number;
};
export enum RENDER_COMMAND {
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}
export type Command = {
  type: RENDER_COMMAND;
  tag: string;
  parentId: string | number;
  content?: string;
  nodeId: number;
  props?: { [key: string]: string };
};
