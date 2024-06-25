import { ASTNode } from "../types";
import { CodeContext } from "../context";
export const HpTransformer = (ast: ASTNode): string => {
  const context = new CodeContext();
  const body: ASTNode[] = ast.body as ASTNode[];
  transformChildrenFunction(body, context);
  return context.getCode();
};
const transformChildrenFunction = (nodes: (ASTNode | string)[], context: CodeContext) => {
  context.pushCode(`function (context) {`);
  context.indent();
  context.pushCode(`return [`);
  context.indent();
  for (let i: number = 0; i < nodes.length; i++) {
    const curNode: ASTNode | string = nodes[i];
    const nextNode: ASTNode | string = nodes[i + 1];
    transformChildrenNode(curNode, context);
    if (nextNode) {
      context.pushCode(",");
      context.newLine();
    }
  }
  context.deindent();
  context.pushCode(`];`);
  context.deindent();
  context.pushCode(`}`);
};
const transformChildrenNode = (node: ASTNode | string, context: CodeContext) => {
  if (typeof node === "string") {
    context.pushCode(`'${node}'`);
    return;
  }
  context.pushCode(`context.createNode("${node.tagName}", `);
  transformAttrs(node, context);
  if (node.children && node.children.length > 0) {
    context.pushCode(",");
    context.newLine();
    transformChildrenFunction(node.children, context);
  }
  context.pushCode(")");
};
const transformAttrs = (node: ASTNode, context: CodeContext) => {
  if (!node.attrs) {
    context.pushCode("null");
    return;
  }
  const attrs = node.attrs;
  context.pushCode("{");
  context.indent();
  Object.keys(node.attrs).forEach((key, index) => {
    const value = attrs[key];
    let varValue: string = "";
    let eventKey: string = "";
    if (/\{\{.*?\}\}/.test(value)) {
      const result = value.match(/\{\{.*?\}\}/) as string[];
      varValue = "`${context.getValue('" + result[0].slice(2, -2).trim() + "')}`";
    }
    if (key.includes("bind:")) {
      eventKey = key.replace("bind:", "event");
    }
    context.pushCode(`${eventKey !== "" ? eventKey : key}: ${varValue !== "" ? varValue : value}`);
    if (index < Object.keys(attrs).length - 1) {
      context.pushCode(`,`);
      context.newLine();
    }
  });
  context.deindent();
  context.pushCode("}");
};
