export const up = (knex) => (
  knex.schema.table('tasks', (table) => {
    table.integer('labelId');
  })
);

export const down = (knex) => (
  knex.schema.table('tasks', (table) => {
    table.dropColumn('labelId');
  })
);
