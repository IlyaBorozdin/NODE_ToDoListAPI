const BodyValidation = require('./logic/bodyValidation');

const bodyHandler = (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return next();
    }

    const { deadline, completed } = req.body;
    const remarks = req.remarks;

    if (!BodyValidation.isDate(deadline)) {
        remarks.push('Invalid "deadline" date format in request body. Use YYYY-MM-DD.');
    }

    if (!BodyValidation.isBool(completed)) {
        remarks.push('Invalid "completed" value in request body. Use "true" or "false".');
    }

    return next();
};

module.exports = bodyHandler;