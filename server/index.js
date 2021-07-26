// @ts-check

import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';
import path from 'path';
import fastifyStatic from 'fastify-static';

import addRoutes from './routes/index.js';
// @ts-ignore
import webpackConfig from '../webpack.config.babel.js';

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

const setUpViews = (app) => {
  const { devServer } = webpackConfig;
  const devHost = `http://${devServer.host}:${devServer.port}`;
  const domain = isDevelopment ? devHost : '';
  app.register(pointOfView, {
    engine: {
      pug,
    },
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
    templates: path.join(__dirname, '..', 'server', 'views'),
  });

  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const setUpStaticAssets = (app) => {
  const pathPublic = isProduction
    ? path.join(__dirname, '..', 'public')
    : path.join(__dirname, '..', 'dist', 'public');
  app.register(fastifyStatic, {
    root: pathPublic,
    prefix: '/assets/',
  });
};

export default () => {
  const app = fastify({
    logger: true,
  });

  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);

  return app;
};
