import { Token } from "../types";

export const tokenizer = (code: string) => {
  let current: number = 0;
  const tokens: any = [];
  while (current < code.length) {
    if (code[current] === "<") {
      current++;
      const token: Token = {
        tagName: "",
      };
      let tagName: string = "";
      const attrs: any = {};
      while (code[current] !== ">" && code[current] !== " ") {
        tagName += code[current];
        current++;
      }
      if (code[current] === " ") {
        let attrName: string = "";
        let value: string = "";
        let flag: boolean = true;
        let isVar: boolean = false;
        while (code[current] !== ">") {
          current++;
          if (code[current] === "=" && !isVar) {
            flag = false;
            continue;
          }
          if (code[current] === "{") {
            if (code[++current] === "{") {
              isVar = true;
            }
            current--;
          }
          if (code[current] === " " || code[current] === ">") {
            attrs[attrName] = value;
            attrName = "";
            value = "";
            flag = true;
            isVar = false;
            continue;
          }
          attrName += flag ? code[current] : "";
          value += !flag ? code[current] : "";
        }
      }
      if (Object.keys(attrs).length > 0) {
        token.attrs = attrs;
      }
      token.tagName = tagName;
      tokens.push(token);
    } else if (code[current] !== ">" && code[current] !== " " && code[current] !== "\n") {
      let value = code[current];
      current++;
      while (code[current] !== "<" && code[current] !== ">" && code[current] !== " " && code[current] !== "\n") {
        value += code[current];
        current++;
      }
      const token: Token = {
        content: value,
      };
      tokens.push(token);
    } else {
      current++;
    }
  }
  return tokens;
};
