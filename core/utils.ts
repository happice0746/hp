export const handleUrlAndParams = (url: string) => {
  // /url/abc/query?a=11&b=12
  const [originalUrl, paramsString] = url.split("?");
  const params: { [key: string]: string } = {};
  paramsString.split("&").forEach((item) => {
    const [key, value] = item.split("=");
    params[key] = value;
  });
  return [originalUrl, params];
};
