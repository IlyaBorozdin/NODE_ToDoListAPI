class Validation {

    static isDate(value) {
        if (value === undefined) {
            return true;
        }

        const date = new Date(value);
        return date instanceof Date && !isNaN(date.getTime());
    }
}

module.exports = Validation;