import fs from 'node:fs'
import { tokenizer } from './tokenizer';
import { parser } from './parser';
import { generator } from './generator';
export const compiler = (input:string):string => {
    const tokens = tokenizer(input);
    const ast = parser(tokens);
    // console.dir(ast, {depth:null});
    const code = generator(ast);
    return code;
}
const file = fs.readFileSync('src/index.hp',{encoding:'utf-8'});
fs.mkdir('dist',()=> {
    fs.writeFile('dist/bundle.js', compiler(file), (error)=>{
        if(error) {
            console.log('failed build. ERROR: ' + error);
        }
    })
})

