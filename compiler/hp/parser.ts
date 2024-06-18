import { ASTNode, Token } from './type';
export const parser = (tokens:Token[]) => {
    let current:number = 0;
    const ast:ASTNode = {
        tagName: 'Body',
        body:[]
    }
    const nodeStack:ASTNode[] = [];
    const parseTag = (token:Token) => {
        if (token.tagName && token.tagName[0] === '/') {
            let children:Array<ASTNode | string> = []; 
            while(nodeStack[nodeStack.length-1]?.tagName !== token.tagName.slice(1)) {
                const childNode = nodeStack.pop() as ASTNode;
                if (childNode.content) {
                    children.push(childNode.content);
                } else {
                    children?.push({
                        tagName: childNode.tagName as string,
                        attrs: childNode.attrs,
                        children: childNode.children
                    })
                }
            }
            const startTag:ASTNode = nodeStack.pop() as ASTNode;
            startTag.children = children;
            nodeStack.push(startTag);
        } else {
            if (token.content) {
                nodeStack.push({
                    content:token.content
                })
            } else {
                nodeStack.push({
                    tagName:token.tagName as string,
                    attrs:token.attrs
                });
            }

        }
    }
    while(current < tokens.length) {
        parseTag(tokens[current]);
        current++
    }
    ast.body = nodeStack;
    return ast;
}