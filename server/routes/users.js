// @ts-check

export default (app) => {
  app
    .get('/users', { name: 'users' }, (req, reply) => {
      reply.notFound('The page is under construction');
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      reply.notFound('The page is under construction');
    });
};
