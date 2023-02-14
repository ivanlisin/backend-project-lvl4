// @ts-check

import i18next from 'i18next';

const prepareForSelect = (entities, valueGetter, textGetter) => entities
  .map((entity) => {
    const value = valueGetter.type === 'method'
      ? entity[valueGetter.key]()
      : entity[valueGetter.key];
    const text = textGetter.type === 'method'
      ? entity[textGetter.key]()
      : entity[textGetter.key];
    return { value, text };
  });

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
      const selectOptions = {
        statuses: prepareForSelect(
          statuses,
          { type: 'field', key: 'id' },
          { type: 'field', key: 'name' },
        ),
        users: prepareForSelect(
          users,
          { type: 'field', key: 'id' },
          { type: 'method', key: 'fullName' },
        ),
      };
      reply.render('tasks/new', { task, selectOptions });
      return reply;
    })
    .get('/tasks/:id/edit', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const task = await app.objection.models.task.query().findById(id);
      const statuses = await app.objection.models.status.query();
      const users = await app.objection.models.user.query();
      const selectOptions = {
        statuses: prepareForSelect(
          statuses,
          { type: 'field', key: 'id' },
          { type: 'field', key: 'name' },
        ),
        users: prepareForSelect(
          users,
          { type: 'field', key: 'id' },
          { type: 'method', key: 'fullName' },
        ),
      };
      reply.render('tasks/edit', { id, task, selectOptions });
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
        const selectOptions = {
          statuses: prepareForSelect(
            statuses,
            { type: 'field', key: 'id' },
            { type: 'field', key: 'name' },
          ),
          users: prepareForSelect(
            users,
            { type: 'field', key: 'id' },
            { type: 'method', key: 'fullName' },
          ),
        };
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', { task, selectOptions, errors: e.data });
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
