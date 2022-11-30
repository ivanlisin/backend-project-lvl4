#! /usr/bin/env node

import knex from 'knex';

import * as knexConfig from '../../knexfile.js';

const mode = process.env.NODE_ENV || 'development';
const dbClient = knex(knexConfig[mode]);

// eslint-disable-next-line camelcase
const buildLine = (user) => `${user.id} ${user.first_name} ${user.last_name} ${user.email}`;

(async () => {
  try {
    const users = await dbClient('users');
    const stat = `Всего записей: ${users.length}`;
    const lines = users.map((user) => buildLine(user));
    const message = [stat, ...lines].join('\n');
    console.log(message);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  process.exit(0);
})();
