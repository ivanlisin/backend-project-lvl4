import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';

const setUpViews = (app) => {
  app.register(pointOfView, {
    engine: {
      pug,
    },
  });
};

export default () => {
  const app = fastify({
    logger: true,
  });

  setUpViews(app);

  app.get('/', (request, reply) => {
    reply.view('./server/views/index.pug', { text: 'text' });
  });

  return app;
};
