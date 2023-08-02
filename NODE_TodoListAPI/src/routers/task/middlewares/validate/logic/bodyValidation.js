const Validation = require('./validation');
class BodyValidation extends Validation {

    static isBool(value) {
        if (value === undefined) {
            return true;
        }

        return typeof value === 'boolean';
    }
}

module.exports = BodyValidation;