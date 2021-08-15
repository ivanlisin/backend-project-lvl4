#!/usr/bin/env node

import getApp from '../index.js';

const port = 5000;

const app = getApp();
app.listen(port, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
