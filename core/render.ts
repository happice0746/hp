import { Page } from "./page";
import { VNode } from "./types";
export class Renderer {
  pageInstance: Page;
  render: string;
  vnode: VNode | null = null;
  nodeId = -1;
  commandList;
  constructor(render, pageInstance) {
    this.pageInstance = pageInstance;
    this.render = render;
  }
  createNode(type: string, props: any[], children: string[] | ((params: any) => any)) {
    return {
      type,
      props,
      children: typeof children === "function" ? children(this.createRenderContext()) : [],
    };
  }
  createRenderContext() {}
}
