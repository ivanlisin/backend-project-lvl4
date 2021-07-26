// @ts-check

import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';

import addRoutes from './routes/index.js';

const setUpViews = (app) => {
  app.register(pointOfView, {
    engine: {
      pug,
    },
  });

  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

export default () => {
  const app = fastify({
    logger: true,
  });

  setUpViews(app);
  addRoutes(app);

  return app;
};
