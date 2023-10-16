// @ts-check

const { Model } = require('objection');
const AjvValidator = require('objection').AjvValidator;
const addFormats = require('ajv-formats');

module.exports = class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        // Here you can modify the `Ajv` instance.
        return addFormats(ajv);
      },
      options: {
        allErrors: true,
        validateSchema: false,
        ownProperties: true,
        v5: true
      }
    });
  }
}
