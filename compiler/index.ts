import fs from 'node:fs'
import { tokenizer } from './tokenizer';
import { parser } from './parser';
export const compiler = (input:string) => {
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    console.dir(ast, {depth:null});
}
const file = fs.readFileSync('src/index.hp',{encoding:'utf-8'});
compiler(file);
