import { CodeContext } from "../context";

// .box {background:"pink"}
export const HpssTransformer = (code: string) => {
  const context = new CodeContext();
  context.pushCode("function handleHpss() {");
  context.indent();
  context.pushCode(code);
  context.pushCode("}");
  return context.getCode();
};
