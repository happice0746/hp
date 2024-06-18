import path from "path";

const BASE_PATH = process.cwd();
export const TransformerConfig = {
  READ_PATH: path.join(BASE_PATH, "src"),
  WRITE_PATH: path.join(BASE_PATH, "page-service.js"),
  JS_SUFFIX: ".js",
  XML_SUFFIX: ".hp",
  CSS_SUFFIX: ".hpss",
};
