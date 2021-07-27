// @ts-check

export default (app) => {
  app
    .get('/users', { name: 'users' }, (req, reply) => {
      reply.code(404).type('text/html').send('Not Found');
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      reply.code(404).type('text/html').send('Not Found');
    });
};
