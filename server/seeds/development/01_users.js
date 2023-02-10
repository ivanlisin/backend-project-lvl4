import secure from '../../lib/secure.cjs';

// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex) => {
  // TODO: fix delete
  await knex('users').delete();
  await knex('users').insert([
    {
      first_name: 'Иван',
      last_name: 'Петров',
      email: 'ivanpetroff@mail.com',
      password_digest: secure('SupeRStonGHPaROll'),
    },
    {
      first_name: 'Джон',
      last_name: 'Сноу',
      email: 'johnsnow@mail.com',
      password_digest: secure('WinterIScomminG'),
    },
    {
      first_name: 'Голлум',
      last_name: 'Голлум',
      email: '2gollum@mail.com',
      password_digest: secure('MyPREeeeCIOUS'),
    },
  ]);
};
