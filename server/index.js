// @ts-check

import fastify from 'fastify';
import pointOfView from 'point-of-view';
import pug from 'pug';
import path from 'path';
import fastifyStatic from 'fastify-static';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import fastifyErrorPage from 'fastify-error-page';
import fastifySensible from 'fastify-sensible';
import i18next from 'i18next';

import addRoutes from './routes/index.js';
import getHelpers from './helpers/index.js';
import ru from './locales/ru.js';
// @ts-ignore
import webpackConfig from '../webpack.config.babel.js';

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

const setUpViews = (app) => {
  const { devServer } = webpackConfig;
  const devHost = `http://${devServer.host}:${devServer.port}`;
  const domain = isDevelopment ? devHost : '';
  const helpers = getHelpers(app);
  app.register(pointOfView, {
    engine: {
      pug,
    },
    defaultContext: {
      ...helpers,
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

const setupLocalization = () => {
  i18next
    .init({
      lng: 'ru',
      fallbackLng: 'en',
      debug: isDevelopment,
      resources: {
        ru,
      },
    });
};

const registerPlugins = (app) => {
  if (isDevelopment) {
    app.register(fastifyErrorPage);
  }
  app.register(fastifyReverseRoutes);
  app.register(fastifySensible);
};

export default () => {
  const app = fastify({
    logger: true,
  });

  registerPlugins(app);

  setupLocalization();
  setUpViews(app);
  setUpStaticAssets(app);
  addRoutes(app);

  return app;
};
