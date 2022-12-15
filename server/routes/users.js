// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .get('/users/:id/edit', { preValidation: app.authenticate }, (req, reply) => {
      const pageId = Number(req.params.id);
      const userId = Number(req.user.id);
      if (pageId !== userId) {
        req.flash('info', i18next.t('flash.accessError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }
      reply.render('users/edit', { pageId, user: req.user });
      return reply;
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user, errors: data });
      }

      return reply;
    })
    .patch('/users/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const pageId = Number(req.params.id);
      const userId = Number(req.user.id);
      if (pageId !== userId) {
        req.flash('info', i18next.t('flash.accessError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      try {
        const { password, ...rest } = req.body.data;
        const newData = password === ''
          ? { ...rest }
          : { password, ...rest };
        const user = await app.objection.models.user.query().findById(userId);
        await user.$query().patch(newData);
        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect(app.reverse('users'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.users.edit.error'));
        reply.render('users/edit', { user: req.body.data, errors: e.data });
      }

      return reply;
    })
    .delete('/users/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const pageId = Number(req.params.id);
      const userId = Number(req.user.id);
      if (pageId !== userId) {
        req.flash('info', i18next.t('flash.accessError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      try {
        req.logOut();
        const user = await app.objection.models.user.query().findById(userId);
        await user.$query().delete();
        req.flash('info', i18next.t('flash.users.delete.success'));
        reply.redirect(app.reverse('users'));
        return reply;
      } catch (e) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.render('users/edit', { user: req.body.data, errors: e.data });
        return reply;
      }
    });
};
