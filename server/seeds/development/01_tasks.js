// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex) => {
  // TODO: fix delete
  await knex('tasks').delete();
  await knex('tasks').insert([
    {
      name: 'Рефакторинг',
      description: 'Отрефакторить код в файле ./index.js',
      status_id: 1,
      creator_id: 1,
      executor_id: 2,
    },
    {
      name: 'Написать авторизацию',
      status_id: 3,
      creator_id: 3,
    },
  ]);
};
