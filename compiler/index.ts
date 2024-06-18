import { HpssTransformer } from "./hpss/transformer";
import { JSTransformer } from "./js/transformer";
import { tokenizer } from "./hp/tokenizer";
import { parser } from "./hp/parser";
import { generator } from "./generator";
import path from "node:path";
import { TransformerConfig as config } from "./config";
import fs from "node:fs";
import { CodeContext } from "./context";
function analysisProject(configPath: string): Promise<string[]> {
  return new Promise((resolve) => {
    fs.readFile(configPath, "utf-8", (err, data) => {
      if (err) {
        throw new Error("Except config file");
      }
      const projectConfig = JSON.parse(data);
      const { pages } = projectConfig;
      resolve(pages);
    });
  });
}
function handleJS(pagePath: string): string {
  const JSPath = path.join(config.READ_PATH, pagePath) + config.JS_SUFFIX;
  const isExist = fs.existsSync(JSPath);
  if (!isExist) return "";
  const code = fs.readFileSync(JSPath, "utf-8");
  return JSTransformer(code);
}

function handleHp(pagePath: string): string {
  const HpPath = path.join(config.READ_PATH, pagePath) + config.XML_SUFFIX;
  const isExist = fs.existsSync(HpPath);
  if (!isExist) return "";
  const code = fs.readFileSync(HpPath, "utf-8");
  const tokens = tokenizer(code);
  const ast = parser(tokens);
  return generator(ast);
}
function handleHpss(pagePath: string): string {
  const HpssPath = path.join(config.READ_PATH, pagePath) + config.CSS_SUFFIX;
  const isExist = fs.existsSync(HpssPath);
  if (!isExist) return "";
  const code = fs.readFileSync(HpssPath, "utf-8");
  return HpssTransformer(code);
}
function analysisPage(pagePath: string, context: CodeContext): void {
  context.pushCode("{");
  context.indent();
  context.pushCode(`path: '${pagePath}',`);
  context.newLine();
  context.pushCode(`render: ${handleHp(pagePath)},`);
  context.newLine();
  context.pushCode(`js: ${handleJS(pagePath)},`);
  context.newLine();
  context.pushCode(`css: ${handleHpss(pagePath)}`);
  context.deindent();
  context.pushCode("},");
  context.newLine();
}
function handleAppJS(): string {
  const code = fs.readFileSync(path.join(config.READ_PATH, "app.js"), "utf-8");
  return JSTransformer(code);
}
analysisProject(path.join(config.READ_PATH, "app.json")).then((pagePaths: string[]) => {
  const context = new CodeContext();
  context.pushCode(`import { App } from './core/index.ts'`);
  context.newLine();
  context.newLine();
  context.pushCode("const pages = [");
  context.indent();
  pagePaths.forEach((pagePath) => {
    analysisPage(pagePath, context);
  });
  context.deindent();
  context.pushCode("]");
  context.newLine();
  context.pushCode(`handleJS(null,App.bind(null,pages))`);
  context.newLine();
  context.pushCode(handleAppJS());
  fs.writeFileSync(config.WRITE_PATH, context.getCode());
});
