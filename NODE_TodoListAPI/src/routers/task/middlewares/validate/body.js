const BodyValidation = require('./func/bodyValidation');

const bodyHandler = (req, res, next) => {

    if (Object.keys(req.body).length === 0) {
        return next();
    }

    console.log(`Request parametrs: ${JSON.stringify(req.body, null, 2)}\n`);

    const { deadline, completed } = req.body;

    const remarks = req.remarks;

    if (!BodyValidation.isDate(deadline)) {
        remarks.push('Invalid "deadline" date format in request body. Use YYYY-MM-DD.');
    }

    if (!BodyValidation.isBool(completed)) {
        remarks.push('Invalid "completed" value in request body. Use "true" or "false".');
    }

    if (remarks.length > 0) {
        console.log('Body validation in /task failed\n');
    } else {
        console.log('Body validation in /task passed\n');
    }

    return next();
};

module.exports = bodyHandler;