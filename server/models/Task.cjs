// @ts-check

const BaseModel = require('./BaseModel.cjs');
const { Model } = require('objection');
const _ = require('lodash');

module.exports = class Task extends BaseModel {
  static get tableName() {
    return 'tasks';
  }

  $parseJson(json, opt) {
    json = super.$parseJson(json, opt);
    ['statusId', 'labelId', 'creatorId', 'executorId'].forEach((key) => {
      if (!_.has(json, key)) {
        return;
      }
      const str = json[key];
      json[key] = parseInt(str, 10);
    });
    return json;
  }

  static get relationMappings() {
    const Status = require('./Status.cjs');
    const Label = require('./Label.cjs');
    const User = require('./User.cjs');
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'tasks.statusId',
          to: 'statuses.id',
        },
      },
      label: {
        relation: Model.BelongsToOneRelation,
        modelClass: Label,
        join: {
          from: 'tasks.labelId',
          to: 'label.id',
        }
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.creatorId',
          to: 'users.id',
        },
      },
      executor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.executorId',
          to: 'users.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
        'description',
        'statusId',
        'labelId',
        'creatorId',
        'executorId',
      ],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        statusId: { type: 'integer' },
        labelId: { type: 'integer' },
        creatorId: { type: 'integer' },
        executorId: { type: 'integer' },
      },
    };
  }
}
