// @ts-check

export default (app) => {
  app
    .get('/session/new', { name: 'newSession' }, (req, reply) => {
      reply.notFound('The page is under construction');
    });
};
