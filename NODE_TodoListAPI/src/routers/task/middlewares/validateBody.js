const BodyValidation = require('./validation/bodyValidation');
const ValidationError = require('../../../logic/serverError/validationError');

const validateBodyHandler = (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        if (remarks.length > 0) {
            throw remarks;
        }
        return next();
    }

    console.log(`Request parametrs: ${JSON.stringify(req.body, null, 2)}\n`);

    const { deadline, completed } = req.body;

    const remarks = [];

    if (!BodyValidation.isDate(deadline)) {
        remarks.push('Body: Deadline must be a valid date');
    }

    if (!BodyValidation.isBool(completed)) {
        remarks.push('Body: Completed must be a valid boolean');
    }

    if (remarks.length > 0) {
        console.log('Body validation in /task failed\n');
        return next(new ValidationError(remarks));
    }

    console.log('Body validation in /task passed\n');
    return next();
};

module.exports = validateBodyHandler;