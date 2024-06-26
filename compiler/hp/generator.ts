import { HpTransformer } from "./transformer";
import { ASTNode } from "../types";

export const generator = (ast: ASTNode): string => {
  return `${HpTransformer(ast)}`;
};
