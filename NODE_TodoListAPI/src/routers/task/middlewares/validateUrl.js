const UrlValidation = require('./validation/urlValidation');

const validateUrlHandler = (req, res, next) => {
    const { id, since, until, deadline, completed } = req.query;
    const errors = [];

    if (!UrlValidation.isNum(id)) {
        errors.push('ID must be a valid integer');
    }

    if (!UrlValidation.isDate(since)) {
        errors.push('Since must be a valid date');
    }

    if (!UrlValidation.isDate(until)) {
        errors.push('Until must be a valid date');
    }

    if (!UrlValidation.isDate(deadline)) {
        errors.push('Deadline must be a valid date');
    }

    if (!UrlValidation.isBool(completed)) {
        errors.push('Completed must be a valid boolean');
    }

    if (errors.length > 0) {
        const message = errors.join('. ');
        console.log(`Parameters validation in /task failed: ${message}\n`);
        return res.status(400).json({ error: message });
    }

    console.log('Parameters validation in /task passed\n');
    next();
};

module.exports = validateUrlHandler;