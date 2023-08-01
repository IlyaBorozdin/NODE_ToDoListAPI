const UrlValidation = require('./validation/urlValidation');
const ValidationError = require('../../../logic/serverError/validationError');

const validateUrlHandler = (req, res, next) => {
    const { id, since, until, deadline, completed } = req.query;

    console.log(`Request parametrs: ${JSON.stringify(req.query, null, 2)}\n`);

    const remarks = new ValidationError();
    req.validationError = remarks;

    if (!UrlValidation.isNum(id)) {
        remarks.push('Query: Id must be a valid integer');
    }

    if (!UrlValidation.isDate(since)) {
        remarks.push('Query: Since must be a valid date');
    }

    if (!UrlValidation.isDate(until)) {
        remarks.push('Query: Until must be a valid date');
    }

    if (!UrlValidation.isDate(deadline)) {
        remarks.push('Query: Deadline must be a valid date');
    }

    if (!UrlValidation.isBool(completed)) {
        remarks.push('Query: Completed must be a valid boolean');
    }

    if (remarks.length > 0) {
        console.log('Parameters validation in /task failed\n');
    } else {
        console.log('Parameters validation in /task passed\n');
    }

    return next();
};

module.exports = validateUrlHandler;