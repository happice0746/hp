import { deepEqual } from "./utils";
import { Page } from "./page";
import { Command, RENDER_COMMAND, VNode } from "./types";
export class Renderer {
  pageInstance: Page;
  renderRuntime: (context: any) => any;
  vnode: VNode | null = null;
  nodeId: number = 0;
  commandList: Command[] = [];
  constructor(render, pageInstance) {
    this.pageInstance = pageInstance;
    this.renderRuntime = render;
  }
  render() {
    const context = this.createRenderContext();
    const childrenArr = this.renderRuntime(context);
    const newVnode = this.createNode("page", [], childrenArr);
    this.vnode = this.diff(newVnode, this.vnode, "root");
    // console.dir(this.vnode, { depth: null });
    this.commit();
  }
  createNode(type: string, props: { [key: string]: any }, children: VNode[] | ((params: any) => any)) {
    return {
      type,
      props,
      children: typeof children === "function" ? children(this.createRenderContext()) : children,
    };
  }
  createRenderContext() {
    return {
      createNode: this.createNode.bind(this),
      getValue: this.getValue.bind(this),
    };
  }
  getValue(key: string) {
    return this.pageInstance.pageRef.data ? this.pageInstance.pageRef.data[key] : undefined;
  }
  diff(newVnode: VNode | null, oldVnode: VNode | null, parentId: string | number) {
    if (newVnode && !oldVnode) {
      newVnode.parentId = parentId;
      newVnode.nodeId = this.nodeId++;
      let content = "";
      if (newVnode.children.length === 1 && typeof newVnode.children[0] === "string") {
        content = newVnode.children[0];
      } else {
        this.diffChildren(newVnode, oldVnode, newVnode.nodeId);
      }
      this.commandList.push({
        type: RENDER_COMMAND.CREATE,
        tag: newVnode.type as string,
        parentId: newVnode?.parentId,
        nodeId: newVnode?.nodeId,
        content,
        props: newVnode.props,
      });
    } else if (!newVnode && oldVnode) {
      this.commandList.push({
        type: RENDER_COMMAND.DELETE,
        tag: oldVnode.type,
        parentId,
        nodeId: oldVnode.nodeId as number,
      });
    } else if (newVnode && oldVnode) {
      newVnode.parentId = oldVnode.parentId;
      newVnode.nodeId = oldVnode.nodeId;
      const newChildren = newVnode.children;
      const oldChildren = oldVnode.children;
      const onlyContentCase = newChildren.length === 1 && oldChildren.length === 1 && typeof newChildren[0] == "string" && typeof oldChildren[0] == "string";
      const contentNotEqualCase = onlyContentCase && oldChildren[0] !== newChildren[0];
      const propsNotEqualCase = deepEqual(newVnode.props, oldVnode.props);
      if (contentNotEqualCase || !propsNotEqualCase) {
        this.commandList.push({
          type: RENDER_COMMAND.UPDATE,
          tag: newVnode.type,
          parentId,
          nodeId: oldVnode.nodeId as number,
          content: contentNotEqualCase ? (newVnode.children[0] as string) : "",
          props: newVnode.props,
        });
      }
      if (!propsNotEqualCase) {
        this.diffChildren(newVnode, oldVnode, newVnode.nodeId as number);
      }
    }
    return newVnode;
  }
  diffChildren(newVnode: VNode | null, oldVnode: VNode | null, parentId: number) {
    const newVnodeChildren = newVnode?.children as VNode[];
    const oldVnodeChildren = oldVnode?.children as VNode[];
    newVnodeChildren?.forEach((newChildNode, index) => {
      const oldChildNode = oldVnodeChildren ? oldVnodeChildren[index] : null;
      this.diff(newChildNode, oldChildNode, parentId);
    });
  }
  commit() {
    this.pageInstance.render(this.commandList);
  }
}
