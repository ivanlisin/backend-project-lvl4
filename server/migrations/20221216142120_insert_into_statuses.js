// @ts-check

export const up = (knex) => (
  knex('statuses').insert([
    { name: 'Новый' },
    { name: 'В работе' },
    { name: 'На тестировании' },
    { name: 'Завершен' },
  ])
);

export const down = (knex) => knex.schema.dropTable('statuses');
