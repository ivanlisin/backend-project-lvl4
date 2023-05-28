// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex) => {
  await knex('labels').delete();
  await knex('labels').insert([
    { id: 1, name: 'Багрепорт' },
    { id: 2, name: 'Новый функционал' },
    { id: 3, name: 'Менеджмент' },
  ]);
};
