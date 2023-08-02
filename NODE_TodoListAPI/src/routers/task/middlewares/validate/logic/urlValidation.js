const Validation = require("./validation");
class UrlValidation extends Validation {

    static isBool(value) {
        if (value === undefined) {
            return true;
        }
        return value === 'true' || value === 'false';
    }

    static isNum(value) {
        if (value === undefined) {
            return true;
        }

        const num = parseInt(value, 10);
        return !isNaN(num) && Number.isInteger(num);
    }
}

module.exports = UrlValidation;