// @ts-check

export default (app) => {
  app
    .get('/session/new', { name: 'newSession' }, (req, reply) => {
      reply.code(404).type('text/html').send('Not Found');
    });
};
