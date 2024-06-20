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
export const deepEqual = (x: any, y: any): boolean => {
  if (x === y) {
    return true;
  } else if (getType(x) === getType(y)) {
    if (getType(x) === "Object") {
      if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
      } else {
        for (const key in x) {
          if (y.hasOwnProperty(key)) {
            if (!deepEqual(x[key], y[key])) {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      }
    } else if (getType(x) === "Array") {
      if (x.length !== y.length) {
        return false;
      }
      for (let i = 0; i < x.length; i++) {
        if (!deepEqual(x[i], y[i])) {
          return false;
        }
      }
      return true;
    } else if (x !== y) {
      return false;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const getType = (item: any): string => {
  return Object.prototype.toString.call(item).slice(8, -1);
};
