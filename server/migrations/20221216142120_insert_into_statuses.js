// @ts-check

export const up = (knex) => (
  knex('statuses').insert([
    { name: 'Новый' },
    { name: 'В работе' },
    { name: 'На тестировании' },
    { name: 'Завершен' },
  ])
);

// TODO: разобраться с этим
export const down = (_knex) => {};