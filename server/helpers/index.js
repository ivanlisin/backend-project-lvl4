// @ts-check

import i18next from 'i18next';

export default (app) => ({
  route(name) {
    return app.reverse(name);
  },
  t(key) {
    return i18next.t(key);
  },
  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  },
});
