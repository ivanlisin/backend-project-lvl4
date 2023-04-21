// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels', preValidation: app.authenticate }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel' }, (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
    })
    .get('/labels/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const pageId = Number(req.params.id);
      const label = await app.objection.models.label.query().findById(pageId);
      if (!label) {
        req.flash('info', i18next.t('flash.labels.edit.notFound'));
        reply.redirect(app.reverse('labels'));
        return reply;
      }
      reply.render('labels/edit', { pageId, label });
      return reply;
    })
    .post('/labels', { preValidation: app.authenticate }, async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('statuses/new', { label, errors: e.data });
      }

      return reply;
    })
    // TODO: добавить валидацию новых данных
    .patch('/labels/:id', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const pageId = Number(req.params.id);
        const { name } = req.body.data;
        const label = await app.objection.models.label.query().findById(pageId);
        await label.$query().patch({ name });
        req.flash('info', i18next.t('flash.labels.edit.success'));
        reply.redirect(app.reverse('labels'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.labels.edit.error'));
        reply.render('labels/edit', { label: req.body.data, errors: e.data });
      }
      return reply;
    })
    .delete('/labels/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const pageId = Number(req.params.id);
      try {
        const label = await app.objection.models.label.query().findById(pageId);
        await label.$query().delete();
        req.flash('info', i18next.t('flash.labels.delete.success'));
        reply.redirect(app.reverse('labels'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.labels.delete.error'));
        reply.render('labels/edit', { label: req.body.data, errors: e.data });
      }
      return reply;
    });
};
