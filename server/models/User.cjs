// @ts-check

const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');
const encrypt = require('../lib/secure.cjs');

const unique = objectionUnique({ fields: ['email'] });

// TODO: настроить валидацию email
module.exports = class User extends unique(BaseModel) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'email',
        'password',
      ],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
        email: { type: 'string' },
        password: { type: 'string', minLength: 3 },
      },
    };
  }

  // TODO: implement
  // https://vincit.github.io/objection.js/guide/models.html#examples:~:text=fullName()%20%7B%0A%20%20%20%20return%20this.firstName%20%2B%20%27%20%27%20%2B%20this.lastName%3B%0A%20%20%7D
  // fullName() {
  //   return this.firstName + ' ' + this.lastName;
  // }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }
}
