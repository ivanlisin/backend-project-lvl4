// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses', preValidation: app.authenticate }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, (req, reply) => {
      const status = new app.objection.models.status();
      reply.render('statuses/new', { status });
    })
    // TODO: добавить проверку на существование записи в бд по id
    .get('/statuses/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const pageId = Number(req.params.id);
      const status = await app.objection.models.status.query().findById(pageId);
      reply.render('statuses/edit', { pageId, status });
      return reply;
    })
    .post('/statuses', { preValidation: app.authenticate }, async (req, reply) => {
      const status = new app.objection.models.status();
      status.$set(req.body.data);

      try {
        const validStatus = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: e.data });
      }

      return reply;
    })
    // TODO: добавить валидацию новых данных
    .patch('/statuses/:id', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const pageId = Number(req.params.id);
        const { name } = req.body.data;
        const status = await app.objection.models.status.query().findById(pageId);
        await status.$query().patch({ name });
        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        reply.render('statuses/edit', { status: req.body.data, errors: e.data });
      }
      return reply;
    })
    .delete('/statuses/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const pageId = Number(req.params.id);
      try {
        const status = await app.objection.models.status.query().findById(pageId);
        await status.$query().delete();
        req.flash('info', i18next.t('flash.statuses.delete.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.render('statuses/edit', { status: req.body.data, errors: e.data });
      }
      return reply;
    });
};
