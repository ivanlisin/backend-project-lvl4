// @ts-check

import _ from 'lodash';
import i18next from 'i18next';

const prepareDataForSelects = async (app) => {
  const statuses = await app.objection.models.status.query();
  const users = await app.objection.models.user.query();
  const statusSelectData = statuses.map((status) => {
    const value = status.id;
    const text = status.name;
    return { value, text };
  });
  const userSelectData = users.map((user) => {
    const value = user.id;
    const text = user.fullName();
    return { value, text };
  });
  return { statusSelectData, userSelectData };
};

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
      const { statusSelectData, userSelectData } = await prepareDataForSelects(app);
      reply.render('tasks/new', {
        task,
        statusSelectData,
        userSelectData,
      });
      return reply;
    })
    .get('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id)
        .withGraphFetched('[status, creator, executor]');
      if (_.isUndefined(task)) {
        req.flash('error', i18next.t('flash.tasks.info.error'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      }
      reply.render('tasks/info', { task });
      return reply;
    })
    .get('/tasks/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      const { statusSelectData, userSelectData } = await prepareDataForSelects(app);
      reply.render('tasks/edit', {
        id,
        task,
        statusSelectData,
        userSelectData,
      });
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
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (e) {
        console.error(e);
        const task = new app.objection.models.task();
        task.$set(data);
        const { statusSelectData, userSelectData } = await prepareDataForSelects(app);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task,
          statusSelectData,
          userSelectData,
          errors: e.data,
        });
      }
      return reply;
    })
    // TODO: добавить валидацию новых данных
    .patch('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { data } = req.body;
      ['statusId', 'creatorId', 'executorId'].forEach((key) => {
        const str = data[key];
        data[key] = parseInt(str, 10);
      });
      try {
        const pageId = Number(req.params.id);
        const task = await app.objection.models.task.query().findById(pageId);
        await task.$query().patch({ ...data });
        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (e) {
        console.error(e);
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        reply.render('tasks/edit', { task: data, errors: e.data });
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
