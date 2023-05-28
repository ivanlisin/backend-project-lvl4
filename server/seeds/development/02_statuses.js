// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex) => {
  await knex('statuses').delete();
  await knex('statuses').insert([
    { id: 1, name: 'Новый' },
    { id: 2, name: 'В работе' },
    { id: 3, name: 'На тестировании' },
    { id: 4, name: 'Завершен' },
  ]);
};
