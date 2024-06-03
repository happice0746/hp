import { transformer } from "./transformer";
import { ASTNode } from "./type";

export const generator = (ast:ASTNode):string => {
    return `const code = { 
        render: ${ transformer(ast) }
    }`;
}
