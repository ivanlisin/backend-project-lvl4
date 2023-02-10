// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const tasks = await app.objection.models.task.query()
        .withGraphFetched('[status, creator, executor]');
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      console.log(users);
      reply.render('tasks/new', { task, statuses, users });
      return reply;
    })
    .get('/tasks/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      reply.render('tasks/edit', { id, task });
      return reply;
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const { data } = req.body;
      ['statusId', 'creatorId', 'executorId'].forEach((key) => {
        const str = data[key];
        data[key] = parseInt(str, 10);
      });
      try {
        const validTask = await app.objection.models.task.fromJson(data);
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (e) {
        console.error(e);
        const task = new app.objection.models.task();
        task.$set(data);
        const statuses = await app.objection.models.status.query();
        const users = await app.objection.models.user.query();
        const locals = { task, statuses, users };
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', { ...locals, errors: e.data });
      }
      return reply;
    })
    .delete('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const { id } = req.params;
        const task = await app.objection.models.task.query().findById(id);
        await task.$query().delete();
        req.flash('info', i18next.t('flash.statuses.delete.success'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      } catch (e) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.render('users/edit', { task: req.body.data, errors: e.data });
        return reply;
      }
    });
};
