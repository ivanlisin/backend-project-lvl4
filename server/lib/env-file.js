export const parse = (text) => text
  .split('\n')
  .reduce((acc, line) => {
    if (line === '') {
      return acc;
    }
    const [key, v] = line.split('=');
    const value = v.replaceAll('"', '');
    // eslint-disable-next-line no-param-reassign
    acc[key] = value;
    return acc;
  }, {});

export const get = (text, key, emptyValue = null) => {
  const obj = parse(text);
  return key in obj
    ? obj[key]
    : emptyValue;
};

export const stringify = (obj) => Object.entries(obj)
  .map(([key, value]) => `${key}="${value}"`)
  .join('\n');

export const set = (text, key, value) => {
  const obj = parse(text);
  obj[key] = value;
  return stringify(obj);
};
