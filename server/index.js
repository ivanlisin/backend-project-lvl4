import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';

const app = fastify({
  logger: true,
});

app.register(pointOfView, {
  engine: {
    pug,
  },
});

app.get('/', (request, reply) => {
  reply.view('./server/views/index.pug', { text: 'text' });
});

export default app;
