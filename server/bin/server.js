#!/usr/bin/env node

import app from '../index.js';

const port = 8080;
const address = '127.0.0.1';

app.listen(port, address, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
