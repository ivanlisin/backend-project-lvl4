// @ts-check

export default (app) => {
  app
    .get('/', (request, reply) => {
      reply.view('./server/views/welcome/index.pug', { text: 'text' });
    });
};
