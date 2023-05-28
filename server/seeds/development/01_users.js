import secure from '../../lib/secure.cjs';

// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex) => {
  await knex('users').delete();
  await knex('users').insert([
    {
      id: 1,
      first_name: 'Иван',
      last_name: 'Петров',
      email: 'ivanpetroff@mail.com',
      password_digest: secure('SupeRStonGHPaROll'),
    },
    {
      id: 2,
      first_name: 'Джон',
      last_name: 'Сноу',
      email: 'johnsnow@mail.com',
      password_digest: secure('WinterIScomminG'),
    },
    {
      id: 3,
      first_name: 'Голлум',
      last_name: 'Голлум',
      email: '2gollum@mail.com',
      password_digest: secure('MyPREeeeCIOUS'),
    },
  ]);
};
