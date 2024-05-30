export type ASTNode = {
    tagName?:string,
    attrs?:Attribute[],
    children?:Array<string|ASTNode>,
    content?:string,
    body?:ASTNode[],
}
export type Attribute = {
    className?:string,
    id?:string,
}
export type Token = {
    tagName?:string,
    attrs?:Attribute[],
    content?:string,
}