import { HpTransformer } from "./hp/transformer";
import { ASTNode } from "./type";

export const generator = (ast: ASTNode): string => {
  return `${HpTransformer(ast)}`;
};
