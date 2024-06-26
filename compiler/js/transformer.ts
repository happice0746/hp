import { CodeContext } from "../context";
export const JSTransformer = (code: string): string => {
  const context = new CodeContext();
  context.pushCode("function handleJS(Page, App, Component, getCurrentPages, hp) {");
  context.indent();
  context.pushCode(code);
  context.pushCode("}");
  return context.getCode();
};
